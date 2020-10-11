import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import { CredsContext } from '../../context/Context';
import ResignationTable from './ResignationTable';
import { Card, CardBody } from 'reactstrap';
import Swal from 'sweetalert2';
import moment from 'moment';
import ResignationForm from './ResignationForm';

const Resignation = React.memo(() => {

  const { empCode, accessLevel, name, isLoggedIn, employees, username } = useContext(CredsContext)
  const [isReady, setIsReady] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [resignations, setResignations ] = useState([])
  const [searchField, setSearchField ] = useState("")
  const [hideListEmployees, setHideListEmployees] = useState(true)
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [effectiveResignationDate, setEffectiveResignationDate] = useState("")
  const [resignationReasonL1, setResignationReasonL1] = useState("")
  const [resignationReasonL2, setResignationReasonL2] = useState("")
  const [resignationReasonL3, setResignationReasonL3] = useState("")
  const [resignationReasonL4, setResignationReasonL4] = useState("")
  const [resignationReasons, setResignationReasons] = useState("")
  const [selectedResignation, setSelectedResignation] = useState({})
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [hraManager, setHraManager] = useState({})

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }

    refetch()
    
  }, [])

  const refetch = () => {
    setIsLoading(true)
    //Applications
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
              if(indivData.application_form_code === "RESIGNATION")
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
            setResignations([...pending, ...review, ...processing, ...denied, ...approved])
            setIsLoading(false)
          }
        })
        
    // Approvers Data
    fetch('http://localhost:3000/applicationform')
      .then(res => res.json())
      .then(data => {
        let approverCode = data[0].data.approvers
        let ceo = []
        let coo = []
        let hraManager = [] 
        fetch('http://localhost:3000/employee')
          .then(res => res.json())
          .then(data => {
            data.map(indivData => {
              if(indivData.code === approverCode.ceo){
                return ceo.push(indivData)
              } 
              if(indivData.code === approverCode.coo){
                return coo.push(indivData)
              }
              if(indivData.code === approverCode.hra_manager){
                return hraManager.push(indivData)
              }
            })
          })
          .then(() => {
            setCeo(ceo[0])
            setCoo(coo[0])
            setHraManager(hraManager[0])
          })
      })
        

    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleRefresh = () => {
    setShowForm(false)
    setSearchField("")
    setSelectedEmployee([])
    setHideListEmployees(true)
    setIsLoading(false)
    refetch()
    setIsEdit(false)
    setEffectiveResignationDate("")
    setResignationReasonL1("")
    setResignationReasonL2("")
    setResignationReasonL3("")
    setResignationReasonL4("")
  }

  const handleEdit = (resignation) => {
    let data = resignation.application_data
    let selectedEmployeeInput = employees.filter(employee => {
      return employee.code === data.employee_code
    })
    setIsEdit(true)
    setShowForm(true)
    setSelectedEmployee(selectedEmployeeInput)
    setSelectedResignation(resignation)
    setEffectiveResignationDate(data.effective_resignation_date)
    setResignationReasonL1(data.reason_for_resignationL1)
    setResignationReasonL2(data.reason_for_resignationL2)
    setResignationReasonL3(data.reason_for_resignationL3)
    setResignationReasonL4(data.reason_for_resignationL4)
    setResignationReasons(
      `${data.reason_for_resignationL1} ${data.reason_for_resignationL2} ${data.reason_for_resignationL3} ${data.reason_for_resignationL4}`
    )
  }

  const filteredEmployees = employees.filter(employee => {
    return employee.fullname.toLowerCase().includes(searchField.toLowerCase());
  })

  const handleFilterEmployee = (e) => {
    setSearchField(e.target.value)
  }

  const handleHideListEmployees = () => {
    setHideListEmployees(false)
  }

  const handleEmployeeSelect = (e) => {
    if (e.target.value === "") {
      return setSelectedEmployee(e.target.value)
    }
    let selected = employees.filter(employee => {
      return employee.id === parseInt(e.target.value)
    })
    let selectedEmployeeInput = document.getElementById("selectedEmployee")
    selectedEmployeeInput.value = selected[0].fullname
    setSelectedEmployee(selected)
    setHideListEmployees(true)
    setSearchField("")
  }

  const selectEmployeeForResignation = filteredEmployees.map((employee, i) => {
    if((employee.signature !== "" && employee.signature !== null) && (employee.project_manager !== "" && employee.project_manager !== null && employee.immediate_superior !== "" && employee.immediate_superior !== null
      && employee.employment_status !== "RESIGNED"
    )){
      if (accessLevel === 1 || accessLevel === 3 || empCode === employee.code) {
        return (
          <option key={i} value={employee.id} onClick={handleEmployeeSelect}>{employee.fullname}</option>
        )
      }
    }
  })

  const handleEffectiveResignationDate = (e) => {
    setEffectiveResignationDate(e.target.value)
  }

  const handleResignationReasonL1 = (e) => {
    setResignationReasonL1(e.target.value)
  }

  const handleResignationReasonL2 = (e) => {
    setResignationReasonL2(e.target.value)
  }

  const handleResignationReasonL3 = (e) => {
    setResignationReasonL3(e.target.value)
  }

  const handleResignationReasonL4 = (e) => {
    setResignationReasonL4(e.target.value)
  }

  const handleResignationReasonChange = (e) => {
    let supervisorNotes = e.target.value.split(/[\s]+/)
    let trimmedResignationReasonL1 = []
    let trimmedResignationReasonL2 = []
    let trimmedResignationReasonL3 = []
    let trimmedResignationReasonL4 = []
    supervisorNotes.map(word => {
      if(trimmedResignationReasonL1.length <=17) {
        return trimmedResignationReasonL1.push(word)
      } else if(trimmedResignationReasonL2.length <=17) {
        return trimmedResignationReasonL2.push(word)
      } else if(trimmedResignationReasonL3.length <=17) {
        return trimmedResignationReasonL3.push(word)
      } else {
        return trimmedResignationReasonL4.push(word)
      }
    })
    setResignationReasonL1(trimmedResignationReasonL1.join(" "))
    setResignationReasonL2(trimmedResignationReasonL2.join(" "))
    setResignationReasonL3(trimmedResignationReasonL3.join(" "))
    setResignationReasonL4(trimmedResignationReasonL4.join(" "))
  }

  const handleSubmit = () => {
    setIsLoading(true)
    if(effectiveResignationDate === "" || resignationReasonL1 === "") {
      setIsLoading(false)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input all required fields!',
      })
    }

    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if(isEdit) {
      fetch(`http://localhost:3000/application?id=${selectedResignation.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedResignation.application_form_code,
            employee_code: selectedResignation.employee_code,
            application_data: {
              employee_table_id: selectedResignation.application_data.employee_table_id,
              name: selectedResignation.application_data.name,
              employee_code: selectedResignation.application_data.employee_code,
              department: selectedResignation.application_data.department,
              position: selectedResignation.application_data.position,
              joining_date: selectedResignation.application_data.joining_date,
              effective_resignation_date: effectiveResignationDate,
              reason_for_resignationL1: resignationReasonL1,
              reason_for_resignationL2: resignationReasonL2,
              reason_for_resignationL3: resignationReasonL3,
              reason_for_resignationL4: resignationReasonL4,
              employee_signature: selectedResignation.application_data.employee_signature,
              employee_signature_date: selectedResignation.application_data.employee_signature_date,
              supervisor_commentL1: selectedResignation.application_data.supervisor_commentL1,
              supervisor_commentL2: selectedResignation.application_data.supervisor_commentL2,
              supervisor_commentL3: selectedResignation.application_data.supervisor_commentL3,
              immediate_supervisor: selectedResignation.application_data.immediate_supervisor,
              immidiate_supervisor_manager_signature: selectedResignation.application_data.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedResignation.application_data.immidiate_supervisor_sign_date,
              project_manager_commentL1: selectedResignation.application_data.project_manager_commentL1,
              project_manager_commentL2: selectedResignation.application_data.project_manager_commentL2,
              project_manager_commentL3: selectedResignation.application_data.project_manager_commentL3,
              project_manager: selectedResignation.application_data.project_manager,
              project_manager_signature: selectedResignation.application_data.project_manager_signature,
              project_manager_sign_date: selectedResignation.application_data.project_manager_sign_date,
              hr_manager_signature: selectedResignation.application_data.hr_manager_signature,
              hr_manager_sign_date: selectedResignation.application_data.hr_manager_sign_date,
              hr_manager_commentL1: selectedResignation.application_data.hr_manager_commentL1,
              hr_manager_commentL2: selectedResignation.application_data.hr_manager_commentL2,
              coo_signature: selectedResignation.application_data.coo_signature,
              coo_sign_date: selectedResignation.application_data.coo_sign_date,
              ceo_signature: selectedResignation.application_data.ceo_signature,
              ceo_sign_date: selectedResignation.application_data.ceo_sign_date,
              createdby: selectedResignation.application_data.createdby,
              createdat: selectedResignation.application_data.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedResignation.status,
            createdBy: selectedResignation.createdBy,
            createdAt: selectedResignation.createdAt,
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
              Swal.fire(
                'Success!',
                'Leave Application has been updated successfully!',
                'success'
              )
              handleRefresh()
            }
          })
    } else {
      fetch('http://localhost:3000/application', {
          method: 'post',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: "RESIGNATION",
            employee_code: selectedEmployee[0].code,
            application_data: {
              employee_table_id: selectedEmployee[0].id,
              name: selectedEmployee[0].fullname,
              employee_code: selectedEmployee[0].code,
              department: selectedEmployee[0].cost_allocation_site,
              position: selectedEmployee[0].cost_allocation_actual_job_title,
              joining_date: selectedEmployee[0].joining_date,
              effective_resignation_date: effectiveResignationDate,
              reason_for_resignationL1: resignationReasonL1,
              reason_for_resignationL2: resignationReasonL2,
              reason_for_resignationL3: resignationReasonL3,
              reason_for_resignationL4: resignationReasonL4,
              employee_signature: selectedEmployee[0].signature,
              employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
              supervisor_commentL1: "",
              supervisor_commentL2: "",
              supervisor_commentL3: "",
              immediate_supervisor: selectedEmployee[0].immediate_superior,
              immidiate_supervisor_manager_signature: "",
              immidiate_supervisor_sign_date: "",
              project_manager_commentL1: "",
              project_manager_commentL2: "",
              project_manager_commentL3: "",
              project_manager: selectedEmployee[0].project_manager,
              project_manager_signature: "",
              project_manager_sign_date: "",
              hr_manager_signature: "",
              hr_manager_sign_date: "",
              hr_manager_commentL1: "",
              hr_manager_commentL2: "",
              coo_signature: "",
              coo_sign_date: "",
              ceo_signature: "",
              ceo_sign_date: "",
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
              let newResignations = [...resignations]
              newResignations.push(data)
              setResignations(newResignations)
              Swal.fire(
                'Success!',
                'Leave Application has been filed successfully!',
                'success'
              )
              handleRefresh()
            }
          })
    }
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div className="col-4 offset-8 text-right">
          <ResignationForm 
            showForm={showForm}
            handleShowForm={handleShowForm}
            isEdit={isEdit}
            handleRefresh={handleRefresh}
            employees={employees}
            handleFilterEmployee={handleFilterEmployee}
            handleHideListEmployees={handleHideListEmployees}
            hideListEmployees={hideListEmployees}
            selectEmployeeForResignation={selectEmployeeForResignation}
            selectedEmployee={selectedEmployee}
            handleEffectiveResignationDate={handleEffectiveResignationDate}
            handleResignationReasonL1={handleResignationReasonL1}
            handleResignationReasonL2={handleResignationReasonL2}
            handleResignationReasonL3={handleResignationReasonL3}
            handleResignationReasonL4={handleResignationReasonL4}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            effectiveResignationDate={effectiveResignationDate}
            resignationReasonL1={resignationReasonL1}
            resignationReasonL2={resignationReasonL2}
            resignationReasonL3={resignationReasonL3}
            resignationReasonL4={resignationReasonL4}
            selectedResignation={selectedResignation}
            isReady={isReady}
            handleResignationReasonChange={handleResignationReasonChange}
            resignationReasons={resignationReasons}
          />
        </div>
      </div>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Resignation</h1>
            </div>
            <div className='col-lg-12 justify-content-center'>
              <Card>
                <CardBody>
                  <ResignationTable 
                    handleShowForm={handleShowForm}
                    data={resignations}
                    refetch={refetch}
                    handleEdit={handleEdit}
                    ceo={ceo}
                    coo={coo}
                    hraManager={hraManager}
                    accessLevel={accessLevel}
                    isLoading={isLoading}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
})

export default Resignation;