/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from "react";
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import { Card, CardBody } from 'reactstrap';
import StaffRequisitionTable from "./StaffRequisitionTable";
import StaffRequisitionForm from "./StaffRequisitionForm";
import { CredsContext } from "../../context/Context";
import moment from 'moment';
import Swal from 'sweetalert2';
import { config } from '../../config/config';

const StaffRequisition = () => {
  const { empCode, accessLevel, employees, name, username } = useContext(CredsContext)

  const [staffRequisitions, setStaffRequisitions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hideRequesterList, setHideRequesterList] = useState(true)
  const [department, setDepartment] = useState("")
  const [dateRequest, setDateRequest] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [typeOfRequest, setTypeOfRequest] = useState("")
  const [requestReasonsL1, setRequestReasonsL1] = useState("")
  const [requestReasonsL2, setRequestReasonsL2] = useState("")
  const [requestReasonsL3, setRequestReasonsL3] = useState("")
  const [resourceAvailability, setResourceAvailability] = useState("")
  const [searchField, setSearchField] = useState("")
  const [hideProjSvsrList, setHideProjSvsrList] = useState(true)
  const [selectedProjSvsr, setSelectedProjSvrsr] = useState({})
  const [selectedRequester, setSelectedRequester] = useState({})
  const [selectedStaffRequisition, setSelectedStaffRequisition] = useState({})
  const [requestReasons, setRequestReasons] = useState("")
  const [projectManager, setProjectManager] = useState({})

  useEffect(() => {
    setIsLoading(true)
    fetch(`${config.baseURL}/application`)
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
              if(indivData.application_form_code === "STAFF_REQUISITION"){
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
    setIsEdit(false)
  }

  const handleEdit = (staffRequisition) => {
    let data = staffRequisition.application_data
    setIsEdit(true)
    setSelectedStaffRequisition(staffRequisition)
    setShowForm(true)
    setRequestReasons(`${data.request_reasonL1} ${data.request_reasonL2} ${data.request_reasonL3} `)
    setRequestReasonsL1(data.request_reasonL1)
    setRequestReasonsL2(data.request_reasonL2)
    setRequestReasonsL3(data.request_reasonL3)
    employees.map(indivEmpoyee => {
      if(indivEmpoyee.code === data.project_manager){
        setProjectManager(indivEmpoyee)
      }
    })
  }

  const handleHideRequesterList = () => {
    setHideRequesterList(!hideRequesterList)
  }

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value)
  }

  const handleDateRequestChange = (e) => {
    setDateRequest(e.target.value)
  }

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value)
  }

  const handleTypeOfRequestChange = (e) => {
    setTypeOfRequest(e.target.value)
  }

  const handleResourceAvailable = (e) => {
    setResourceAvailability(e.target.value)
  }

  const handleRequestReasonsChange = (e) => {
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
    setRequestReasonsL1(trimmedReasonsL1.join(" "))
    setRequestReasonsL2(trimmedReasonsL2.join(" "))
    setRequestReasonsL3(trimmedReasonsL3.join(" "))
  }

  const handleFilterEmployee = (e) => {
    setSearchField(e.target.value)
  }

  const handleFilterRequester = (e) => {
    setSearchField(e.target.value)
  }

  const filteredEmployees = employees.filter(employee => {
    return employee.fullname.toLowerCase().includes(searchField.toLowerCase());
  })

  const handleEmployeeSelect = (e) => {
    if (e.target.value === "") {
      return setSelectedProjSvrsr(e.target.value)
    }
    let selected = employees.filter(employee => {
      return employee.id == e.target.value
    })
    let selectedEmployeeInput = document.getElementById("selecdEmployee")
    selectedEmployeeInput.value = selected[0].fullname
    setSelectedProjSvrsr(selected[0])
    setHideProjSvsrList(true)
    setSearchField("")
  }

  const selectProjSupvsr = filteredEmployees.map((employee, i) => {
    if((employee.signature !== "" && employee.signature !== null) && (employee.project_manager !== "" && employee.project_manager !== null && employee.immediate_superior !== "" && employee.immediate_superior !== null
      && employee.employment_status !== "RESIGNED"
    )){
      if (accessLevel === 1 || accessLevel === 3 || empCode === employee.code) {
        return (
          <option key={i} value={employee.id} 
          onClick={handleEmployeeSelect}
          >{employee.fullname}</option>
        )
      }
    }
  })

  const handleRequesterSelect = (e) => {
    if (e.target.value === "") {
      return setSelectedRequester(e.target.value)
    }
    let selected = employees.filter(employee => {
      return employee.id == e.target.value
    })
    let selectedEmployeeInput = document.getElementById("selectedRequester")
    selectedEmployeeInput.value = selected[0].fullname
    setSelectedRequester(selected[0])
    setHideRequesterList(true)
    setSearchField("")
  }

  const selectRequester = filteredEmployees.map((employee, i) => {
    if((employee.signature !== "" && employee.signature !== null) && (employee.project_manager !== "" && employee.project_manager !== null && employee.immediate_superior !== "" && employee.immediate_superior !== null
      && employee.employment_status !== "RESIGNED"
    )){
      if (accessLevel === 1 || accessLevel === 3 || empCode === employee.code) {
        return (
          <option key={i} value={employee.id} 
          onClick={handleRequesterSelect}
          >{employee.fullname}</option>
        )
      }
    }
  })


  const handleHideProjSvsrList = () => {
    setHideProjSvsrList(!hideProjSvsrList)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    if(department === "" || jobTitle === "" || typeOfRequest === "" || requestReasonsL1 === "" || 
      resourceAvailability === "" || selectedProjSvsr === "" || selectedRequester === ""
    ) {
      setIsLoading(false)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input all required fields!',
      })
    }

    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if(isEdit) {
      fetch(`${config.baseURL}/application?id=${selectedStaffRequisition.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: "STAFF_REQUISITION",
            employee_code: selectedRequester.code,
            application_data: {
              requestor_table_id: selectedRequester.id,
              employee_code: selectedRequester.code,
              department: department,
              request_date: moment(new Date()).format("MM/DD/YYYY"),
              job_title: jobTitle,
              request_type: typeOfRequest,
              request_reasonL1: requestReasonsL1,
              request_reasonL2: requestReasonsL2,
              request_reasonL3: requestReasonsL3,
              name: selectedRequester.fullname,
              employee_signature: selectedRequester.signature,
              employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
              resource_availability: resourceAvailability,
              immediate_supervisor: selectedRequester.immediate_superior,
              requestor_supervisor_signature: "",
              requestor_supervisor_signature_date: "",
              requestor_supervisor_noteL1: "",
              requestor_supervisor_noteL2: "",
              requestor_supervisor_noteL3: "",
              requestor_supervisor_noteL4: "",
              project_manager: selectedProjSvsr.code,
              nominated_supervisor_projectmanager_signature: "",
              nominated_supervisor_projectmanager_signature_date: "",
              nominated_supervisor_projectmanager_remarksL1: "",
              nominated_supervisor_projectmanager_remarksL2: "",
              hr_manager_signature: "",
              hr_manager_commentL1: "",
              hr_manager_commentL2: "",
              createdby: selectedStaffRequisition.createdby,
              createdat: selectedStaffRequisition.createdAt,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: "PENDING",
            createdBy: name,
            createdAt: moment(new Date()).format("MM/DD/YYYY"),
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.error}`,
              })
              setIsLoading(false)
            } else {
              let newStaffRequisition = [...staffRequisitions]
              newStaffRequisition.push(data)
              setStaffRequisitions(newStaffRequisition)
              Swal.fire(
                'Success!',
                'Leave Application has been filed successfully!',
                'success'
              )
            }
            handleRefresh()
          })
    }
    fetch(`${config.baseURL}/application`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: "STAFF_REQUISITION",
            employee_code: selectedRequester.code,
            application_data: {
              requestor_table_id: selectedRequester.id,
              employee_code: selectedRequester.code,
              department: department,
              request_date: moment(new Date()).format("MM/DD/YYYY"),
              job_title: jobTitle,
              request_type: typeOfRequest,
              request_reasonL1: requestReasonsL1,
              request_reasonL2: requestReasonsL2,
              request_reasonL3: requestReasonsL3,
              name: selectedRequester.fullname,
              employee_signature: selectedRequester.signature,
              employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
              resource_availability: resourceAvailability,
              immediate_supervisor: selectedRequester.immediate_superior,
              requestor_supervisor_signature: "",
              requestor_supervisor_signature_date: "",
              requestor_supervisor_noteL1: "",
              requestor_supervisor_noteL2: "",
              requestor_supervisor_noteL3: "",
              requestor_supervisor_noteL4: "",
              project_manager: selectedProjSvsr.code,
              nominated_supervisor_projectmanager_signature: "",
              nominated_supervisor_projectmanager_signature_date: "",
              nominated_supervisor_projectmanager_remarksL1: "",
              nominated_supervisor_projectmanager_remarksL2: "",
              hr_manager_signature: "",
              hr_manager_commentL1: "",
              hr_manager_commentL2: "",
              createdby: name,
              createdat: moment(new Date()).format("MM/DD/YYYY"),
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: "PENDING",
            createdBy: name,
            createdAt: moment(new Date()).format("MM/DD/YYYY"),
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.error}`,
              })
              setIsLoading(false)
            } else {
              let newStaffRequisition = [...staffRequisitions]
              newStaffRequisition.push(data)
              setStaffRequisitions(newStaffRequisition)
              Swal.fire(
                'Success!',
                'Leave Application has been filed successfully!',
                'success'
              )
            }
            handleRefresh()
          })
  }

  return(
    <React.Fragment>
      <div className='row'>
        <div>
          <StaffRequisitionForm 
            showForm={showForm}
            employees={employees}
            handleRefresh={handleRefresh}
            handleShowForm={handleShowForm}    
            handleRequestReasonsChange={handleRequestReasonsChange}
            handleSubmit={handleSubmit}
            handleFilterEmployee={handleFilterEmployee}
            selectProjSupvsr={selectProjSupvsr}
            hideProjSvsrList={hideProjSvsrList}
            handleHideProjSvsrList={handleHideProjSvsrList}
            handleDepartmentChange={handleDepartmentChange}
            handleDateRequestChange={handleDateRequestChange}
            handleJobTitleChange={handleJobTitleChange}
            handleTypeOfRequestChange={handleTypeOfRequestChange}
            handleResourceAvailable={handleResourceAvailable}
            hideRequesterList={hideRequesterList}
            handleHideRequesterList={handleHideRequesterList}
            handleFilterRequester={handleFilterRequester}
            selectRequester={selectRequester}
            isEdit={isEdit}
            selectedStaffRequisition={selectedStaffRequisition}
            requestReasons={requestReasons}
            projectManager={projectManager}
            searchField={searchField}
          />
        </div>
      </div>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          {/* <div className='content'> */}
          <div className="px-5">
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Staff Requisition</h1>
            </div>
            <div className='col-lg-12 justify-content-center'>
              <Card>
                <CardBody>
                  <StaffRequisitionTable 
                    handleShowForm={handleShowForm}
                    data={staffRequisitions}
                    handleEdit={handleEdit}
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