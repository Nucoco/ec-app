const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.key);
const cors = require("cors");

const sendResponse = (response, statusCode, body) => {
	response.send({
		statusCode,
		Headers: { "Access-Control-Allow-Origin": "*" },
		body: JSON.stringify(body),
	});
};

/**
 * req {object} => {email: string, userId: string, paymentMethod: string}
 */
exports.createPaymentIntent = functions.https.onRequest((req, res) => {
	const corsHandler = cors({ origin: true });

	corsHandler(req, res, () => {
		if (req.method !== "POST") {
			sendResponse(res, 405, { error: "Invalid Request!" });
		}
		return stripe.paymentIntents
			.create({
				amount: req.body.amount,
				confirm: true,
				currency: "JPY",
				customer: req.body.customerId,
				metadata: { idempotencyKey: req.body.paymentMethodId },
				payment_method: req.body.paymentMethodId,
			})
			.then((paymentIntent) => {
				sendResponse(res, 200, paymentIntent);
			})
			.catch((error) => {
				console.error(error);
				sendResponse(res, 500, { error: error });
			});
	});
});

exports.stripeCustomer = functions.https.onRequest((req, res) => {
	const corsHandler = cors({ origin: true });

	//Wrap your process with CORS. This way is a commonly used way to create an API.
	corsHandler(req, res, () => {
		//whether the method type is POST
		if (req.method !== "POST") {
			sendResponse(res, 405, { error: "Invalid Request method!!" });
		}

		return stripe.customers
			.create({
				description: "EC App demo user",
				email: req.body.email,
				metadata: { userId: req.body.userId },
				payment_method: req.body.paymentMethod,
			})
			.then((customer) => {
				sendResponse(res, 200, customer);
			})
			.catch((err) => {
				sendResponse(res, 500, { error: err });
			});
	});
});

exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
	const corsHandler = cors({ origin: true });

	corsHandler(req, res, () => {
		if (req.method !== "POST") {
			sendResponse(res, 405, { error: "Invalid Request method!!" });
		}

		return stripe.paymentMethods
			.retrieve(req.body.paymentMethodId)
			.then((paymentMethod) => {
				sendResponse(res, 200, paymentMethod);
			})
			.catch((err) => {
				sendResponse(res, 500, { error: err });
			});
	});
});

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
	const corsHandler = cors({ origin: true });

	corsHandler(req, res, () => {
		if (req.method !== "POST") {
			sendResponse(res, 405, { error: "Invalid Request method!!" });
		}

		return stripe.paymentMethods
			.detach(req.body.prevPaymentMethodId)
			.then((paymentMethod) => {
				//unused???
				return stripe.paymentMethods
					.attach(req.body.nextPaymentMethodId, { customer: req.body.customerId })
					.then((nextPaymentMethod) => {
						sendResponse(res, 200, nextPaymentMethod);
					});
			})
			.catch((err) => {
				sendResponse(res, 500, { error: err });
			});
	});
});
