import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
    console.log('UsersReducer is fired')
    switch(action.type){
        case Actions.FETCH_ORDERS_HISTORY:
            console.log('   case Actions.FETCH_ORDERS_HISTORY:')
            return {
                ...state,
                orders: [...action.payload]
            }
        case Actions.FETCH_PRODUCTS_IN_CART:
            console.log('   case Actions.FETCH_PRODUCTS_IN_CART:')
            return {
                ...state,
                cart: [...action.payload]
            }
        case Actions.SIGN_IN:
            console.log('   case Actions.SIGN_IN:')
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            console.log('   case Actions.SIGN_OUT:')
            return {
                ...action.payload
            }
        case Actions.UPDATE_USER_STATE:
            console.log('   case Actions.UPDATE_USER_STATE:')
            return {
                ...state,
                ...action.payload
            }
        default:
            console.log('   case default:')
            return state
    }
}