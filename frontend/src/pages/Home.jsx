import React from 'react'
import {motion} from 'framer-motion';
import {TypeAnimation} from "react-type-animation";
const Home = () => {
  return (
    <div>
      <motion.div
      className='w-full h-fit mt-24 md:mt-40 p-4 md:p-6'>
          <motion.h1
           className='text-center text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-900 via-white to-black'>DO YOUR <span className='text-white'>PREP</span> WITH <span className='bg-clip-text text-transparent bg-purple-200'>CAREERPARTO</span>
          </motion.h1>
          <motion.div className='flex justify-center w-full mt-10 py-2 md:py-4'>
            <TypeAnimation
                sequence={['Analyze Your Resume', 2500, 'Find Your Roadmap', 2500, 'Prepare for interview', 2500]}
                wrapper="span"
                speed={40}
                className="height-auto text-lg sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-bold"
                repeat={Infinity}
              />
          </motion.div>
      </motion.div>
    </div>
  )
}

export default Home