import React, { useEffect, useState } from 'react'
import {Badge, BadgeCheck, BadgePlus, BoomBox, Brain, Check, Medal, Trophy} from "lucide-react";

const ListItem = ({key,value,color,check}) => {
    return <li 
        className={`gap-2 flex bg-${color} m-4 p-2 shadow-md shadow-purple-400 hover:scale-105 duration-300 rounded hover:border-2 hover:border-blue-300`}
        key={key}>
        <span>{check}</span>
        <p>{value}</p>
    </li>
}

function CvInfo({cvInfo={}}) {
  const [scoreColor, setScoreColor] = useState('');
   useEffect(() => {
    const score = cvInfo?.response?.score;
    if (score >= 85) setScoreColor("green-300");
    else if (score >= 75) setScoreColor("blue-300");
    else if (score >= 55) setScoreColor("yellow-300");
    else setScoreColor("red-300");
  }, [cvInfo]);

  if(!cvInfo.response){
    return <p className='text-lg sm:text-xl md:text-3xl font-bold text-green-300 m-2 text-center'>
        Upload your resume to get results
    </p>
  }
  
  return (
    <div className='p-8 overflow-y-auto relative'>
        <h2 className=' text-center text-blue-300 text-md sm:text-xl md:text-2xl mb-4 font-bold'>Your Final Result</h2>
        <div className='border-dashed border-2 p-2 rounded'>
            <div className='flex justify-center items-center'>
            <Medal size={25}/>
            <h2 className='text-center text-blue-400 font-bold text-md sm:text-md md:text-xl'>ATS SCORE</h2>
            </div>
            <div className={`mx-auto w-fit bg-gray-950/30 border-4 border-${scoreColor} flex flex-col items-center justify-center m-5 p-10 rounded-full shadow-lg shadow-green-500`}>
            <h3 className='text-lg md:text-2xl'>{cvInfo?.response?.score}%</h3>
            <h3 className={`text-${scoreColor} text-lg md:text-2xl`}>{cvInfo?.response?.grade}</h3>
            </div>
        </div>
        <div className='border-dashed border-2 p-2 rounded mt-8'>
            <div className='flex justify-center items-center mt-4'>
                <BadgePlus size={25}/>
                <h2 className='text-center text-emerald-400 font-bold text-md sm:text-md md:text-xl'>SUGGESTIONS</h2>
            </div>
            <ul className='w-fit mt-8'>
                {cvInfo.response?.suggestions?.length > 0 ?
                cvInfo.response?.suggestions.map((suggestion,index) => (
                    <ListItem key={index} value={suggestion} color={"blue-950"} check={<Brain size={24}/>}/>
                )):
                <p>Nothing to show</p>
                }
            </ul>

        </div>
        <div className='border-dashed border-2 p-2 rounded mt-8'>
             <div className='flex justify-center items-center mt-4'>
            <Trophy size={25}/>
            <h2 className='text-center text-purple-400 font-bold text-md sm:text-md md:text-xl'>GOOD THINGS</h2>
         </div>
         <ul className='mt-8'>
            {cvInfo.response?.good_things?.length > 0 ?
               cvInfo.response?.good_things.map((things,index) => (
                 <ListItem key={index} value={things} color={"gray-950"} check={<BadgeCheck size={24}/>}/>
            )):
            <p>Nothing to show</p>
            }
        </ul>
        </div>
    </div>
  )
}

export default CvInfo