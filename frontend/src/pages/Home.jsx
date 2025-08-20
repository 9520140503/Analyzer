import React from 'react'
import { motion } from 'framer-motion';
import heroman from "../assets/heroman.png";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Award, Medal } from "lucide-react";
import successVideo from "../assets/successVideo.mp4"

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status)

  const features = [
    "Analyze your resume score with detailed insights",
    "Get personalized suggestions to improve weak areas",
    "Discover strengths and highlights of your resume",
    "Access roadmaps for specific technology fields",
    "Prepare for interviews with AI-driven guidance"
  ];

  const goods = [
    "Know your resume score with suggestions and insights",
    "Get you tech roadmap based on your skills",
    "Prepare for interviews with AI-driven guidance",
    "Enhance your overall career prospects",
  ];

  // Animation variants for staggered entrance
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-indigo-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
              CAREERPARTO
            </span>
            <br />
            Your Path to Success
          </motion.h1>
          <motion.div
            className="mt-6 text-xl sm:text-2xl md:text-3xl font-medium text-cyan-200"
            variants={itemVariants}
          >
            <TypeAnimation
              sequence={[
                "Score Your Resume", 2200,
                "Plan Your Career", 2200,
                "Ace Your Interview", 2200,
              ]}
              wrapper="span"
              speed={50}
              className="inline-block"
              repeat={Infinity}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8 flex justify-center lg:justify-start">
            <Link
              to={authStatus ? "/analyzer" : "/login"}
              className="inline-block bg-cyan-500 text-gray-900 px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
            >
              {authStatus ? "Start Exploring" : "Join Now"}
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="lg:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <motion.img
            whileHover={{ scale: 1.5, x:"20%" }}
            src={heroman}
            className="w-48 sm:w-64 md:w-80 lg:w-96 object-contain"
            alt="CareerParto Hero"
          />
        </motion.div>
      </motion.div>

      {/* Success Video Section */}
      <motion.div
      variants={containerVariants}
      className='flex justify-center mt-16 md:mt-24 px-4 sm:px-6'>
        <motion.video
        src={successVideo}
        className='w-1/2 object-contain rounded-xl'
        autoPlay loop muted
        variants={itemVariants}
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-4 text-center border-2 border-dashed rounded-md bg-gray-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Welcome to CareerParto
        </motion.h2>
        <motion.p
          className="text-cyan-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
          variants={itemVariants}
        >
          CareerParto is your all-in-one platform for career success. Build a standout resume, follow tailored career roadmaps, and prepare for interviews with confidence using our AI-powered tools.
        </motion.p>
      </motion.div>

      {/* Features Section */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-2 mt-28 text-center"
        variants={itemVariants}
      >
        Key Features
      </motion.h2>
      <motion.div
        className="max-w-6xl mx-auto mt-5 md:mt-20 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
              {index + 1}
            </div>
            <Medal size={28} color='yellow'/>
            <p className="text-gray-200 text-base md:text-lg font-medium text-center">{feature}</p>
          </motion.div>
        ))}
      </motion.div>


      {/* Good Things To Know */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-2 mt-28 text-center"
        variants={itemVariants}
      >
        Good Things To Know
      </motion.h2>
      <motion.div
        className="max-w-6xl mx-auto mt-5 md:mt-20 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {goods.map((good, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
              {index + 1}
            </div>
            <Award size={28} color='green'/>
            <p className="text-gray-200 text-base md:text-lg font-medium text-center">{good}</p>
          </motion.div>
        ))}
      </motion.div>


      {/* Call to Action Section */}
      <motion.div
        className="text-center mt-16 md:mt-20 py-12 px-4 sm:px-6 bg-gray-800/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Ready to Elevate Your Career?
        </motion.h2>
        <motion.p
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          Join CareerParto today and take control of your professional journey with smart, AI-driven tools designed to help you succeed.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center">
          <Link
            to={authStatus ? "/analyzer" : "/login"}
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            {authStatus ? "Explore The Features" : "Sign Up Now"}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home