import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/authSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
        const response = await fetch('http://localhost:3000/user/logout',{
            method:"GET",
            headers:{
             "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
            }
        })

        if(response.ok){
            dispatch(logout());
            navigate('/login')
        }

    } catch (error) {
        console.log("Logout Successful",error);
    } finally{

    }
  }
  return (
    <button 
    className='bg-white text-black p-1'
    onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout