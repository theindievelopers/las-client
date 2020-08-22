import React, { useState, useEffect } from 'react'
import Sidebar from '../Layout/Sidebar'
import Topbar from '../Layout/Topbar'
import {
  Card, 
  // CardText, 
  CardBody,
  // CardTitle, 
  // Button, 
  Col, 
  CardImg,
  // Table
} from 'reactstrap';


const HomePage = () => {
  const [applicationData, setApplicationData] = useState([])
  const [applications, setApplications] = useState([])
  const [employees, setEmployees] = useState([])
  const [img64, setImg64] = useState("")
  const [image, setImage] = useState("")
  const [imageInput, setImageInput] = useState({})
  const [isImageValid, setIsImageValid] = useState(false)
  const [formData, setFormData] = useState()

  useEffect(() => {
    if (!sessionStorage.isLoggedIn) {
      window.location.replace('#/login')
    }

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