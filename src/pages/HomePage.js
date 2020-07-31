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
    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        // setApplications(data)
        // let base64String = btoa(String.fromCharCode(...new Uint8Array(data[12].signature.data)))
        // console.log('FROM FETCH',base64String)
        // let image = btoa(String.fromCharCode.apply(null, data[9].signature.data));
        // setImg64(data[12].signature.data)
        // console.log(image)
        // console.log(data[0].signature)
        setImg64(data[13].signature)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
    if (!sessionStorage.isLoggedIn) {
      window.location.replace('#/login')
    }

    // fetch('http://localhost:3000/application')
    //   .then(res => res.json())
    //   .then(data => console.log(data))
  }, [])

  const handleData = () => {
    // console.log(applications)
    // fetch('http://localhost:3000/application', {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     application_form_code: "LEAVE_FORM_1",
    //     employee_id: 1,
    //     application_data: {
    //       name: "Third Complete",
    //       employee_code: "12345ssasd",
    //       project: "IT",
    //       position: "Developer",
    //       departure_date: "2020-07-29",
    //       return_date: "2020-08-05",
    //       leave_type: "annual",
    //       contact_number: "132456789",
    //       handover_briefing_to_successor: "n/a",
    //       handover_briefing_to_successor_employee_name: "n/a",
    //       handover_briefing_to_successor_employee_code: "n/a",
    //       handover_documents_employee_name: "n/a",
    //       handover_documents_employee_code: "n/a",
    //       items_issued: "none",
    //       remarks: "all goods",
    //       logistics_officer_signature_and_date: "2020-07-28",
    //       immidiate_supervisor_manager_signature_and_date: "2020-07-28",
    //       project_manager_signature_and_date: "2020-07-28",
    //       accounting_department_signature_and_date: "2020-07-28",
    //       receive_ticket: true,
    //       receive_settlement: "none",
    //       receive_others: "none",
    //       receive_others_remarks: "a",
    //       leave_from: "2020-07-29",
    //       leave_to: "2020-08-05",
    //       be_back_on: "2020-08-05",
    //       employee_signature: true,
    //       employee_signature_date: "2020-07-28",
    //       airport_transportation_departure_date: "2020-08-05",
    //       airport_transportation_arrival_date: "2020-08-05",
    //       airport_transportation_accommodation: "5 star hotel",
    //       airport_transportation_mobile_number: "321321",
    //       hr_manager_signature_and_date: "2020-08-05",
    //       coo_signature_and_date: "2020-08-05",
    //       ceo_signature_and_date: "2020-08-05",
    //       createdby: "system",
    //       createdat: "2020-08-05",
    //       updatedby: "system",
    //       updatedat: "2020-08-05"
    //     },
    //     status: "ACTIVE",
    //     createdBy: "system",
    //     createdAt: "2020-07-20",
    //     updatedBy: "system",
    //     updatedAt: "2020-07-28"
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     let newApplications = [...applications]
    //     newApplications.push(data)
    //     setApplications(newApplications)
    //   })
    //   .then(console.log(applications))
  }

  const handleImage = (e) => {
    // e.preventDefault();
    let file = e.target.files[0];
    // if (!file.name.match(/\.(jpg)$/)) {
    //   alert('Invalid File Type')
    //   return false;
    // } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // The file's text will be printed here
      let imgBase64 = e.target.result
      // .replace('data:image/jpeg;base64,', '')
      console.log(imgBase64)
      setImageInput(imgBase64)
      setImg64(imgBase64)

    };
    //  }
  }

  const handleConvertImage = () => {
    let reader = new FileReader();
    // reader.readAsDataURL(img64);
    reader.onload = function (e) {
      // The file's text will be printed here
      let imgBase64 = e.target.result
      // .replace('data:image/jpeg;base64,', '')
      console.log(imgBase64)
      setImg64(imgBase64)
    };
    reader.readAsArrayBuffer(img64)
  }
  return (
    <React.Fragment>
      <div className='d-flex'>
        <Sidebar />
        <div className='d-flex flex-column w-100'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>HOMEPAGE</h1>
              <button onClick={handleConvertImage}>Click Me!</button>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e)}
              />
              <img src={img64} alt="Red dot"  width="50px"/>
              <Col lg={4} md={6}>
                <Card className="mb-4">
                  <CardImg top width="20px" src={img64} alt="Red dot" />
                  <CardBody>
                    <h1 className="text-center">Image</h1>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={12}>

              </Col>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;