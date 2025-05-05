import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from "../../components/inputs/Input"

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)

  const navigate = useNavigate()

  //Handle Login Form Submit
  const handleLogin = async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter a valid email address')
      return
    }
    if(!password){
      setError('Please enter your password')
      return
    }

    setError("");

    // Call the login API
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-x5 text-slate-700 nt-[5px] mb-6">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleLogin}>
          <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email"
          placeholder="Enter your email"
          type="email"
          required
          />

          <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
          required
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{' '}
            <Link className='font-medium text-primary underline' to='/signup'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login