import React, {useState} from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";

const LoginPage = ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            await httpClient.post('/login', {
                email: email,
                password: password
            });
            window.location.href = '/'
        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Credentials")
            };
            if (error.response.status === 404) {
                alert('User not Found!')
            };
        };
      };

    return(
        <section>
            <h2 className='text-center'>Login to Your Account!</h2>
            <form className='text-center' onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label htmlFor='email' className='form-label'>
                        Email
                    </label>
                    <input
                        type='email'
                        className='form-input'
                        id=''
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        className='form-input'
                        id=''
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn'>
                Login
                </button>
            </form>
            <hr></hr>
            <Link className='text-center' to='/'>Home</Link>
        </section>
    );
};
export default LoginPage;