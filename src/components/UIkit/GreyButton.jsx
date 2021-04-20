import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    'button': {
        backgroundColor: theme.palette.grey['300'],
        fonsSize: 16,
        marginBottom: 16,
        height: 48,
        width:256
    }
}))

const GreyButton = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} variant='contained' onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}

export default GreyButton;