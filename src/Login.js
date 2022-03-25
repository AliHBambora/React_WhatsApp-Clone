import { Button } from '@mui/material';
import React from 'react'
import { auth, provider } from './firebase';
import './Login.css'
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

    const [ {}, dispatch] = useStateValue();

    const SignIn = () => {
        auth.signInWithPopup(provider).then((result)=>{
            console.log(result);
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        }).catch((error)=>alert(error.message))
    }
    return (
        <div className='login'>
            <div className="login__container">
                {/* img */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="Whatsapp logo" />
               <h3>Sign in to Whatsapp</h3>
                <Button variant="contained" onClick={SignIn}>
                    Sign in with google
                </Button>
            </div>
        </div>
    )
}

export default Login;
