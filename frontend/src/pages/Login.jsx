import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from 'lucide-react'; //
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../store/authSlice.js";
import guideIcon from "../assets/guideIcon.png"

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setformData] = useState({
    email: "",
    password: ""
  });

 
  const handleChange = (e) => {
    e.preventDefault();
    const {name,value} = e.target;
    setformData((formData) => ({
      ...formData,[name]:value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError('');
    try {VITE_BACKEND_ENDPOINT
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/user/login`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(formData)
      })

      const data = await response.json();

      if(response.ok){
        const {token} = data;
        localStorage.setItem('token',token);
        dispatch(login(data));
        setTimeout(() => {
          navigate('/')
        },4000);
      }
      console.log("Login SuccessFull");
    } catch (error) {
       setError(error.message);
    } finally{
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        {/* Logo and Heading Div */}
        <div className="hidden flex-1 md:flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-lg hover:shadow-blue-300">
          <img
            src={guideIcon}
            alt="Logo"
            className="w-32 h-36 mb-4 rounded-full animate-updown"
          />
          <h1 className="text-3xl text-white text-center">Welcome to CareerParto</h1>
        </div>

        {/* Login Form Div */}
        <div className="flex-1 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-lg transition-transform hover:scale-105 hover:border-2 hover:border-purple-500 hover:shadow-blue-300">
          <h2 className="text-2xl text-blue-300 text-center mb-6">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 bg-white/20 text-white rounded-lg focus:bg-white/30 focus:outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-white text-sm mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 pr-10 bg-white/20 text-white rounded-lg focus:bg-white/30 focus:outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 cursor-pointer text-white"
              >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {error && <p className='text-center text-red-500 m-1'>{error}</p>}

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition"
            >
             {loader ? "Logging" : "Log In"}
            </button>
          </form>

          <p className='text-center mt-2'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-green-500 font-bold'>Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
