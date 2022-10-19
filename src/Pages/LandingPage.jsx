import React from 'react';
import httpClient from '../httpClient';
import DeleteUser from '../Components/deleteUser';
import { useStateContext } from '../Contexts/ContextProvider';
import Header from '../Containers/Header'

const LandingPage = () => {
    const {user} = useStateContext();

    const logoutUser = async () => {
        try {
            await httpClient.post("/logout");
            window.location.href = '/';
        } catch (error) {
            console.log("Not Authorized")
        }
    }

    return (
        <div className='dark:bg-secondary-dark-bg bg-white overflow-auto' >
            <div className='mx-48'>
                <Header category='Dashboard' title='Welcome Campers!' />
            </div>
            <div className='text-black dark:text-white justify-center flex mx-48' >
                {user != null ? (
                    <div>
                        <p>Halo {user.name}, Mau ngapain hari ini?</p>
                        <button onClick={logoutUser}>LogOut</button>
                        <DeleteUser id= {user.id} u_id= {user.id} />
                    </div>
                ) : (
                    <div>
                        <p>You're not Logged In</p>
                        <div>
                            <a href='/login'><button>Login</button></a>
                            <a href='/register'><button>Register</button></a>
                        </div>
                    </div>
                )}
            </div>
            <p>time</p>
        </div>
    );
};

export default LandingPage;