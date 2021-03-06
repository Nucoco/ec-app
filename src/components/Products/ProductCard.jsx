import { Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
//@material-ui/styles is re-exported as @material-ui/core/styles 
// - you only need to install it if you wish to use it independently from Material-UI.
import { push } from 'connected-react-router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import NoImage from '../../assets/img/src/no_image.png'
import { deleteProduct } from '../../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.3333333% - 32px)' 
        }
    },
    content: {
        display: 'flex',
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price: {
        color: theme.palette.secondary.main,
        fontSize: 16
    }
}));

const ProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const images = (props.images.length > 0) ? props.images : [{path: NoImage}];
    const price = props.price.toLocaleString();
    
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={images[0].path}
                title=""
                onClick={() => dispatch(push('/product/' + props.id))}
            />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/' + props.id))}>
                    <Typography color='textSecondary' component='p'>
                        {props.name}
                    </Typography>
                    <Typography component='p' className={classes.price}>
                        ${price}
                    </Typography>
                </div>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            dispatch(push('/product/edit/' + props.id))
                            handleClose()
                        }}
                    >Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(deleteProduct(props.id))
                            handleClose()
                        }}
                    >Delete
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
}

export default ProductCard;