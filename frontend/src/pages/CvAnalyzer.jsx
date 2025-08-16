import React, { useRef, useState } from 'react'
import FileImage from "../components/FileImage"
import CvInfo from '../components/CvInfo';
import Loader2 from '../components/Loader2';

function CvAnalyzer() {
  const [loader,setLoader] = useState(false);
  const [resultData, setResultData] = useState({});
  const [selectedFile, setselectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [error,setError] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoader(true);
    try {
      // New thing:
      const formData = new FormData();
      formData.append("resume",selectedFile);
      formData.append("description",jobDescription);

      const response = await fetch('http://localhost:3000/ai/analyze',{
        method:"POST",
        body: formData
      });

      if(!response.ok){
        throw new Error(`Server Error ${response.status}`)
      }

      const data = await response.json();
      console.log(data);
      setResultData(data);

      fileInputRef.current.value = null;
      setselectedFile(null);

      setError('');
    } catch (error) {
      setError(error.message);
    } finally{
      setLoader(false);
      setJobDescription("");
    }
  }

  const handleChange = (e) => {
    setselectedFile(e.target.files[0]);
    // console.log(fileInputRef.current.files[0]);
  }
  return (
    <div className='flex-wrap sm:flex-nowrap  flex gap-4 w-full p-6'>
        <div className="flex flex-col items-center justify-center w-full sm:w-3/4 md:w-2/4 lg:w-2/5 border-2 border-blue-300 rounded-md md:h-[calc(100vh-5rem)] p-4">
          <h2 className="font-bold text-emerald-400 text-center text-lg sm:text-xl md:text-3xl">
            Upload Your Resume
          </h2>
          <div className="bg-gray-900 text-white border-2 border-dashed rounded-lg p-4 mt-5 w-full h-auto md:h-[calc(100%-4rem)]">
            <FileImage className="mx-auto" />
            <h2 className="text-center mt-6 text-gray-400 text-md md:text-xl lg:text-2xl">
              Drag Or Upload File
            </h2>
            {!selectedFile && <p className="text-center mt-6 text-red-400 text-xs md:text-md lg:text-lg">
            Accept Only Docx And Pdf File.
            </p>}

            <form 
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="block text-sm text-gray-300 
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-purple-500 file:text-white
                          hover:file:bg-emerald-400"
                accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
              />
              
              <input 
              type="text"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className='mt-5 px-4 py-1 bg-gray-100 text-black rounded outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400'
              placeholder='Enter Job Description...'
              />
              <button
                type="submit"
                disabled={!jobDescription || !selectedFile}
                className="bg-blue-400 mt-8 w-full sm:w-2/3 p-2 rounded hover:bg-emerald-400"
              >
                Get Result
              </button>
            </form>
            {error && <p className='text-center text-red-400'>{error}</p>}
          </div>
        </div>

        <div id='rightCvPart' className="text-white flex flex-col justify-center items-center right w-full sm:w-2/3 border-2 border-blue-300 rounded-md h-[calc(100vh-5rem)]">
            {loader ? 
              <Loader2/> :
              (resultData ? 
                <CvInfo cvInfo={resultData}/>
              :
              <p className='text-emerald-400 text-md  md:text-3xl text-center '>Upload your resume to get results</p>)}
        </div>
    </div>
  )
}

export default CvAnalyzer