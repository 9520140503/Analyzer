import React from 'react'
import {motion} from "framer-motion";
import { Mail, Pencil, Phone, Power, User2 } from 'lucide-react';
import guideIcon from "../assets/guideIcon.png"
import { useLocation,Link } from 'react-router-dom';
import Logout from "../components/Header/Logout";

const InfoDiv = ({info, icon}) => {
    return (
         <motion.div 
         variants={itemVariants}
         className='flex flex-col items-start justify-center p-4 bg-gray-300/20 rounded-md hover:border-2 hover:border-pink-300 duration-200 mt-4'>
            <motion.h2
            className='flex items-center gap-x-2 text-sm sm:text-md md:text-lg'
            >
                {icon}
                {info || ' N/A'}</motion.h2>
         </motion.div>
    )
}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };


const ViewProfile = () => {
    const location = useLocation();
    const {userInfo} = location.state || {};

  return (
    <motion.div
    variants={containerVariants}
    whileHover={{ scale: 1.05}}
    className='w-full max-w-sm md:max-w-md m-16 p-5 rounded-lg border-4 border-yellow-500 text-white bg-gray-950 mx-auto hover:shadow-lg hover:shadow-white'>
         <h1 className=' text-lg sm:text-xl md:text-2xl text-emerald-300 font-bold flex items-center justify-center gap-x-2'><User2 color='lightGreen'/>Profile</h1>
         <motion.div 
         variants={itemVariants}
         className='w-24 h-24 border-4 border-emerald-400 mt-6 bg-white rounded-2xl mx-auto flex items-center justify-center'>
            <motion.img
                whileHover={{ scale: 1.1 }}
                src={userInfo?.image || guideIcon}
                className='w-full h-full object-cover rounded-2xl'
            />
         </motion.div>
         
         <InfoDiv info={userInfo?.fullname} icon={<User2 size={24} color='lightBlue'/>}/>
         <InfoDiv info={userInfo?.email} icon={<Mail size={24} color='green'/>}/>
         <InfoDiv info={userInfo?.mobile || '000-000-000'} icon={<Phone size={24} color='red'/>}/>

         <motion.div
         variants={itemVariants}
          className='w-full flex items-center justify-around gap-x-4 mt-4'>
            <Link to='/edit-profile' state={{userInfo}} className='flex items-center gap-x-2 text-sm sm:text-md md:text-lg bg-emerald-500 hover:bg-emerald-600 duration-500 p-2 rounded-lg'>
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