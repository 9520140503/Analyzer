import React from 'react'
import guideIcon from "../../assets/guideIcon.png"
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";

function Avatar({userInfo={}}) {
 return (
  <div className="w-7 sm:w-8 border-2 flex justify-center rounded-xl ml-2">
    <Link 
      to="/view-profile" state={{userInfo}} 
      className="flex items-center justify-center rounded-md"
    >
      <motion.img
        src={userInfo?.image || guideIcon}
        className="w-full h-full  object-cover rounded-lg"
      />
    </Link>
  </div>
);

}

export default Avatar