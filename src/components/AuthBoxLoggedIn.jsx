import React from 'react';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function AuthBoxLoggedIn({ user, setUser}) {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut(auth)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    return (
        <nav>
            Logged in as:
            <br />
            {user.email}
            <br /> 
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default AuthBoxLoggedIn;
