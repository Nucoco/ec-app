import { Badge, IconButton } from '@material-ui/core'
import { Favorite, Menu, ShoppingCart } from '@material-ui/icons'
import { push } from 'connected-react-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../firebase'
import { fetchProductsInCart } from '../../reducks/users/operations'
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'

const HeaderMenus = (props) => {
    const dispatch = useDispatch();

    const selector = useSelector((state) => state);
    let productsInCart = getProductsInCart(selector);
    const uid = getUserId(selector);

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('cart')
            .onSnapshot((snapshots) => {    // onSnapshot() can reflect collection changes in FireStore on the client side in real time
                snapshots.docChanges().forEach((change) => {
                    const product = change.doc.data();
                    const changeType = change.type;

                    switch(changeType){
                        case 'added':
                            productsInCart.push(product);
                            break;
                        case 'modified':
                            const index = productsInCart.findIndex((product) => product.cartId === change.doc.id);
                            productsInCart[index] = product;
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter((product) => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                })
                dispatch(fetchProductsInCart(productsInCart));
            })
            return () => unsubscribe(); // ComponentWillUnMount()
    }, [])

    return (
        <>
            <IconButton onClick={() => dispatch(push('/cart'))} >
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <IconButton>
                <Favorite />
            </IconButton>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
                <Menu />
            </IconButton>
        </>
    )
}

export default HeaderMenus;