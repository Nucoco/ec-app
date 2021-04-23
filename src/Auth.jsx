import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selectors'

console.log('AUTH')

const Auth = ({children}) => {
    const dispatch = useDispatch();

    const selector = useSelector((state) => state);//Selector is the state got from the store with useSelector().
    const isSignedIn = getIsSignedIn(selector);

    console.log('   Auth will be rendered')

    useEffect(() => {
        console.log('   CDM: Auth')
        if(!isSignedIn){
            dispatch(listenAuthState())
        }
    }, []);//This near equals to ComponentDidMount().

    if(!isSignedIn){
        console.log('   Auth is being rendered with <></>')
        return <></>
    }else{
        console.log('   Auth is being rendered with children')
        return children
    }
}

export default Auth