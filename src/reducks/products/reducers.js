import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ProductsReducer = (state = initialState.products, action) => {
    switch(action.type){
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: [...action.payload]
                //In the case of the above writing, Redux Store treats the new sate with the new memory information.
                //" list: action.payload " also can update the state, but can't update the memory information of the state in Redux Store.
                //so, components can't detect if the state is updated.
            }
        case Actions.DELETE_PRODUCT:
            return{
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}