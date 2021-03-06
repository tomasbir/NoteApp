import React, { useState } from 'react'
import axios from 'axios'
import SetCookie from '../hooks/setCookie'
import RemoveCookie from '../hooks/removeCookie'
import { Link, Navigate } from 'react-router-dom'

import Swal from 'sweetalert2'

function LoginForm( ) {
    const [details, setDetails] = useState({email: "", password: ""});
    const [loginState, setLoginState] = useState(0);
    const [loginData, setLoginData] = useState('');

    const Login = (details) => {
        axios.post(
            `https://localhost:7190/api/Auth/login`, {
                email : details.email,
                password : details.password,
            })
            .then(response => {
                RemoveCookie('token');
                SetCookie('token', response.data);
                setLoginState(response.status);
                setLoginData(response.data);

                if(response.status == 200){
                    Swal.fire({
                        title: 'Welcome',
                        text: 'Have a nice journey with NoteApp',
                        icon: 'success',
                      })
                }else if(response.status == 400) {
                    Swal.fire({
                        title: 'Error!',
                        text: `${response.data}, please try again...`,
                        icon: 'error',
                        confirmButtonText: 'Lets try one more time'
                      })
                }
            })
            .catch(function (error) {
                if(error.response.status == 400) {
                    Swal.fire({
                        title: 'Error!',
                        text: `${error.request.response}, please try again...`,
                        icon: 'error',
                        confirmButtonText: 'Lets try one more time'
                      })
                }
                console.log(error.data);
            });
    }

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

  return (
    <form className="form" onSubmit={submitHandler}>
        <h1>Please Login</h1>
        <div className="input">
            <input id="userName" className="input-wrap" type="text" name="email" placeholder=" " onChange={e => setDetails({...details, email: e.target.value})} value={details.email} required/>
            <label htmlFor="email" className="float-label">Email</label>
        </div>
        <div className="input">
            <input id="userPassword" className="input-wrap" type="password" name="password" placeholder=" " onChange={e => setDetails({...details, password: e.target.value})} value={details.password} required/>
            <label htmlFor="password" className="float-label">Password</label>
        </div>
        <span>Still don't have an account? <Link to="/register">Creat an account</Link></span>
        <input type="submit" value="Login" />
        {(loginState === 200) ? <Navigate to="/" /> : ''}
    </form>
  )
}

export default LoginForm