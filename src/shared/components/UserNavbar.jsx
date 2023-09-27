import React, { useContext } from 'react';
import '../../utils/styles/UserNavbar.css'
import { AuthContext } from "../../modules/auth/authContext";

const UserNavbar = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <div className='UserNav'>
            <div className='UserData'>
                <div>Larghetto | Diego</div>
            </div>
        </div>
    );
}

export default UserNavbar;
