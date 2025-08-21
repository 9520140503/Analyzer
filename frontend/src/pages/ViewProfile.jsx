import React from 'react'
import {motion} from "framer-motion";
import { Mail, Pencil, Phone, Power, User2 } from 'lucide-react';
import guideIcon from "../assets/guideIcon.png"
import { useLocation,Link } from 'react-router-dom';
import Logout from "../components/Header/Logout";

const InfoDiv = ({info, icon}) => {
    return (
         <motion.div className='flex flex-col items-start justify-center mt-2 p-6'>
            <motion.h2
            className='flex items-center gap-x-2 text-sm sm:text-md md:text-lg'
            >
                {icon}
                {info || ' N/A'}</motion.h2>
         </motion.div>
    )
}
const ViewProfile = () => {
    const location = useLocation();
    const {userInfo} = location.state || {};

  return (
    <motion.div
    whileHover={{ scale: 1.05}}
    className='w-full max-w-sm md:max-w-xl m-16 p-5 rounded-lg border-4 border-yellow-500 text-white backdrop-blur-md bg-white/20 mx-auto hover:shadow-lg hover:shadow-white'>
         <h1 className=' text-lg sm:text-xl md:text-2xl text-emerald-300 font-bold flex items-center justify-center gap-x-2'><User2 color='lightGreen'/>Profile</h1>
         <motion.div className='w-24 h-24 border-4 border-emerald-400 mt-6 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center'>
            <motion.img
                whileHover={{ scale: 1.1 }}
                src={userInfo?.image || guideIcon}
                className='w-full h-full object-cover rounded-2xl'
            />
         </motion.div>
         
         <InfoDiv info={userInfo?.fullname} icon={<User2 size={24} color='lightBlue'/>}/>
         <InfoDiv info={userInfo?.email} icon={<Mail size={24} color='green'/>}/>
         <InfoDiv info={userInfo?.mobile || '000-000-000'} icon={<Phone size={24} color='red'/>}/>

         <motion.div className='w-full flex items-center justify-around gap-x-4 mt-4'>
            <Link to='/edit-profile' className='flex items-center gap-x-2 text-sm sm:text-md md:text-lg bg-emerald-500 hover:bg-emerald-600 duration-500 p-2 rounded-lg'>
               <Pencil size={20}/> Edit Profile
            </Link>
            <Link className='flex items-center gap-x-2 text-sm sm:text-md md:text-lg bg-blue-900 p-2 rounded-lg hover:bg-blue-500 duration-500'>
              <Power size={20}/><Logout/>
            </Link>
         </motion.div>
    </motion.div>
  )
}

export default ViewProfile