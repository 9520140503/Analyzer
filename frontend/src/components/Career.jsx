import { Timer, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactFlow, { Background, Controls, MiniMap, Handle } from "reactflow"
import "reactflow/dist/style.css"

function PhaseNode({data}){
    const {emojiTag, phase, duration, skills, milestones, resources} = data;
    return <div className='bg-gray-900 text-white rounded-xl p-3 shadow-md w-80 border-2 border-purple-300'>
        <h3 className='text-purple-300 font-bold'>
            {emojiTag} {phase}
        </h3>
        
        <p className="text-md text-blue-300">⏳ {duration}</p>

        <div className='mt-5'>
            <p className='font-bold text-red-400'>Skills</p>
            <ul className='list-disc list-inside text-sm'>
                {skills.map((s,i) => (
                    <li 
                    className='text-green-300'
                    key={i}>{s}</li>
                ))}
            </ul>
        </div>

        <div className='mt-5'>
             <p className='font-bold text-yellow-400'>Milestones</p>
            <ul className='list-disc list-inside text-sm'>
                {milestones.map((m,i) => (
                    <li 
                    className='text-blue-500'
                    key={i}>{m}</li>
                ))}
            </ul>
        </div>

        <div className='mt-5'>
             <p className='font-bold text-purple-400'>Resources</p>
            <ul className='list-disc list-inside text-xs'>
                {resources.map((r,i) => (
                    <li 
                    className='text-blue-500'
                    key={i}>
                        <a 
                        href={r.link}
                        target='_blank'
                        rel="noopener noreferrer"
                        className='text-pink-400 underline text-xs font-bold'>
                            {r.name}
                        </a>{" "}
                        {r.type}
                    </li>
                ))}
            </ul>

            <Handle type='target' position='top'/>
            <Handle type='source' position='bottom'/>
        </div>
    </div>
}

function Career({ careerData = {} }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const phases = careerData?.response?.phases || [];

  useEffect(() => {
    if (phases.length > 0) {
      const generateNodes = phases.map((p, i) => ({
        id: `${i + 1}`,
        type:"phaseNode",
        position: { x: i * 350, y: 100 },
        data: p,
      }));

      const generateEdges = phases.slice(1).map((_, i) => ({
        id: `e${i + 1}-${i + 2}`,
        source: `${i + 1}`,
        target: `${i + 2}`,
        animated: true,
      }));

      setNodes(generateNodes);
      setEdges(generateEdges);
    }
  }, [phases]);

  return (
    <div className="h-full">
      {careerData?.response ? (
        <div className="h-full">
          {/* Header Section */}
          <div className="border-2 border-dashed border-purple-400 py-2 rounded-lg shadow-fuchsia-400 shadow-md">
            <h2 className="text-center text-green-300 text-lg md:text-2xl font-bold flex justify-center items-center gap-2 underline">
              <User color="white" size={28} />
              {careerData?.response?.jobRole?.toUpperCase()}
            </h2>
            <h2 className="flex items-center justify-center gap-2 text-center text-blue-300 text-lg md:text-xl font-bold mt-2">
            <Timer color='white' size={28}/>  {careerData?.response?.totalDuration}
            </h2>
          </div>

          {/* React Flow Section */}
          <div className="w-full mt-5 border-2 border-dashed p-2 h-[600px]">
            <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            fitView
            nodeTypes={{phaseNode:PhaseNode}}>
              {/* <MiniMap /> */}
              <Controls />
              <Background color="#aaa" gap={20} />
            </ReactFlow>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full ">
          <p className="text-blue-300 text-md sm:text-lg md:text-2xl">
            Generate Your Roadmap
          </p>
        </div>
      )}
    </div>
  );
}

export default Career;
