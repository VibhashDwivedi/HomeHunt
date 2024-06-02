import React from 'react'
import '../css/home.css'
import { NavLink } from 'react-router-dom'

const Error404 = () => {
  return (
   
    <div className='home-bg'>
        <div className="container pt-5 ">
           
            <h1 className="text-center">404</h1>
        <h3 className="text-center">Page not found</h3>
        <div className='d-flex justify-content-center align-items-center mt-4'>
        <NavLink to='/home' className='btn btn-primary'>Go back to Home</NavLink> 
        </div>
          
       
    </div>
    </div>
    
  )
}

export default Error404