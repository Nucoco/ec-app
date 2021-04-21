import { Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../UIkit';

const useStyles = makeStyles({
    list: {
        backgroundColor: '#fff',
        height: 'auto'
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
});

const OrderedProducts = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = props.products;

    const goToProductDetail = useCallback((id) => {
        dispatch(push('/product/' + id))
    },[])

    return (
        <List>
            {products.map((product) => (
                <>
                    <ListItem className={classes.list} key={product.id}>
                        <ListItemAvatar>
                            <img 
                                className={classes.image}
                                src={product.images[0].path}
                                ald={"Orderd Product"}
                            />
                        </ListItemAvatar>
                        <div className={classes.text} >
                            <ListItemText 
                                primary={product.name}
                                secondary={"Size: " + product.size}
                            />
                            <ListItemText 
                                primary={'$' + product.price.toLocaleString()}
                            />
                        </div>
                        <PrimaryButton 
                            label={"Product Detail"}
                            onClick={() => goToProductDetail(product.id)}
                        />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    )
}

export default OrderedProducts;