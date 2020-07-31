import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import moment from 'moment';
import LeavesTable from './LeavesTable';
import LeaveForm from './LeaveForm';
import Swal from 'sweetalert2'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const Leaves = () => {
  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [employees, setEmployees] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [contact, setContact] = useState("")
  const [leaveType, setLeaveType] = useState("")
  const [itemsIssued, setItemsIssued] = useState("")
  const [specify, setSpecify] = useState("")
  const [passport, setPassport] = useState(false)
  const [ticket, setTicket] = useState(false)
  const [settlement, setSettlement] = useState(false)
  const [recievedOthers, setRecievedOthers] = useState(false)
  const [specifyRecievedOthers, setSpecifyRecievedOthers] = useState("")
  const [leaveFrom, setLeaveFrom] = useState("")
  const [leaveTo, setLeaveTo] = useState("")
  const [backOn, setBackOn] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState([
    {
      employee_type: ""
    }
  ])

  useEffect(() => {
    // Applications
    fetch('http://localhost:3000/application')
      .then(res => res.json())
      .then(data => {
        if(data) {
          setLeaves(data)
          setIsLoading(false)
        }
      })

    // Employees
    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setEmployees(data)
        }
      })
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetch('http://localhost:3000/application')
      .then(res => res.json())
      .then(data => {
        if(data) {
          setLeaves(data)
          setIsLoading(false)
        }
      })

    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setIsLoading(false)
          setEmployees(data)
        }
      })
  }

  const handleRefresh = () => {
    setShowForm(false)
    setIsLoading(false)
    setSelectedEmployee([{
      employee_type: ""
    }])
    setDepartureDate("")
    setReturnDate("")
    setContact("")
    setLeaveType("")
    setItemsIssued("")
    setSpecify("")
    setPassport(false)
    setTicket(false)
    setSettlement(false)
    setRecievedOthers(false)
    setSpecifyRecievedOthers("")
    setLeaveFrom("")
    setLeaveTo()
    setBackOn("")
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleEmployeeSelect = (e) => {
    let selected = employees.filter(employee => {
      return employee.id == e.target.value
    })
    setSelectedEmployee(selected)
  }

  const handleDepartureDate = (e) => {
    setDepartureDate(e.target.value)
  }
  const handleReturnDate = (e) => {
    setReturnDate(e.target.value)
  }
  const handleContactChange = (e) => {
    setContact(e.target.value)
  }
  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value)
  }
  const handleItemsIssuedChange = (e) => {
    setItemsIssued(e.target.value)
  }
  const handleSpecifyChange = (e) => {
    setSpecify(e.target.value)
  }
  const handlePassport = (e) => {
    setPassport(e.target.checked)
  }
  const handleTicket = (e) => {
    setTicket(e.target.checked)
  }
  const handleSettlement = (e) => {
    setSettlement(e.target.checked)
  }
  const handleRecievedOthers = (e) => {
    setRecievedOthers(e.target.checked)
  }
  const handleSpecifyRecievedOthers = (e) => {
    setSpecifyRecievedOthers(e.target.value)
  }
  const handleLeaveFrom = (e) => {
    setLeaveFrom(e.target.value)
  }
  const handleLeaveTo = (e) => {
    setLeaveTo(e.target.value)
  }
  const handleBackOn = (e) => {
    setBackOn(e.target.value)
  }

  const handleSubmitWorker = () => {
    fetch('http://localhost:3000/application', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        application_form_code: "LEAVE_WORKER",
        employee_id: selectedEmployee[0].id,
        application_data: {
          name: `${selectedEmployee[0].fname} ${selectedEmployee[0].lname}`,
          employee_code: selectedEmployee[0].code,
          project: selectedEmployee[0].cost_allocation_site,
          position: selectedEmployee[0].cost_allocation_actual_job_title,
          departure_date: departureDate,
          return_date: returnDate,
          leave_type: leaveType,
          contact_number: contact,
          items_issued_type: itemsIssued,
          items_issued_others_remarks: specify,
          signature_and_date: moment(new Date).format("MM-DD-YYYY"),
          immediate_supervisor_signature_and_date: "",
          accounting_department_signature_and_date: "",
          receive_passport: passport,
          receive_ticket: ticket,
          receive_settlement: settlement,
          receive_others: recievedOthers,
          receive_others_remarks: specifyRecievedOthers,
          leave_from: leaveFrom,
          leave_to: leaveTo,
          be_back_on: backOn,
          employee_signature: selectedEmployee[0].signature,
          employee_signature_date: moment(new Date()).format("MM-DD-YYYY"),
          hr_manager_signature_and_date: "",
          createdby: sessionStorage.user,
          createdat: moment(new Date()).format("MM-DD-YYYY"),
          updatedby: sessionStorage.user,
          updatedat: moment(new Date()).format("MM-DD-YYYY")
        },
        status: "ACTIVE",
        createdBy: sessionStorage.user,
        createdAt: moment(new Date()).format("MM-DD-YYYY"),
        updatedBy: sessionStorage.user,
        updatedAt: moment(new Date()).format("MM-DD-YYYY")
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.error){
          alert(data.error)
        }else {
          let newLeaves = [...leaves]
          newLeaves.push(data)
          setLeaves(newLeaves)
          handleRefresh()
        }
      })
  }

  return (
    <React.Fragment>
      <div className='d-flex'>
        <Sidebar />
        <div className='d-flex flex-column w-100'>
          <Topbar />
          <div className='content'>
            <div className="row">
              <div className="col-4 offset-8 text-right">
                <LeaveForm
                  employees={employees}
                  showForm={showForm}
                  handleShowForm={handleShowForm}
                  selectedEmployee={selectedEmployee}
                  handleEmployeeSelect={handleEmployeeSelect}
                  handleDepartureDate={handleDepartureDate}
                  handleReturnDate={handleReturnDate}
                  handleContactChange={handleContactChange}
                  handleLeaveTypeChange={handleLeaveTypeChange}
                  handleItemsIssuedChange={handleItemsIssuedChange}
                  handleSpecifyChange={handleSpecifyChange}
                  handlePassport={handlePassport}
                  handleTicket={handleTicket}
                  handleSettlement={handleSettlement}
                  handleSpecifyRecievedOthers={handleSpecifyRecievedOthers}
                  handleLeaveFrom={handleLeaveFrom}
                  handleLeaveTo={handleLeaveTo}
                  handleBackOn={handleBackOn}
                  handleSubmitWorker={handleSubmitWorker}
                  handleRecievedOthers={handleRecievedOthers}
                  handleRefresh={handleRefresh}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Leaves</h1>
            </div>
            <div className='col-lg-10 justify-content-start mb-3 ml-5'>
              <LeavesTable
                leaves={leaves}
                handleShowForm={handleShowForm}
                handleEmployeeSelect={handleEmployeeSelect}
                isLoading={isLoading}
                refetch={refetch}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Leaves;