import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import WorkerPDF from '../components/PDForms/WorkerPDF';
import StaffPDF from '../components/PDForms/StaffPDF';
import Sidebar from '../Layout/Sidebar';
import Topbar from '../Layout/Topbar';



const Forms = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [name, setName] = useState(" ");
  const [department, setDepartment] = useState(" ");
  const [departureDate, setDepartureDate] = useState(" ");
  const [contactNum, setContactNum] = useState(" ")
  const [employeeNum, setEmployeeNum] = useState(" ");
  const [position, setPosition] = useState(" ");
  const [returnDate, setReturnDate] = useState(" ");

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
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Forms</h1>
            </div>
            <div className="row">
              <div className="col-sm-6 col-lg-6">
                <div>
                  <PDFDownloadLink document={<WorkerPDF />} fileName="workerleave.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <h4>Worker Leave</h4>)}
                  </PDFDownloadLink>
                </div>
                <PDFViewer width="500px" height="850px">
                  <WorkerPDF
                    name={name}
                    department={department}
                    departureDate={departureDate}
                    employeeNum={employeeNum}
                    position={position}
                    returnDate={returnDate}
                    contactNum={contactNum}
                  />
                </PDFViewer>
              </div>
              <div className="col-sm-6 col-lg-6">
                <div>
                  <PDFDownloadLink document={<StaffPDF />} fileName="staffleave.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <h4>Staff Leave</h4>)}
                  </PDFDownloadLink>
                </div>
                <PDFViewer width="500px" height="850px">
                  <StaffPDF
                    name={name}
                    department={department}
                    departureDate={departureDate}
                    employeeNum={employeeNum}
                    position={position}
                    returnDate={returnDate}
                    contactNum={contactNum}
                  />
                </PDFViewer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Forms;