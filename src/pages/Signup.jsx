import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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
        <div>
            <h1>Text Adventure Game For Education Signup Page</h1>
            <br></br>
            <form onSubmit={handleSubmit} className='signup-form'>
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
                <button type='submit' classname='signup-button'>Signup</button>
            </form>
            <p>Need to Login? <Link to='/login'>Login</Link></p>
        </div>
    )
}

export default Signup
