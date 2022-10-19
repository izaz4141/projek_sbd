import React, {useState, useEffect} from 'react'
import httpClient from '../../httpClient'
import UserList from '../../Components/Devs/UserList'

const DevUserList = () => {
    const [authorization, setAuthorization] = useState(2);
    const [user, setUser] = useState(null);
    const [userlist, setUserlist] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("/@me");
                setAuthorization(resp.data.author_level);
                setUser(resp.data);
                console.log(resp.data.author_level);
                if (resp.data.author_level === 0 ) {
                    const ulis = await httpClient.post("/dev/user_list", {
                        author_level: resp.data.author_level
                    });
                    setUserlist(ulis.data);
                };
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);
    return (
        <>
            {authorization === 0 ? (
                <div>
                    <h1>User List</h1>
                    <br/>
                    <UserList list_of_user= {userlist} u_id= {user.id} />
                </div>
                ) : (
                <div className='text-center'>
                <h1>404 not found</h1>
                </div>
                )
            }
        </>
    )
}

export default DevUserList;