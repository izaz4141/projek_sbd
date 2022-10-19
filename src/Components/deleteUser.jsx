import React from 'react'
import httpClient from '../httpClient'

const DeleteUser = ({ id, u_id }) => {
    const DeleteTodo = async () => {
        try {
            await httpClient.post('/deleteUser', {
                id: id,
                u_id: u_id
            });
            if (id === u_id) {
                window.location.href = '/';
            };
            } catch (error) {
                if (error === 404) {
                alert("Account not Found!");
                window.location.href = '/';
                };
            };
            };
    return(
        <div>
            <button onClick={DeleteTodo}>
                Delete
            </button>
        </div>
    )
}

export default DeleteUser;