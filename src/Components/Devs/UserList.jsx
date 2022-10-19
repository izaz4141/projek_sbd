import React from 'react'
import { Link } from 'react-router-dom'
import DeleteUser from '../deleteUser'

const UserList = ({ list_of_user, u_id }) => {
  return (
    <>
        {list_of_user?.map(user => {
            return(
                <ul key={user.id}>
                    <li>
                        <Link to={`/user/${user.id}`}>{user.name}</Link>
                        <DeleteUser id= {user.id} u_id= {u_id} />
                    </li>
                </ul>
            )
        })}
    </>
  )
}


export default UserList;