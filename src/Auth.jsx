import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selectors'

const Auth = ({children}) => {
    const dispatch = useDispatch();

    const selector = useSelector((state) => state);//Selector is the state got from the store with useSelector().
    const isSignedIn = getIsSignedIn(selector);

    useEffect(() => {
        if(!isSignedIn){
            dispatch(listenAuthState())
        }
    }, []);//This near equals to ComponentDidMount().

    if(!isSignedIn){
        return <></>
    }else{
        return children
    }
}

export default Auth