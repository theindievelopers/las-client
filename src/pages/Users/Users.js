import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Topbar from '../../Layout/Topbar'
import Axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if(!sessionStorage.isLoggedIn) {
      window.location.replace('#/login')
    }
  }, [])

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main-panel">
        <Topbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 ">
              <div className="text-center">
                <h1 className='pt-5 pb-3'>Users</h1>
              </div>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}


export default Users;