import React from 'react'
import guideIcon from "../../assets/guideIcon.png"
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";

function Avatar({userData={}}) {
 return (
  <div className="border-2 bg-blue-500 flex justify-center rounded-xl ml-2">
    <Link 
      to="/view-profile" state={{userData}} 
      className="flex items-center justify-center p-1 rounded-md"
    >
      <motion.img
        src={userData?.image || guideIcon}
        className="w-4 h-5 sm:w-6 sm:h-6  object-cover"
      />
    </Link>
  </div>
);

}

export default Avatar