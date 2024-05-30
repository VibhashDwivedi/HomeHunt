import React from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home-bg'>

        <div className="">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div>
                <div className="text-center">
                    <h1 className="display-1 fw-bold text-white">Welcome to Rentify</h1>
                    <p className="text-white">The best place to find your next home</p>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to ="/login"><button className="btn btn-primary rounded-0" >Get Started</button></Link>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Home