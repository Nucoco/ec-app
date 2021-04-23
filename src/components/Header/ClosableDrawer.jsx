import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { AddCircle, ExitToApp, History, Person, Search } from '@material-ui/icons';
import { push } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {TextInput} from '../UIkit'
import {signOut} from '../../reducks/users/operations'
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
            width: 256
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}));

const ClosableDrawer = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {container} = props;

    const [keyword, setKeyword] = useState('');

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    },[setKeyword]);

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    }

    const [filters, setFilters] = useState([
        {func: selectMenu, label: 'All', id: 'all', value: "/"},
        {func: selectMenu, label: "Men's", id: 'male', value: "/?gender=male"},
        {func: selectMenu, label: "Women's", id: 'female', value: "/?gender=female"}
    ])

    const menus = [
        {func: selectMenu, label: 'Add an item',    icon: <AddCircle />, id: 'register', value: "/product/edit"},
        {func: selectMenu, label: 'Order history',  icon: <History />,   id: 'history',  value: "/order/history"},        
        {func: selectMenu, label: 'Profile',        icon: <Person />,    id: 'profile',  value: "/user/mypage"}        
    ]

    console.log('   ClosableDrawer will be rendered')

    //ComponentDidMount()
    useEffect(() => {
        console.log('   CDM: ClosableDrawer')
        db.collection('categories').orderBy('order', 'asc').get()
            .then((snapshots) => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const category = snapshot.data();
                    list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
                })
                setFilters(prevState => [...prevState, ...list])
            })
    }, []);
    
    return (
        <nav className={classes.drawer}>
            {console.log('   ClosableDrawer is being rendered')}
            <Drawer 
                container={container}
                variant='temporary'
                anchor='right'
                open={props.open}
                onClose={(event) => props.onClose(event)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div 
                    onClick={(event) => props.onClose(event)}
                    onKeyDown={(event) => props.onClose(event)}
                >
                    <div className={classes.searchField}>
                        <TextInput 
                            fullWidth={false} label={'input a keyword'} multiline={false}
                            onChange={inputKeyword} required={false} rows={1} value={keyword} type={'text'}
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map((menu) => (
                            <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)} >
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key='logout' onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map((filter) => (
                            <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)} >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )

}

export default ClosableDrawer;