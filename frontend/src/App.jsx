import React from 'react'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='bg-gray-800'>
      <Header/>
      <main className='min-h-screen bg-gray-800'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App;