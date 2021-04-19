import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Edit, Delete, CheckCircle } from '@material-ui/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { TextInput } from '../UIkit'

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48, 
        width: 48
    }
})

const SetSizeArea = (props) => {
    const classes = useStyles()

    const [index, setIndex] = useState(0),
            [size, setSize] = useState(''),
            [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    const addSize = (index, size, quantity) => {
        console.log('index', index)
        if(size === '' || quantity === ''){
            //Required input is blank
            console.log('false')
            return false;
        }else{
            if(index === props.sizes.length){
                props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}]);
                setIndex(index + 1);
                setSize("");
                setQuantity(0);
                console.log('update')
            }else{
                const newSizes = props.sizes
                newSizes[index] = {size: size, quantity: quantity}
                props.setSizes(newSizes)
                setIndex(newSizes.length)
                setSize('')
                setQuantity(0)
                console.log('create')
            }
        }
    };

    const editSize = (index, size, quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
        props.setSizes(newSizes)
    }

    //ComponentDidUpdate()
    useEffect(() => {
        setIndex(props.sizes.length)
    },[props.sizes.length])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SIZE</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    {/* <div>props.sizes.length: {props.sizes.length}</div> */}
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, i) => {
                                return (
                                    <TableRow key={item.size}>
                                        <TableCell component='th' scope='row'>{item.size}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className={classes.iconCell}>
                                            <IconButton className={classes.iconCell} onClick={() => editSize(i, item.size, item.quantity)}>
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className={classes.iconCell}>
                                            <IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput 
                        fullWidth={false} label={'size'} multiline={false} required={true}
                        onChange={inputSize} rows={1} value={size} type={'text'}
                    />
                    <TextInput 
                        fullWidth={false} label={'quantity'} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={'number'}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircle />
                </IconButton>
            </TableContainer>
        </div>
    )
}

export default SetSizeArea