import React, { useState, useEffect, useContext } from "react";
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import { Card, CardBody } from 'reactstrap';
import StaffRequisitionTable from "./StaffRequisitionTable";
import StaffRequisitionForm from "./StaffRequisitionForm";
import { CredsContext } from "../../context/Context";

const StaffRequisition = () => {
  const { empCode, accessLevel, name, isLoggedIn, username } = useContext(CredsContext)

  const [staffRequisitions, setStaffRequisitions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [requestReasons, setRequestReasons] = useState("")
  const [requestReasonsL1, setRequestReasonsL1] = useState("")
  const [requestReasonsL2, setRequestReasonsL2] = useState("")
  const [requestReasonsL3, setRequestReasonsL3] = useState("")

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3000/application')
      .then(res => res.json())
      .then(data => {

        if (data) {
          let approved = []
          let denied = []
          let review = []
          let pending = []
          let processing = []
          data.map(indivData => {
            if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.employee_code) {
              if(indivData.application_form_code === "STAFF_REQUISITION")
                if (indivData.status === "APPROVED") {
                  approved.push(indivData)
                } else if (indivData.status === "DENIED") {
                  denied.push(indivData)
                } else if (indivData.status === "REVIEW") {
                  review.push(indivData)
                } else if (indivData.status === "PENDING") {
                  pending.push(indivData)
                } else if (indivData.status === "PROCESSING") {
                  processing.push(indivData)
                }
              }
            })
            setStaffRequisitions([...pending, ...review, ...processing, ...denied, ...approved])
            setIsLoading(false)
          }
        })
  }, [])

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleRefresh = () => {
    setShowForm(false)
  }

  const handleRequestReasonsChange = (e) => {
    setRequestReasons(e.target.value)
    let trimmedReasons = e.target.value.split(/[\s]+/)
    let trimmedReasonsL1 = []
    let trimmedReasonsL2 = []
    let trimmedReasonsL3 = []
    trimmedReasons.map(word => {
      if(trimmedReasonsL1.length <=17){
        return trimmedReasonsL1.push(word)
      } else if(trimmedReasonsL2.length <= 17){
        return trimmedReasonsL2.push(word)
      } else {
        return trimmedReasonsL3.push(word)
      }
    })
    setRequestReasonsL1(trimmedReasonsL1)
    setRequestReasonsL2(trimmedReasonsL2)
    setRequestReasonsL3(trimmedReasonsL3)
  }

  const handleSubmit = () => {
    console.log(requestReasons)
    console.log(requestReasonsL1)
    console.log(requestReasonsL2)
    console.log(requestReasonsL3)
  }

  return(
    <React.Fragment>
      <div className='row'>
        <div>
          <StaffRequisitionForm 
            showForm={showForm}
            handleRefresh={handleRefresh}
            handleShowForm={handleShowForm}    
            handleRequestReasonsChange={handleRequestReasonsChange}
            handleSubmit={handleSubmit}     
          />
        </div>
      </div>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Staff Requisition</h1>
            </div>
            <div className='col-lg-12 justify-content-center'>
              <Card>
                <CardBody>
                  <StaffRequisitionTable 
                    handleShowForm={handleShowForm}
                    data={staffRequisitions}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
};


export default StaffRequisition;