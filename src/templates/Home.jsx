import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../reducks/users/operations';
import {getUserId, getUsername} from '../reducks/users/selectors';

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);

    return (
        <div>
            <h2>Home</h2>
            <p>ID:{uid}</p>
            <p>NAME:{username}</p>
            <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
        </div>
    )
}

export default Home;