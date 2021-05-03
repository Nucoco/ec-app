import { push } from 'connected-react-router'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {PrimaryButton, TextDetail} from '../components/UIkit'
import {getUserId, getUsername} from '../reducks/users/selectors'

const UserMyPage = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const username = getUsername(selector)
    console.log('selector: ', selector)

    const transition = useCallback(path => {
        dispatch(push(path))
    }, [dispatch])//dispatch may or may not be present. but sometimes warning occurs.
    
    return (
        <section className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>MyPage</h2>
            <div className='module-spacer--medium'></div>
            <TextDetail label={'UserName'} value={username} />
            <div className='module-spacer--medium'></div>
            <div className='center'>
                <PrimaryButton
                    label={'Edit Your Card Info'}
                    onClick={() => transition('/user/payment/edit')}
                />
                <PrimaryButton
                    label={'Order History'}
                    onClick={() => transition('/order/history')}
                />
            </div>
        </section>
    )
}

export default UserMyPage