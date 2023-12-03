import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {

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

    return(
        <div className ="center">
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
            </form>
            <p>Need to Login? <Link to='/signup'>Create Account</Link></p>
        </div>
    )
}

export default Login
