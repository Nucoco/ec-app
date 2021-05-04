import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import {PrimaryButton, TextDetail} from '../UIkit'
import { push } from 'connected-react-router';
import {registerCard, retrievePaymentMethod} from '../../reducks/payments/operations'
import {getCustomerId, getPaymentMethodId} from "../../reducks/users/selectors"

const PaymentEdit = () => {
    const dispatch = useDispatch()
    //useStripe() and useElements() are Hooks prepared by Stripe. Hooks enable to get 'the' data from any files.  
    const stripe = useStripe()
    console.log('stripe: ', stripe)
    const elements = useElements()
    console.log('elements: ', elements)
    const selector = useSelector(state => state)
    const customerId = getCustomerId(selector)
    const paymentMethodId = getPaymentMethodId(selector)

    const [card, setCard] = useState({})

    const register = useCallback(() => {
        dispatch(registerCard(stripe, elements, customerId))
    }, [stripe, elements, customerId])

    const goBackToMyPage = useCallback(() => {
        dispatch(push('/user/mypage'))
    }, [dispatch])

    useEffect(() => {
        //Immediate function with async
        (async() => {
            const cardData = await retrievePaymentMethod(paymentMethodId)
            if(cardData){
                setCard(cardData)
            }
        })()
    }, [paymentMethodId])

    const cardNumber = useMemo(() => {
        if(card.last4){
            return "**** **** ****" + card.last4
        }else{
            return "Unregistered"
        }
    }, [card])

    return (
        <section className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>Register or Edit your Card Info</h2>
            <div className='module-spacer--medium' />
            <h3>Currently registered card information</h3>
            <div className='module-spacer--medium' />
            <TextDetail label={card.brand} value={cardNumber} />
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