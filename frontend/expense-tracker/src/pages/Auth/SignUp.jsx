import React, {useState} from 'react'
import Input from "../../components/inputs/Input"
import { validateEmail } from '../../utils/helper'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle SignUp Form Submit
  const handleSignUp = async (e) => {}


  return (
    <AuthLayout>
      <div className=''>
        <h3>Create an Account</h3>
      </div>
    </AuthLayout>
  )
}

export default SignUp