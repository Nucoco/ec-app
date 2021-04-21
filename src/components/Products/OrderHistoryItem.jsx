import { Divider } from '@material-ui/core'
import React from 'react'
import { OrderedProducts } from '.'
import { TextDetail } from '../UIkit'

const datetimeToString = (date) => {
    return date.getFullYear() + '-'
            + ('00' + (date.getMonth() +1)).slice(-2) + '-'
            + ('00' + date.getDate()).slice(-2) + ' '
            + ('00' + date.getHours()).slice(-2) + ':'
            + ('00' + date.getMinutes()).slice(-2) + ':'
            + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
    return date.getFullYear() + '-'
            + ('00' + (date.getMonth() +1)).slice(-2) + '-'
            + ('00' + date.getDate()).slice(-2)
}

const OrderHistoryItem = (props) => {
    const order = props.order;
    const orderedDatetime = datetimeToString(order.updated_at.toDate());
    const price = '$' + order.amount.toLocaleString();
    const shippingDate = dateToString(order.shipping_date.toDate());

    console.log('historyItem')
    return (
        <div>
            <div className='module-spacer--small' />
            <TextDetail label={'Order ID'} value={order.id} />
            <TextDetail label={'Order Date'} value={orderedDatetime} />
            <TextDetail label={'Expected Shipping Date'} value={shippingDate} />
            <TextDetail label={'Order Amount'} value={price} />

            {order.products.length > 0 && (
                <OrderedProducts products={order.products} />
            )}

            <div className='module-spacer--extra-extra-small' />
            <Divider />
        </div>
    )
}

export default OrderHistoryItem;