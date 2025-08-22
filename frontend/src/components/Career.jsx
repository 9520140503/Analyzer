import { Camera, Timer, User } from "lucide-react";
import html2canvas from "html2canvas";

function Career({ careerData = {} }) {
  return (
    <div className="h-full w-full">
      {careerData?.response ? (
        <div className="h-full w-full" id="screenShotSection">
          {/* Header Section */}
          <div className="border-2 border-dashed border-purple-400 py-3 px-4 rounded-lg shadow-fuchsia-400 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-center text-green-300 text-lg md:text-2xl font-bold flex justify-center items-center gap-2 underline">
              <User color="white" size={24} />
              {careerData?.response?.jobRole?.toUpperCase()}
            </h2>
            <h2 className="flex items-center justify-center gap-2 text-blue-300 text-lg md:text-xl font-bold">
              <Timer color="white" size={24} />{" "}
              {careerData?.response?.totalDuration}
            </h2>
          </div>

          {/* Roadmap Section */}
          <div className="w-full mt-10 flex justify-center items-center px-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
              {careerData?.response?.phases?.map((phase, i) => (
                <li
                  key={i}
                  className="bg-gray-900 text-white rounded-xl p-4 shadow-md border-2 border-purple-300 w-full"
                >
                  <h3 className="text-purple-300 font-bold text-lg">
                    {phase.emojiTag} {phase.phase}
                  </h3>
                  <p className="text-md text-blue-300">⏳ {phase.duration}</p>

                  {/* Skills */}
                  <div className="mt-4">
                    <p className="font-bold text-red-400">Skills</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {phase?.skills?.map((s, i) => (
                        <li className="text-green-300" key={i}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Milestones */}
                  <div className="mt-4">
                    <p className="font-bold text-yellow-400">Milestones</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {phase?.milestones?.map((m, i) => (
                        <li className="text-blue-500" key={i}>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="mt-4">
                    <p className="font-bold text-purple-400">Resources</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      {phase?.resources?.map((r, i) => (
                        <li className="text-blue-500" key={i}>
                          <a
                            href={r.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 underline text-xs font-bold"
                          >
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
