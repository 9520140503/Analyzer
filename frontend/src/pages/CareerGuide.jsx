import { Map } from 'lucide-react';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import roadmap from '../assets/roadmap-removebg-preview.png';
import Loader2 from '../components/Loader2';
import Career from '../components/Career';

function CareerGuide() {
  const [jobRole, setJobRole] = useState('');
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch('http://localhost:3000/ai/career-guide',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({jobRole})
      })

      if(!response.ok) {
        throw new Error("Error ",response.error)
      }

      const data = await response.json();
      setData(data);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally{
      setJobRole('')
      setLoader(false);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
      {/* Left Section */}
      <div
        id="leftInterviewPart"
        className="flex flex-col w-full lg:w-2/5 border border-purple-400 rounded-2xl shadow-lg shadow-green-900/50 
        p-3 sm:p-4 md:p-6 bg-gray-950/60 backdrop-blur-md h-[calc(100vh-4rem)] overflow-auto"
      >
        <h2 className="font-bold text-purple-400 text-center text-base sm:text-lg md:text-xl lg:text-2xl flex items-center justify-center gap-x-2">
          <Map className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color="white" />
          Get Your Roadmap
        </h2>

        {/* Roadmap Image */}
        <div className=" h-[calc(100%-40%)] border-2 border-dashed border-purple-400/50 animate-pulse flex justify-center items-center mt-4 sm:mt-5 py-5">
          <img
            src={roadmap}
            alt="roadmapImage"
            className="max-w-full w-full sm:w-11/12 md:w-10/12 lg:w-4/5 h-auto max-h-[16rem] sm:max-h-[20rem] md:max-h-[24rem] lg:max-h-[28rem] object-contain"
          />
        </div>

        {/* Form */}
        <form 
        onSubmit={handleSubmit}
        className=" h-[calc(100%-65%)] mt-4 sm:mt-6 text-white flex flex-col justify-center gap-3 sm:gap-4 p-5">
          <label className="text-xs sm:text-sm md:text-base font-semibold">
            You Want To Become:
            <TypeAnimation
              sequence={['Full Stack Developer', 2500, 'Android Developer', 2500, 'AI-ML Engineer', 2500]}
              wrapper="span"
              speed={40}
              className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-green-300 font-bold"
              repeat={Infinity}
            />
          </label>

          <input
            type="text"
            placeholder="Enter your career goal..."
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full bg-gray-900/80 text-white placeholder:text-gray-400 
            px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 
            outline-none shadow-md text-xs sm:text-sm md:text-base"
          />

          {error && <p className='text-center text-red-300'>{error}</p>}

          <button
            type="submit"
            disabled={!jobRole}
            className={`${jobRole ? "bg-blue-500 hover:bg-emerald-400":"bg-gray-500"} transition-all duration-300 
            mt-2 sm:mt-3 w-full mx-auto p-2 sm:p-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base`}
          >
            Get Roadmap
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div
        id="rightInterviewPart"
        className="bg-gray-900 text-white flex flex-col w-full lg:w-3/5 border border-purple-400 
        rounded-2xl shadow-lg shadow-green-900/40 bg-gray-950/60 backdrop-blur-md 
        p-3 sm:p-4 md:p-6 h-[calc(100vh-4rem)] overflow-auto"
      >
        {loader ?
          <Loader2/>:
          <Career careerData={data}/>
        }
      </div>
    </div>
  );
}

export default CareerGuide;