import React, {useCallback, useState} from 'react'
import { useDispatch } from 'react-redux'
import {TextInput, PrimaryButton} from '../assets/components/UIkit'
import {signIn} from '../reducks/users/operations'
import {push} from 'connected-react-router'

const SignUp = () => {
    const dispatch = useDispatch();

    const   [email, setEmail] = useState(""),
            [password, setPassword] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }
    ,[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }
    ,[setPassword]);

    
    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>SignIn</h2>
            <div className='module-spacer--medium'/>
            <TextInput
                fullWidth={true} label={'email'} multiline={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={'password'} multiline={false} required={true}
                rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <div className='module-spacer--medium'/>
            <div className='center'>
                <PrimaryButton
                    label={'SignIn!!'}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <p onClick={() => dispatch(push('/signup'))}>If you have no account, click here to SignUp.</p>
                <p onClick={() => dispatch(push('/signin/reset'))}>if you forgot your password, click here to Reset your password.</p>
            </div>
        </div>
    )
}

export default SignUp;