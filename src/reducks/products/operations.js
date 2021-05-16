import { push } from "connected-react-router";
import { db, FirebaseTimeStamp } from "../../firebase";
import { createPaymentIntent } from "../payments/operations";
import { deleteProductAction, fetchProductsAction } from "./actions";

const productsRef = db.collection("products");

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
		productsRef
			.doc(id)
			.delete()
			.then(() => {
				const prevProducts = getState().products.list;
				const nextProducts = prevProducts.filter((product) => product.id !== id);
				dispatch(deleteProductAction(nextProducts));
			});
	};
};

export const fetchProducts = (gender, category) => {
	return async (dispatch) => {
		let query = productsRef.orderBy("updated_at", "desc");
		query = gender !== "" ? query.where("gender", "==", gender) : query;
		query = category !== "" ? query.where("category", "==", category) : query;

		query.get().then((snapshots) => {
			const productList = [];
			snapshots.forEach((snapshot) => {
				const product = snapshot.data();
				productList.push(product);
			});
			dispatch(fetchProductsAction(productList));
		});
	};
};

export const orderProducts = (productsInCart, amount) => {
	return async (dispatch, getState) => {
		const uid = getState().users.uid;
		const userRef = db.collection("users").doc(uid);
		const timestamp = FirebaseTimeStamp.now();

		let products = [],
			soldOutProducts = [];

		const batch = db.batch();

		for (const product of productsInCart) {
			const snapshot = await productsRef.doc(product.productId).get();
			const sizes = snapshot.data().sizes;

			const updatedSizes = sizes.map((aSize) => {
				if (aSize.size === product.size) {
					if (aSize.quantity === 0) {
						soldOutProducts.push(product.name);
						return aSize;
					}
					return {
						size: aSize.size,
						quantity: aSize.quantity - 1,
					};
				} else {
					return aSize;
				}
			});

			products.push({
				id: product.productId,
				images: product.images,
				name: product.name,
				price: product.price,
				size: product.size,
			});

			batch.update(productsRef.doc(product.productId), { sizes: updatedSizes });

			batch.delete(userRef.collection("cart").doc(product.cartId));
		}

		if (soldOutProducts.length > 0) {
			const errorMessage = soldOutProducts.length > 1 ? soldOutProducts.join(", ") : soldOutProducts[0];
			alert("Out of stock: " + errorMessage);
			return false;
		} else {
			const orderRef = userRef.collection("orders").doc();
			const date = timestamp.toDate();
			const shippingDate = FirebaseTimeStamp.fromDate(new Date(date.setDate(date.getDate() + 4)));

			const history = {
				amount: amount,
				created_at: timestamp,
				id: orderRef.id,
				products: products,
				shipping_date: shippingDate,
				updated_at: timestamp,
			};
			batch.set(orderRef, history, { merge: true }); // before code maybe... --> orderRef.set(history);

			//From here, to execute the payment processing of Stripe
			const customerId = getState().users.customer_id;
			const paymentMethodId = getState().users.payment_method_id;
			const paymentIntent = await createPaymentIntent(amount, customerId, paymentMethodId);

			if (paymentIntent) {
				return batch
					.commit()
					.then(() => {
						console.log("Successfully batch commit");
						dispatch(push("/order/complete"));
					})
					.catch(() => {
						alert("Communication Failed");
						return false;
					});
			} else {
				console.log("Failed to create PaymentIntent.");
				alert("Failed to order. Please check your signal strength enough. Then try again please.");
			}
		}
	};
};

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
	return async (dispatch) => {
		const timestamp = FirebaseTimeStamp.now();

		const data = {
			category: category,
			description: description,
			gender: gender,
			images: images,
			name: name,
			price: parseInt(price, 10),
			sizes: sizes,
			updated_at: timestamp,
		};

		//In the case of New Creation (Not Editing)
		if (id === "") {
			const ref = productsRef.doc();
			id = ref.id;
			data.id = id;
			data.created_at = timestamp;
		}
		return productsRef
			.doc(id)
			.set(data, { merge: true })
			.then(() => {
				dispatch(push("/"));
			})
			.catch((error) => {
				throw new Error(error);
			});
	};
};
