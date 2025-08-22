import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import { store } from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/AuthLayout.jsx';;
import {CareerGuide, CvAnalyzer, EditProfile, Home, InterviewGuide, Login, Signup,ViewProfile} from "../src/pages/index.js"

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      },
      {
        path:'/signup',
        element:<AuthLayout authentication={false}>
          <Signup/>
        </AuthLayout>
      },
      {
        path:'/analyzer',
        element:<AuthLayout authentication={true}>
          <CvAnalyzer/>
        </AuthLayout>
      },
      {
         path:'/career-guide',
        element:<AuthLayout authentication={true}>
          <CareerGuide/>
        </AuthLayout>
      },
      {
        path:'/interview-guide',
        element:<AuthLayout authentication={true}>
          <InterviewGuide/>
        </AuthLayout>
      },
      {
        path:'/view-profile',
        element:<AuthLayout authentication={true}>
          <ViewProfile/>
        </AuthLayout>
      },
      {
        path:'/edit-profile',
        element:<AuthLayout authentication={true}>
          <EditProfile/>
        </AuthLayout>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)
