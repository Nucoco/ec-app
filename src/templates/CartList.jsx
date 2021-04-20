import { List, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CartListItem } from '../components/Products';
import { GreyButton, PrimaryButton } from '../components/UIkit';
import {getProductsInCart} from '../reducks/users/selectors'

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
})

const CartList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const productsInCart = getProductsInCart(selector);

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'));
    }, []);

    const backToHome = useCallback(() => {
        dispatch(push('/'));
    }, []);
    
    return (
        <section className='c-section-wrapin'>
            <h2 className='u-text__headline'>
                Shopping Cart
            </h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
                )}
            </List>
            <div className='module-spacer--medium' />
            <div className='p-grid__column'>
                <PrimaryButton 
                    label='Go to the casher' onClick={goToOrder}
                />
                <div className='module-spacer--extra-extra-small' />
                <GreyButton 
                    label='Continue shopping' onClick={backToHome}
                />
            </div>
        </section>
    )
}

export default CartList;
