import React from 'react'
import img from '../assets/signup.jpg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import toast from 'react-hot-toast';

const OrgSignup = () => {
     const [email,setEmail]=useState('')
    const [show,setShow]=useState(false)
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const navigate=useNavigate();

  return (
    <div className="h-100vh w-full flex flex-col-reverse lg:flex-row justify-center">
    {/* Image Section */}
    <img
      src={img}
      alt="Side illustration"
      className="w-full h-[250px]  lg:h-[650px] lg:w-1/2"
    />

    {/* Form Section */}
    <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 lg:p-12">
      {/* Logo & Title */}
      <div className="flex items-center gap-2 mb-6">
        <img  className="w-[80px] h-[70px]" alt="Echo AI Logo" />
        <div className="text-3xl font-bold">Echo AI</div>
      </div>

      <div className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
        Welcome Back!
      </div>

      {/* Signup Form */}
      <form
       // onSubmit={signupHandler}
        className="flex flex-col gap-4 items-center w-full max-w-md"
      >
         <div className="flex flex-col gap-1 w-full">
          <label>Organisation Name</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-400 rounded-md w-full py-2 px-3"
          />
        </div>
       

        {/* Email Field */}
        <div className="flex flex-col gap-1 w-full">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-400 rounded-md w-full py-2 px-3"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <label>Password</label>
          <div className="flex items-center justify-between border-2 border-gray-400 rounded-md w-full px-3">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 w-full focus:outline-none"
            />
            <span
              className="ml-2 text-sm cursor-pointer text-blue-500"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md text-lg font-semibold transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="w-full max-w-md border-b border-gray-300 my-6"></div>

      {/* Redirect */}
      <p className="text-base text-center">
        Already have an account?{" "}
        <Link className="text-red-500 font-medium" to="/login">
          Log In
        </Link>
      </p>
    </div>
  </div>
);

}

export default OrgSignup