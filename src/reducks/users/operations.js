import {signInAction, signOutAction} from './actions';
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimeStamp} from '../../firebase/index';

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if(user){
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: user.username
                        }))
                    })

            }else{
                dispatch(push('/signin'))
            }
        })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === ''){
            alert('Please fill in the required fields.')
            return false;
        }else{
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('Send an email to your email.')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('Fail to reset password.')
                })
        }
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        //Validation
        if(email === '' || password === ''){
            alert('Please fill in the required fields.')
            return false;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if(user){
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: user.username
                            }))
                        })

                    dispatch(push('/'))
                }
            })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        //Validation
        if(username === '' || email === '' || password === '' || confirmPassword === ''){
            alert('Please fill in the required fields.')
            return false;
        }
        if(password !== confirmPassword){
            alert('The password do not match.')
            return false;
        }
        if(password.length < 6){
            alert('The password must be at least 6 characters.')
            return false;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if(user){
                    const uid = user.uid
                    const timestamp = FirebaseTimeStamp.now()

                    const userInitialData ={
                        created_at: timestamp,
                        email: email,
                        role: 'customer',
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'))
                        })
                }
            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
                dispatch(push('/signin'))
            })
    }
}