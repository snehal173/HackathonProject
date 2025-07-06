import React from 'react'
import img from "../assets/login.jpg"
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
const OrgLogin = () => {
      const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [show,setShow]=useState(false)
      const navigate=useNavigate();
  return (
     <div className="min-h-screen w-full flex flex-col-reverse lg:flex-row">
    {/* Left: Image Section */}
    <img
      src={img}
      alt="Illustration"
      className="w-full h-[250px] object-cover lg:h-screen lg:w-1/2"
    />

    {/* Right: Form Section */}
    <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 lg:p-12">
      {/* Logo & Title */}
      <div className="flex items-center gap-2 mb-6">
        <img  alt="Logo" className="w-[80px] h-[60px]" />
        <div className="text-3xl font-bold">Echo AI</div>
      </div>

      <div className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
        Welcome Back!
      </div>

      {/* Form */}
      <form
       // onSubmit={loginHandler}
        className="flex flex-col gap-4 items-center w-full max-w-md"
      >
       
        

        {/* Email */}
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

        {/* Password */}
        <div className="flex flex-col gap-1 w-full">
          <label>Password</label>
          <div className="flex items-center justify-between border-2 border-gray-400 rounded-md px-3 w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 w-full focus:outline-none"
            />
            <span
              className="ml-2 text-sm text-blue-600 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-white w-full py-2 rounded-md text-lg font-semibold transition cursor-pointer"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="w-full max-w-md border-b border-gray-300 my-6"></div>

      {/* Signup Link */}
      <p className="text-base text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-red-500 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  </div>
  )
}

export default OrgLogin