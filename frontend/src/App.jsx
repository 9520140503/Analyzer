import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './Store/authSlice';
import Loader from './components/Loader';
function App() {
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true)
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
      setLoader(false);
      return;
    }
      const fetchInfo = async() => {
      setLoader(true);
      try {
        const response = await fetch('http://localhost:3000/user/get-profile',{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        });

        if(response.ok){
          const data = await response.json();
          dispatch(login(data));
          navigate('/');
        }else{
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      } finally{
        setLoader(false);
      }
    }
    fetchInfo();
  },[navigate,dispatch])

  
  return (
    <div className='bg-gradient-to-tr from-indigo-900 via-gray-900 to-black'>
      <Header/>
      <main className='min-h-screen bg-gradient-to-tr from-indigo-900 via-gray-900 to-black'>
        {loader?<Loader/>:<Outlet/>}
      </main>
      <Footer/>
    </div>
  )
}

export default App;