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
            localStorage.removeItem('token');
            navigate('/login')
        }

    } catch (error) {
        console.log("Logout Successful",error);
    } finally{

    }
  }
  return (
    <button 
    className=' text-white rounded-lg hover:bg-blue-500  duration-500'
    onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout