/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import { Card, CardBody } from 'reactstrap';
import { CredsContext } from '../../context/Context';
import ChangeProfessionTable from '../ChangeProfession/ChangeProfessionTable';
import ChangeProfessionForm from './ChangeProfessionForm';
import moment from 'moment';
import Swal from 'sweetalert2';
import { config } from '../../config/config';

const ChangeProfession = React.memo(() => {

  const { empCode, accessLevel, name, isLoggedIn, employees, username } = useContext(CredsContext)
  const [changeProfessions, setChangeProfessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [searchField, setSearchField] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [hideListEmployees, setHideListEmployees] = useState(true)
  const [newDesignation, setNewDesignation] = useState("")
  const [selectedChangeProfessionRequest, setSelectedChangeProfessionrequest] = useState({})
  const [designation, setDesignation] = useState("")
  const [employeeCode, setEmployeeCode] = useState("")
  const [department, setDepartment] = useState("")
  const [nationality, setNationality] = useState("")
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [hraManager, setHraManager] = useState({})

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.replace('#/login')
    }

    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = () => {
    setIsLoading(true)
    fetch(`${config.baseURL}/application`)
      .then(res => res.json())
      .then(data => {
        if(data) {
          let approved = []
          let denied = []
          let review = []
          let pending = []
          let processing = []
          data.map(indivData => {
            if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.employee_code) {
              if(indivData.application_form_code === "CHANGE_PROFESSION")
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
            setChangeProfessions([...pending, ...review, ...processing, ...denied, ...approved])
            setIsLoading(false)
        }
      })

      // Approvers Data
    fetch(`${config.baseURL}/applicationform`)
    .then(res => res.json())
    .then(data => {
      let approverCode = data[0].data.approvers
      let ceo = []
      let coo = []
      let hraManager = [] 
      fetch(`${config.baseURL}/employee`)
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
    setIsEdit(false)
    fetchData()
  }

  const handleEdit = (changeProfessionRequest) => {
    setShowForm(true)
    setIsEdit(true)
    setSelectedChangeProfessionrequest(changeProfessionRequest)
  }

  const filteredEmployees = employees.filter(employee => {
    return employee.fullname.toLowerCase().includes(searchField.toLocaleLowerCase())
  })

  const handleFilterEmployee = (e) => {
    setSearchField(e.target.value)
  }

  const handleHideListEmployees = () => {
    setHideListEmployees(!hideListEmployees)
  }

  const handleEmployeeSelect = (e) => {
    if(e.target.value === "") {
      return setSelectedEmployee(e.target.value)
    }
    
    let selected = employees.filter(employee => {
      return employee.id === parseInt(e.target.value)
    })
    let selectedEmployeeInput = document.getElementById("selectedEmployee")
    selectedEmployeeInput.value = selected[0].fullname
    setSelectedEmployee(selected)
    setDesignation(selected[0].cost_allocation_actual_job_title)
    setEmployeeCode(selected[0].code)
    setDepartment(selected[0].cost_allocation_site)
    setNationality(selected[0].nationality)
    setSearchField("")
    setHideListEmployees(true)
  }

  const selectEmployeeForChangeProfession = filteredEmployees.map((employee, i) => {
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

  const handleNewDesinationChange = (e) => {
    setNewDesignation(e.target.value)
  }

  const handleSubmit = () => {
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if(isEdit) {
      fetch(`${config.baseURL}/application?id=${selectedChangeProfessionRequest.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedChangeProfessionRequest.application_form_code,
            employee_code: selectedChangeProfessionRequest.employee_code,
            application_data: {
              employee_table_id: selectedChangeProfessionRequest.application_data.employee_table_id,
              name: selectedChangeProfessionRequest.application_data.name,
              employee_code: selectedChangeProfessionRequest.application_data.employee_code,
              department: selectedChangeProfessionRequest.application_data.department,
              designation: selectedChangeProfessionRequest.application_data.designation,
              joining_date: selectedChangeProfessionRequest.application_data.joining_date,
              employee_signature: selectedChangeProfessionRequest.application_data.employee_signature,
              nationality: selectedChangeProfessionRequest.application_data.nationality,
              employee_signature_date: selectedChangeProfessionRequest.application_data.employee_signature_date,
              new_designation: newDesignation,
              basic: selectedChangeProfessionRequest.application_data.basic,
              general_allowance: selectedChangeProfessionRequest.application_data.general_allowance,
              housing_allowance: selectedChangeProfessionRequest.application_data.housing_allowance,
              profession_on_joining: selectedChangeProfessionRequest.application_data.designation,
              transportation_allowance: selectedChangeProfessionRequest.application_data.transportation_allowance,
              tel_allowance: selectedChangeProfessionRequest.application_data.tel_allowance,
              food_allowance: selectedChangeProfessionRequest.application_data.food_allowance,
              new_basic: selectedChangeProfessionRequest.application_data.new_basic,
              new_general_allowance: selectedChangeProfessionRequest.application_data.new_general_allowance,
              new_housing_allowance: selectedChangeProfessionRequest.application_data.new_housing_allowance,
              new_transportation_allowance: selectedChangeProfessionRequest.application_data.new_transportation_allowance,
              new_tel_allowance: selectedChangeProfessionRequest.application_data.new_tel_allowance,
              new_food_allowance: selectedChangeProfessionRequest.application_data.new_food_allowance,
              effective_date: selectedChangeProfessionRequest.application_data.effective_date,
              supervisor_notesL1: selectedChangeProfessionRequest.application_data.supervisor_notesL1,
              supervisor_notesL2: selectedChangeProfessionRequest.application_data.supervisor_notesL2,
              supervisor_notesL3: selectedChangeProfessionRequest.application_data.supervisor_notesL3,
              supervisor_notesL4: selectedChangeProfessionRequest.application_data.supervisor_notesL4,
              supervisor_notesL5: selectedChangeProfessionRequest.application_data.supervisor_notesL5,
              supervisor_notesL6: selectedChangeProfessionRequest.application_data.supervisor_notesL6,
              supervisor_notesL7: selectedChangeProfessionRequest.application_data.supervisor_notesL7,
              supervisor_notesL8: selectedChangeProfessionRequest.application_data.supervisor_notesL8,
              supervisor_notesL9: selectedChangeProfessionRequest.application_data.supervisor_notesL9,
              immediate_supervisor: selectedChangeProfessionRequest.application_data.immediate_supervisor,
              immidiate_supervisor_manager_signature: selectedChangeProfessionRequest.application_data.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedChangeProfessionRequest.application_data.immidiate_supervisor_sign_date,
              project_manager_notesL1: selectedChangeProfessionRequest.application_data.project_manager_notesL1,
              project_manager_notesL2: selectedChangeProfessionRequest.application_data.project_manager_notesL2,
              project_manager_notesL3: selectedChangeProfessionRequest.application_data.project_manager_notesL3,
              project_manager_notesL4: selectedChangeProfessionRequest.application_data.project_manager_notesL4,
              project_manager_notesL5: selectedChangeProfessionRequest.application_data.project_manager_notesL5,
              project_manager_notesL6: selectedChangeProfessionRequest.application_data.project_manager_notesL6,
              project_manager_notesL7: selectedChangeProfessionRequest.application_data.project_manager_notesL7,
              project_manager_notesL8: selectedChangeProfessionRequest.application_data.project_manager_notesL8,
              project_manager_notesL9: selectedChangeProfessionRequest.application_data.project_manager_notesL9,
              project_manager: selectedChangeProfessionRequest.application_data.project_manager,
              project_manager_signature: selectedChangeProfessionRequest.application_data.project_manager_signature,
              project_manager_sign_date: selectedChangeProfessionRequest.application_data.project_manager_sign_date,
              hr_manager_signature: selectedChangeProfessionRequest.application_data.hr_manager_signature,
              hr_manager_sign_date: selectedChangeProfessionRequest.application_data.hr_manager_sign_date,
              hr_manager_notes: selectedChangeProfessionRequest.application_data.hr_manager_notes,
              coo_signature: selectedChangeProfessionRequest.application_data.coo_signature,
              coo_notes: selectedChangeProfessionRequest.application_data.coo_notes,
              coo_sign_date: selectedChangeProfessionRequest.application_data.coo_sign_date,
              ceo_signature: selectedChangeProfessionRequest.application_data.ceo_signature,
              ceo_notes: selectedChangeProfessionRequest.application_data.ceo_notes,
              ceo_sign_date: selectedChangeProfessionRequest.application_data.ceo_sign_date,
              createdby: selectedChangeProfessionRequest.application_data.createdby,
              createdat: selectedChangeProfessionRequest.application_data.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedChangeProfessionRequest.status,
            createdBy: selectedChangeProfessionRequest.createdBy,
            createdAt: selectedChangeProfessionRequest.createdAt,
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
              let newChangeProfessions = [...changeProfessions]
              newChangeProfessions.push(data)
              setChangeProfessions(newChangeProfessions)
              Swal.fire(
                'Success!',
                'Change Profession Request has been updated successfully!',
                'success'
              )
              handleRefresh()
            }
          })
    } else {
      fetch(`${config.baseURL}/application`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: "CHANGE_PROFESSION",
            employee_code: selectedEmployee[0].code,
            application_data: {
              employee_table_id: selectedEmployee[0].id,
              name: selectedEmployee[0].fullname,
              employee_code: selectedEmployee[0].code,
              department: selectedEmployee[0].cost_allocation_site,
              designation: selectedEmployee[0].cost_allocation_actual_job_title,
              joining_date: selectedEmployee[0].joining_date,
              employee_signature: selectedEmployee[0].signature,
              nationality: selectedEmployee[0].nationality,
              employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
              new_designation: newDesignation,
              basic: selectedEmployee[0].basic,
              general_allowance: selectedEmployee[0].general_allowance,
              housing_allowance: selectedEmployee[0].housing_allowance,
              profession_on_joining: selectedEmployee[0].designation,
              transportation_allowance: selectedEmployee[0].transportation_allowance,
              tel_allowance: selectedEmployee[0].tel_allow,
              food_allowance: selectedEmployee[0].food_allowance,
              new_basic: "",
              new_general_allowance: "",
              new_housing_allowance: "",
              new_transportation_allowance: "",
              new_tel_allowance: "",
              new_food_allowance: "",
              effective_date: "",
              supervisor_notesL1: "",
              supervisor_notesL2: "",
              supervisor_notesL3: "",
              supervisor_notesL4: "",
              supervisor_notesL5: "",
              supervisor_notesL6: "",
              supervisor_notesL7: "",
              supervisor_notesL8: "",
              supervisor_notesL9: "",
              immediate_supervisor: selectedEmployee[0].immediate_superior,
              immidiate_supervisor_manager_signature: "",
              immidiate_supervisor_sign_date: "",
              project_manager_notesL1: "",
              project_manager_notesL2: "",
              project_manager_notesL3: "",
              project_manager_notesL4: "",
              project_manager_notesL5: "",
              project_manager_notesL6: "",
              project_manager_notesL7: "",
              project_manager_notesL8: "",
              project_manager_notesL9: "",
              project_manager: selectedEmployee[0].project_manager,
              project_manager_signature: "",
              project_manager_sign_date: "",
              hr_manager_signature: "",
              hr_manager_sign_date: "",
              hr_manager_notes: "",
              coo_signature: "",
              coo_notes: "",
              coo_sign_date: "",
              ceo_signature: "",
              ceo_notes: "",
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
              let newChangeProfessions = [...changeProfessions]
              newChangeProfessions.push(data)
              setChangeProfessions(newChangeProfessions)
              Swal.fire(
                'Success!',
                'Change Profession Request has been filed successfully!',
                'success'
              )
              handleRefresh()
            }
          })
    }
  }
  
  return(
    <React.Fragment>
      <div className='row'>
        <div className="col-4 offset-8 text-right">
          <ChangeProfessionForm 
            showForm={showForm}
            handleShowForm={handleShowForm}
            handleRefresh={handleRefresh}
            isEdit={isEdit}
            handleFilterEmployee={handleFilterEmployee}
            searchField={searchField}
            selectEmployeeForChangeProfession={selectEmployeeForChangeProfession}
            hideListEmployees={hideListEmployees}
            handleHideListEmployees={handleHideListEmployees}
            handleSubmit={handleSubmit}
            handleNewDesinationChange={handleNewDesinationChange}
            selectedChangeProfessionRequest={selectedChangeProfessionRequest}
            selectedEmployee={selectedEmployee}
            designation={designation}
            employeeCode={employeeCode}
            department={department}
            nationality={nationality}
          />
        </div>
      </div>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='container'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Change Profession</h1>
            </div>
            <div className='col-lg-12 justify-content-center'>
              <Card>
                <CardBody>
                  <ChangeProfessionTable 
                    data={changeProfessions}
                    handleShowForm={handleShowForm}
                    handleEdit={handleEdit}
                    refetch={fetchData}
                    accessLevel={accessLevel}
                    ceo={ceo}
                    coo={coo}
                    hraManager={hraManager}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
})

export default ChangeProfession;