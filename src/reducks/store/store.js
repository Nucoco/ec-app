import {createStore as reduxCreateStore, combineReducers, applyMiddleware} from "redux";
import {UsersReducer} from "../users/reducers";
import {ProductsReducer} from "../products/reducers";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'

export default function createStore(history){
    console.log('Redux Create Store: Combine Reducers, Apply Middleware')

    const middleWares = [routerMiddleware(history), thunk]
    
    //Use redux-logger only in development environment.
    //Because we wanna avoid getting a lot of logs in the production environment.
    //"process.env.NODE_ENV" is a local environment variable in development environment.
    //This has 'development' or 'production'
    if(process.env.NODE_ENV === 'development'){
        // There are some option. Activate them as needed. 
        const logger = createLogger({
            collapsed: true,
            diff: true
        })   
        middleWares.push(logger)
    }

    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
            products:ProductsReducer
        }),
        applyMiddleware(...middleWares)//spread syntax
    );
}