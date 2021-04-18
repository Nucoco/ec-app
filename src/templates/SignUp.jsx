import { push } from 'connected-react-router'
import React, {useCallback, useState} from 'react'
import { useDispatch } from 'react-redux'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {signUp} from '../reducks/users/operations'

const SignIn = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(""),
            [email, setEmail] = useState(""),
            [password, setPassword] = useState(""),
            [confirmPassword, setConfirmPassword] = useState("");

    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }
    ,[setUsername]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }
    ,[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }
    ,[setPassword]);

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    }
    ,[setConfirmPassword]);
    
    
    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>SignUp</h2>
            <div className='module-spacer--medium'/>
            <TextInput
                fullWidth={true} label={'username'} multiline={false} required={true}
                rows={1} value={username} type={'text'} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={'email'} multiline={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={'password'} multiline={false} required={true}
                rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={'confirmPassword'} multiline={false} required={true}
                rows={1} value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
            />
            <div className='module-spacer--medium'/>
            <div className='center'>
                <PrimaryButton
                    label={'SignUp!!'}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
                <p onClick={() => dispatch(push('/signin'))}>I have an account.</p>
            </div>
        </div>
    )
}

export default SignIn;