import React, { useState } from 'react'
import Loader3 from '../components/LoaderRobo';
import { TypeAnimation } from 'react-type-animation';
import Interview from '../components/Interview';
import Loader2 from '../components/Loader2'
function InterviewGuide() {
  const [prompt, setPrompt] = useState('');
  const [loader,setLoader] = useState(false);
  const [error, setError] = useState('');
  const [data,setData] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch('http://localhost:3000/ai/interview-guide',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({prompt})
      });

      if(!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json();
      setData(data);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally{
      setPrompt('');
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
      {/* Left Section */}
      <div id="leftInterviewPart" className="flex flex-col w-full lg:w-2/5 border border-green-400 rounded-2xl shadow-lg shadow-green-900/50 p-4 md:p-6 bg-gray-950/60 backdrop-blur-md md:h-[calc(100vh-4.5rem)] overflow-auto">
        <h2 className="text-2xl sm:text-2xl md:text-3xl text-green-300 text-center font-extrabold mb-4 tracking-wide drop-shadow-lg">
          Ace Your Interview
        </h2>
        
        <ul>
          <li className="bg-gray-900 rounded-xl text-center m-3 text-purple-300 px-3 py-2 border border-green-300 shadow-md hover:scale-105 hover:shadow-green-500/30 transition-transform duration-300">
            Ask any type of question to take your interview prep to the next level.
          </li>

          <li className="text-center text-lg md:text-xl font-semibold m-3 py-4 h-32 flex items-center justify-center">
            <TypeAnimation
              sequence={[
                'How to introduce yourself in interviews',
                2500,
                'Give me the 30 most asked LeetCode questions in interviews',
                2500,
                'How to become confident during interviews',
                2500,
              ]}
              wrapper="span"
              speed={40}
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-blue-400 to-green-300 font-bold"
              repeat={Infinity}
            />
          </li>

          <div className="flex justify-center my-4">
            <Loader3 />
          </div>
        </ul>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3 mt-4"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="textArea"
            rows={4}
            placeholder="Enter your question"
            className="w-full bg-gray-900/80 text-white placeholder:text-gray-300 px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-md"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-emerald-400 mt-2 w-full p-2 rounded-xl font-semibold text-gray-900 hover:from-emerald-400 hover:to-blue-400 shadow-md shadow-emerald-700/30 transition-all duration-300"
          >
            Get Answers
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div
        id="rightInterviewPart"
        className="text-white flex flex-col  w-full lg:w-3/5 border border-green-400 rounded-2xl shadow-lg shadow-green-900/40 bg-gray-950/60 backdrop-blur-md p-4  h-[calc(100vh-4.5rem)] overflow-auto"
      >
        {loader ? 
          <Loader2/>:
          <Interview interviewInfo={data}/>
        }
      </div>
    </div>
  );
}

export default InterviewGuide;
