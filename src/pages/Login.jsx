import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import splashImg from '../img/splash_img.png'; // Adjust the path based on the location of your image



const Login = () => {
   
    const [blurBackground, setBlurBackground] = useState(false);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredential)
            const user = userCredential.user
            localStorage.setItem('token', user.accessToken)
            localStorage.setItem('user', JSON.stringify(user))
            navigate("/")
        } catch (error) {
            console.error(error)   
        }
    }

    const containerStyle = {
        backgroundImage: `url(${splashImg})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        filter: blurBackground ? 'blur(30px)' : 'none' // Apply blur if blurBackground is true
    };

    return(
       
        <div className="center login-container" style={containerStyle}>
            
        
        
            <h1 className="centered-heading">Text Adventure Game For Education Login Page</h1>
            <br></br>
            
            <form onSubmit={handleSubmit} className='login-form'>
                <input
                    type ='email'
                    placeholder='Your Email'
                    required
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type ='password'
                    placeholder='Your Password'
                    required
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' classname='login-button'>Login</button>
                <p>Need to Login? <Link to='/signup'>Create Account</Link></p>
            </form>
            
        </div>
    )
}

export default Login
