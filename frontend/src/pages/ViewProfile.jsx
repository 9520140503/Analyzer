import React from 'react'
import {motion} from "framer-motion";
import { Mail, Phone, User2 } from 'lucide-react';
import guideIcon from "../assets/guideIcon.png"
import { useLocation } from 'react-router-dom';

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
    const {userData} = location.state || {};
  return (
    <motion.div
    className='w-full max-w-sm md:max-w-xl m-16 p-5 rounded-lg border-2 border-cyan-500/30 text-white backdrop-blur-md bg-white/10 mx-auto'>
         <h1 className=' text-lg sm:text-xl md:text-2xl text-emerald-300 font-bold flex items-center justify-center gap-x-2'><User2 color='lightGreen'/>Profile</h1>
         <motion.div className='w-24 h-24 border-4 border-emerald-400 mt-2 bg-gray-900 p-4 rounded-2xl mx-5'>
            <motion.img
                src={userData?.image || guideIcon}
                className='w-12 h-14 sm:w-16 sm:h-18 md:w-24 md:h-26 object-contain'
            />
         </motion.div>
         
         <InfoDiv info={userData?.fullname} icon={<User2 size={24} color='lightBlue'/>}/>
         <InfoDiv info={userData?.email} icon={<Mail size={24} color='green'/>}/>
         <InfoDiv info={userData?.mobile || '000-000-000'} icon={<Phone size={24} color='red'/>}/>
    </motion.div>
  )
}

export default ViewProfile