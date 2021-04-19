import { IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { FavoriteBorder, ShoppingCart } from '@material-ui/icons';
import React from 'react'

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
});

const SizeTable = (props) => {
    const classes = useStyles();
    const sizes = props.sizes;

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map((size) => (
                            <TableRow key={size.size}>
                                <TableCell component='th' scope='row'>
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    {size.quantity} stk.
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        <IconButton>
                                            <ShoppingCart />
                                        </IconButton>
                                    ) : (
                                        <div>SOLD OUT</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton>
                                        <FavoriteBorder />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SizeTable;