import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js/pure';
import { PaymentEdit } from '../components/Payment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51ImvDPE2HY2JTGENyhYq42HWNOXmc58ZmVWpIoQMH9x2ezRuD910xmsMYWD62ELUGCFQQMpXXx0MuVO5XrjlxpzS00y9uOlrsd');

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
        <PaymentEdit />
    </Elements>
  );
};

export default CheckoutWrapper
// npm WARN EBADENGINE Unsupported engine {
//   npm WARN EBADENGINE   package: undefined,
//   npm WARN EBADENGINE   required: { node: '12' },
//   npm WARN EBADENGINE   current: { node: 'v14.16.1', npm: '7.11.1' }
//   npm WARN EBADENGINE }
//   Compiled with warnings.