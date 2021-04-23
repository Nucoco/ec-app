import { List, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersHistory } from '../reducks/users/selectors'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../components/Products';

const useStyles = makeStyles((theme) => ({
    orderList: {
        backgroundColor: theme.palette.grey['100'],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: 768
        }
    }
}));

const OrderHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const orders = getOrdersHistory(selector);

    console.log('orders: ', orders);

    //ComponentDidMount()
    useEffect(() => {
        console.log('CDM: OrderHistory')
        dispatch(fetchOrdersHistory());
    },[]);

    return (
        <section className='c-section-wrapin'>
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map((order) => <OrderHistoryItem key={order.id} order={order} />)
                )}
            </List>
        </section>
    )
}

export default OrderHistory;