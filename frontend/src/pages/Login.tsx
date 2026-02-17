import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { AUTH_SERVICE_URL } from '../config'
import toast from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google'
import './Login.css'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const responseGoogle = async (authResult: any) => {
        try {
            const result = await axios.post(`${AUTH_SERVICE_URL}/api/auth/login`,{
                code:authResult["code"]
            })
            localStorage.setItem('token',result.data.token)
            toast.success('Login successful')
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Problem while login")
            setLoading(false)
        }
    }

    const handleGoogleError = () => {
      setLoading(false)
      toast.error('Google sign-in failed')
    }

    const googleLogin = useGoogleLogin({
        onSuccess:responseGoogle,
        onError:handleGoogleError,
        flow:'auth-code'
    })

    const handleGoogleLogin = () => {
      if (loading) return
      setLoading(true)
      googleLogin()
    }
  return (
    <div className='login-page'>
      <div className='bg-orb bg-orb-left' aria-hidden='true' />
      <div className='bg-orb bg-orb-right' aria-hidden='true' />

      <div className='login-card'>
        <p className='brand-badge'>Zomato Clone</p>
        <h1 className='login-title'>Welcome back</h1>
        <p className='login-subtitle'>Sign in to continue with your account</p>

        <button
          type='button'
          className='google-login-button'
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className='google-icon' aria-hidden='true'>
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path fill='#EA4335' d='M12 10.2v4.2h5.9c-.3 1.4-1.9 4.2-5.9 4.2-3.5 0-6.4-2.9-6.4-6.6s2.9-6.6 6.4-6.6c2 0 3.3.9 4.1 1.6l2.8-2.7C17 2.7 14.7 1.8 12 1.8 6.9 1.8 2.8 6.2 2.8 12s4.1 10.2 9.2 10.2c5.3 0 8.8-3.8 8.8-9.2 0-.6-.1-1.1-.2-1.6H12z'/>
            </svg>
          </span>
          <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>
      </div>
    </div>
  )
}

export default Login
