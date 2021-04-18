import { push } from 'connected-react-router'
import React, {useCallback, useState} from 'react'
import { useDispatch } from 'react-redux'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {resetPassword} from '../reducks/users/operations'

const Reset = () => {
    const dispatch = useDispatch();

    const   [email, setEmail] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }
    ,[setEmail]);
    
    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>Reset Password</h2>
            <div className='module-spacer--medium'/>
            <TextInput
                fullWidth={true} label={'email'} multiline={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <div className='module-spacer--medium'/>
            <div className='center'>
                <PrimaryButton
                    label={'Reset Password'}
                    onClick={() => dispatch(resetPassword(email))}
                />
                <p onClick={() => dispatch(push('/signin'))}>Back to LOGIN page.</p>
            </div>
        </div>
    )
}

export default Reset;