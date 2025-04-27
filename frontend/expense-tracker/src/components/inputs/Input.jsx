import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ value, onChange, label, type, placeholder }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='mb-4'>
      <label className='text-[13px] text-slate-800 mb-1 block'>{label}</label>

      <div className='input-box relative border border-gray-300 rounded-md p-2'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none'
        />
        
        {type === 'password' && (
          <>
          {showPassword ? (
            <FaRegEye
            size={22}
            className='text-primary cursor-pointer'
            onClick={() => toggleShowPassword()}
            />
          ) : (
            <FaRegEyeSlash
            size={22}
            className='text-slate-400 cursor-pointer'
            onClick={() => toggleShowPassword()}
            />
          )}
          </>
        )}
      </div>
    </div>
  )
}

export default Input