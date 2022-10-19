import React, {useState} from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";

const RegistrationPage = ()=> {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        try {
            await httpClient.post('/register', {
                name: name,
                email: email,
                password: password
            });
            window.location.href = '/'
        } catch (error) {
            if (error.response.status === 409) {
                alert("Akun lain telah memakai email tersebut")
            } else {
                console.log(error)
            }
        }
      };

    return(
        <section>
            <h2 className='text-center'>Create an Account!</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label htmlFor='name' className='form-label'>
                        Name
                    </label>
                    <input
                        type='name'
                        className='form-input'
                        id=''
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button type='submit' className='btn btn-block'>
                Register
                </button>
            </form>
            <hr></hr>
            <Link to='/'>Home</Link>
        </section>
    );
};
export default RegistrationPage;