import React from 'react';
import { motion } from 'framer-motion';
import heroman from "../assets/heroman.png";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Award, Medal, Trophy } from "lucide-react";
import successVideo from "../assets/successVideo.mp4";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const features = [
    {
      line: "Analyze your resume score with detailed insights",
      imageLink: "https://t4.ftcdn.net/jpg/03/31/03/79/240_F_331037954_pYKEEpEI3ThPUgzQJmrl1V69lawrbruG.jpg"
    },
    {
      line: "Get personalized suggestions to improve weak areas",
      imageLink: "https://images.pexels.com/photos/5697261/pexels-photo-5697261.jpeg"
    },
    {
      line: "Discover strengths and highlights of your resume",
      imageLink: "https://cdn.vectorstock.com/i/500p/67/68/strength-vs-weakness-signpost-vector-15176768.avif"
    },
    {
      line: "Access roadmaps for specific technology fields",
      imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeQ3w9DbcS5fGqXJS9r50VqcfkisqNv6JAg&s"
    },
    {
      line: "Prepare for interviews with AI-driven guidance",
      imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg1Ke8bqCHlUstmNfa0aijrKB7gwE0RNAH9fMhrCv-RgYWZEmEeWhkwmYCnmMhgS8T6wI&usqp=CAU"
    },
  ];

  const goods = [
    "Know your resume score with suggestions and insights",
    "Get your tech roadmap based on your skills",
    "Prepare for interviews with AI-driven guidance",
    "Enhance your overall career prospects",
  ];

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)" },
    tap: { scale: 0.95 }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto pt-20 md:pt-32 px-4 sm:px-6 lg:px-8 gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500"
            variants={itemVariants}
          >
            CAREERPARTO
            <br />
            Your Path to Success
          </motion.h1>
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-300"
            variants={itemVariants}
          >
            <TypeAnimation
              sequence={[
                "Score Your Resume", 2000,
                "Plan Your Career", 2000,
                "Ace Your Interview", 2000,
              ]}
              wrapper="span"
              speed={40}
              className="inline-block"
              repeat={Infinity}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to={authStatus ? "/analyzer" : "/login"}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 px-10 py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-cyan-500/60"
              >
                {authStatus ? "Start Exploring" : "Join Now"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="lg:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <motion.img
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={heroman}
            className="w-56 sm:w-72 md:w-96 lg:w-[28rem] object-contain drop-shadow-2xl"
            alt="CareerParto Hero"
          />
        </motion.div>
      </motion.div>

      {/* Success Video Section */}
      <motion.div
        className="flex justify-center mt-16 md:mt-24 px-4 sm:px-6"
        variants={containerVariants}
      >
        <motion.video
          src={successVideo}
          className="w-full max-w-2xl object-cover rounded-2xl shadow-lg border border-cyan-500/30"
          autoPlay
          loop
          muted
          variants={itemVariants}
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-16 md:mt-24 px-4 sm:px-6 py-8 text-center bg-gray-950/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-lg"
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
          className="text-cyan-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
          variants={itemVariants}
        >
          CareerParto is your ultimate platform for career success. Craft a standout resume, follow personalized career roadmaps, and ace interviews with confidence using our cutting-edge AI tools.
        </motion.p>
      </motion.div>

      {/* Features Section */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-6 mt-20 md:mt-28 text-center"
        variants={itemVariants}
      >
        Key Features
      </motion.h2>
      <motion.div
        className="max-w-7xl mx-auto mt-5 md:mt-12 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-md">
              {index + 1}
            </div>
            <div className="flex items-center space-x-3">
              <Medal size={32} color="yellow" className="flex-shrink-0" />
              <p className="text-gray-100 text-base md:text-lg font-medium text-center">{feature.line}</p>
            </div>
            <img
              className="w-full h-48 object-cover mt-4 rounded-lg shadow-md"
              src={feature.imageLink}
              alt={feature.line}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Good Things To Know */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-6 mt-20 md:mt-28 text-center"
        variants={itemVariants}
      >
        Good Things To Know
      </motion.h2>
      <motion.div
        className="max-w-7xl mx-auto mt-5 md:mt-12 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {goods.map((good, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 flex items-center space-x-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-md">
              {index + 1}
            </div>
            <Trophy size={28} color="lightgreen" className="flex-shrink-0" />
            <p className="text-gray-100 text-base md:text-lg font-medium">{good}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="text-center mt-16 md:mt-24 py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
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
          className="text-gray-200 text-base md:text-lg max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          Join CareerParto today and unlock powerful AI-driven tools to craft your perfect resume, plan your career, and shine in interviews.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to={authStatus ? "/analyzer" : "/login"}
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 px-10 py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-cyan-500/60"
            >
              {authStatus ? "Explore The Features" : "Sign Up Now"}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;