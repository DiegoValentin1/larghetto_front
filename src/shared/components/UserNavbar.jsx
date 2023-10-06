import React, { useContext } from 'react';
import '../../utils/styles/UserNavbar.css'
import { AuthContext } from "../../modules/auth/authContext";

const UserNavbar = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className='UserNav'>
            <div className='UserData'>
                <div>Larghetto | {user.data.name}</div>
            </div>
        </div>
    );
}

export default UserNavbar;
