export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (history) => {
    console.log('FETCH_ORDERS_HISTORY is fired')
    return {
        type: "FETCH_ORDERS_HISTORY",
        payload: history
    }
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
    console.log('FETCH_PRODUCTS_IN_CART is fired')
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    console.log('SIGN_IN is fired')
    return {
        type: "SIGN_IN",
        payload: {
            customer_id: userState.customer_id,
            email: userState.email,
            isSignedIn: true,
            payment_method_id: userState.payment_method_id,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    console.log('SIGN_OUT is fired')
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            role: "",
            uid: "",
            username: ""
        }
    }
};

export const UPDATE_USER_STATE = "UPDATE_USER_STATE"
export const updateUserStateAction = (userState) => {
    return {
        type: "UPDATE_USER_STATE",
        payload: userState
    }
}