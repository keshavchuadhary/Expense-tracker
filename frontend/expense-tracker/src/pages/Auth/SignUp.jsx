import React, {useState} from 'react'
import Input from "../../components/inputs/Input"
import { validateEmail } from '../../utils/helper'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      setError("Please upload a profile picture");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    // Call the signup API
  }


  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-x5 text-slate-700 nt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>


        <form onSubmit={handleSignUp} className=''>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Full Name"
            label="Full Name"
            required
            />

            <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
          />

          <div className='col-span-2'>
            <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            minLength={8}
            maxLength={20}
            type="password"
            required
            />
          </div>
          </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
            
            <button type='submit' className='btn-primary'>
             SIGN UP
            </button>
            
            <p className='text-[13px] text-slate-800 mt-3'>
                Already have an account ?{' '}
              <Link className='font-medium text-primary underline' to='/login'>
                 Login
              </Link>
            </p>    
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp