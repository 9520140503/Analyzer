import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AuthLayout({authentication=true,children}) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
    setLoader(false);
  },[authentication,authStatus,navigate])

  return (
    <div>
        {loader ? 
            <div>
                Loader
            </div>
            :
            <div>
                {children}
            </div>
        }
    </div>
  )
}

export default AuthLayout