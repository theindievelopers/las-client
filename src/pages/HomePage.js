import React, { useState, useEffect } from 'react'
import Sidebar from '../Layout/Sidebar'
import Topbar from '../Layout/Topbar'


const HomePage = () => {

  useEffect(() => {
    if (!sessionStorage.isLoggedIn) {
      window.location.replace('#/login')
    }
  }, [])

  return (
    <React.Fragment>
      <div className='d-flex'>
        <Sidebar />
        <div className='d-flex flex-column w-100'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>HOMEPAGE</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;