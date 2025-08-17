import { Timer, User } from 'lucide-react'


function Career({ careerData = {} }) {

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

          <div className="w-full mt-10 flex justify-center items-center p-5">
            <ul className='grid justify-center grid-cols-1 gap-8 sm:grid-cols-2 overflow-auto mx-auto'>
                {careerData?.response?.phases?.map((phase,i) => (
                  <li 
                  key={i}
                  className='bg-gray-900 text-white rounded-xl p-3 shadow-md w-80 h-120 border-2 border-purple-300 mr-5'>
                    <h3 className='text-purple-300 font-bold'>
                      {phase.emojiTag} {phase.phase}
                    </h3>
                     <p className="text-md text-blue-300">⏳ {phase.duration}</p>

                    <div className='mt-5'>
                        <p className='font-bold text-red-400'>Skills</p>
                        <ul className='list-disc list-inside text-sm'>
                            {phase?.skills?.map((s,i) => (
                                <li 
                                className='text-green-300'
                                key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='mt-5'>
                      <p className='font-bold text-yellow-400'>Milestones</p>
                      <ul className='list-disc list-inside text-sm'>
                          {phase?.milestones?.map((m,i) => (
                              <li 
                              className='text-blue-500'
                              key={i}>{m}</li>
                          ))}
                      </ul>
                  </div>

              <div className='mt-5'>
                  <p className='font-bold text-purple-400'>Resources</p>
                  <ul className='list-disc list-inside text-xs'>
                      {phase?.resources?.map((r,i) => (
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

                </div>
                  </li>
              ))}
            </ul>
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
