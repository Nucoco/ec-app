import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import {getUserId} from '../../reducks/users/selectors';

const useStyles = makeStyles({
    list: {
        height: 128
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
});

const CartListItem = (props) => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);

    const image = props.product.images[0].path;
    const name  = props.product.name;
    const price = props.product.price.toLocaleString();
    const size  = props.product.size;

    const removeProductFromCart = (id) => {
        return db.collection('users').doc(uid).collection('cart').doc(id).delete();
    }
    
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt='item image' />
                </ListItemAvatar>
                <div className={classes.text}>
                    <ListItemText 
                        primary={name}
                        secondary={'SIZE: '+ size}
                    />
                    <ListItemText 
                        primary={'PRICE: ' + price}
                    />
                </div>
                <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
                    <Delete />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default CartListItem;