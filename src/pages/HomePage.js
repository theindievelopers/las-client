import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../Layout/Sidebar'
import Topbar from '../Layout/Topbar'
import { CredsContext } from '../context/Context'

const HomePage = (props) => {

  const { isLoggedIn } = useContext(CredsContext)

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }

    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, [])

  return (
    <React.Fragment>
      <div className=''>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>DASHBOARD</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;