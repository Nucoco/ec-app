import {CardElement} from '@stripe/react-stripe-js';
import { push } from 'connected-react-router';
import {db} from '../../firebase/index'
import {updateUserStateAction} from '../users/actions'

const headers = new Headers();
headers.set('Content-type', 'application/json');
const BASE_URL = "https://ec-app-a7f6b.web.app";

const createCustomer = async (email, paymentMethodId, uid) => {
    const response = await fetch(BASE_URL + '/v1/customer', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            paymentMethod: paymentMethodId,
            userId: uid
        })
    })

    const customerResponse = await response.json()
    console.log('response: ', response);
    console.log('response.json(): ', customerResponse);
    console.log('JSON.parse(): ', JSON.parse(customerResponse.body))
    return JSON.parse(customerResponse.body)
}

export const retrievePaymentMethod = async (paymentMethodId) => {
    const response = await fetch(BASE_URL + '/v1/paymentMethod', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            paymentMethodId: paymentMethodId,
        })
    })

    const paymentMethodResponse = await response.json()
    const paymentMethod = JSON.parse(paymentMethodResponse.body)
    console.log('paymentMethod: ', paymentMethod);
    return paymentMethod.card
}

const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
    const response = await fetch(BASE_URL + "/v1/updatePaymentMethod",{
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            customerId: customerId,
            prevPaymentMethodId: prevPaymentMethodId,
            nextPaymentMethodId: nextPaymentMethodId
        })
    })
    const paymentMethodResponse = await response.json()
    const paymentMethod = JSON.parse(paymentMethodResponse.body)
    return paymentMethod.card
}

export const registerCard = (stripe, elements, customerId) => {
    return async (dispatch, getState) => {
        console.log('getState(): ', getState());
        const user = getState().users
        const email = user.email
        const uid = user.uid

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
    
          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
        const cardElement = elements.getElement(CardElement);
        console.log("CardElement: ", CardElement);
        console.log("cardElement: ", cardElement);

          // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        console.log("paymentMethod: ", paymentMethod);
        if (error) {
            console.log('[error]', error);
            return;
        }

        const paymentMethodId = paymentMethod.id

        if(customerId === ""){
            const customerData = await createCustomer(email, paymentMethodId, uid)
            console.log("customerData: ", customerData);
    
            if(customerData.id === ""){
                alert('Failed to register Card Info')
                return;
            }else{
                const updateUserState = {
                    customer_id: customerData.id,
                    payment_method_id: paymentMethodId
                }
    
                db.collection('users').doc(uid)
                    .update(updateUserState)
                    .then(() => {
                        dispatch(updateUserStateAction(updateUserState))
                        dispatch(push('/user/mypage'))
                    }).catch((error) => {
                        //delete stripe customer
                        alert('Failed to register Card Info')
                        return;
                    })
            }
        }else{
            const prevPaymentMethodId = getState().users.payment_method_id
            const updatedPaymentMethod = await updatePaymentMethod(customerId, prevPaymentMethodId, paymentMethodId)

            if(!updatedPaymentMethod){
                alert('Failed to update customer information')
            }else{
                const userState = {
                    payment_method_id: paymentMethodId
                }
                db.collection('users').doc(uid)
                    .update(userState)
                    .then(() => {
                        dispatch(updateUserStateAction(userState))
                        alert('Successfully updated customer information!')
                        dispatch(push('/user/mypage'))
                    }).catch(() => {
                        alert('Failed to update customer information')
                    })
            }
        }
    }
}