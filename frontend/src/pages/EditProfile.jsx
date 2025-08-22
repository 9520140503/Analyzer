import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { Image, Mail, Pencil, Phone, Save, UserCheck } from 'lucide-react';

function Input({label, type="text", name, value, placeholder, icon, handleChange}) {
    return (
        <div className='w-full'>
            <label htmlFor={name}
            className='flex items-center gap-1 text-sm sm:text-md md:text-lg mt-4'
            >{icon}{label}</label>
            <input 
            type={type} 
            id={name} 
            name={name} 
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required
            className='w-full p-2 rounded bg-white/20 backdrop-blur-md outline-none focus:ring-2 focus:ring-purple-400 mt-2'/>
        </div>
    )
}

function EditProfile() {
  const location = useLocation();
  const {userInfo} = location.state || {};
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    image: userInfo?.image || "",
    fullname: userInfo?.fullname || "",
    email: userInfo?.email || "",
    mobile: userInfo?.mobile || ""
  })

  const token = localStorage.getItem('token');

  const handleSubmit =  async(e) => {
    e.preventDefault();
    setLoader(true);
    try {
        const response = await fetch('http://localhost:3000/user/update-profile',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
        })

        const data = await response.json();
        console.log(data);

        if(response.ok) {
            alert("Data Updated Successfully");
            setTimeout(() => {
                navigate('/view-profile',{
                    state: {userInfo}
                });
            },1000)
        }

        setError('');
    } catch (error) {
        setError(error.message || "Something went wrong");;
    }
    finally{
        setLoader(false);
    }
  }
  

  const handleChange = (e) => {
    const {name,value} = e.target;
    setUpdateData(prevData => ({
        ...prevData,[name]: value
    }))
  }

  return (
    <motion.div 
    whileHover={{ scale: 1.05 }}
    transition={{
        duration:2,
        ease: "easeInOut"
    }}
  
    className='w-full max-w-sm md:max-w-lg m-16 mt-24 p-2 rounded-lg border-4 border-purple-300 text-white bg-gray-950 mx-auto hover:shadow-lg hover:shadow-green-300'>
        <h1 className='text-2xl font-bold mt-2 text-purple-300 flex  justify-center items-center gap-x-2'><Pencil/>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-start justify-center p-5 w-full bg-white/10 backdrop-blur-sm rounded-lg mt-2 border-2 border-white'>
           
           <Input label="Image" type='text' name="image" value={updateData?.image} placeholder="Enter Image Link" icon={<Image size={22} color='yellow' />} handleChange={handleChange}/>
           
           <Input label="FullName" type='text' name="fullname" value={updateData?.fullname} placeholder="Enter Fullname" icon={<UserCheck size={22} color='pink' />} handleChange={handleChange}/>
           
           <Input label="Email" type='email' name="email" value={updateData?.email} placeholder="Enter Email" icon={<Mail size={22} color='lightBlue' />} handleChange={handleChange}/>
    
           <Input label="Mobile" type='tel' name="mobile" value={updateData?.mobile} placeholder="Enter Mobile Number" icon={<Phone size={22} color='lightGreen' />} handleChange={handleChange}/>
    
            {error && <p className='text-center text-red-300'>{error}</p>}

            <button type='submit'
            className='flex gap-x-2 justify-center w-full bg-emerald-500 mt-4 py-2 rounded hover:bg-emerald-600'>{loader ? "Updating" : "Save"} <Save/></button>
            {error && <p className='text-center w-full mt-2 text-rose-300'>{error}</p>}
        </form>
    </motion.div>
  )
}


export default EditProfile;