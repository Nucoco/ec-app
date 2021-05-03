import React, { useCallback } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import {PrimaryButton} from '../UIkit'
import { push } from 'connected-react-router';
import {registerCard} from '../../reducks/payments/operations'

const PaymentEdit = () => {
    const dispatch = useDispatch()
    //useStripe() and useElements() are Hooks prepared by Stripe. Hooks enable to get 'the' data from any files.  
    const stripe = useStripe()
    console.log('stripe: ', stripe)
    const elements = useElements()
    console.log('elements: ', elements)

    const register = useCallback(() => {
        dispatch(registerCard(stripe, elements))
    }, [stripe, elements])

    const goBackToMyPage = useCallback(() => {
        dispatch(push('/user/mypage'))
    }, [dispatch])
    
    return (
        <section className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>Register or Edit your Card Info</h2>
            <div className='module-spacer--medium' />
            <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
            />
            <div className='module-spacer--medium' />
            <div className='center'>
                <PrimaryButton 
                    label={"Save Card Info"}
                    onClick={register}
                />
                <PrimaryButton 
                    label={"Back to MyPage"}
                    onClick={goBackToMyPage}
                />
            </div>
        </section>
    )
}

export default PaymentEdit