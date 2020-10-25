/* eslint-disable array-callback-return */
import React, {useState, useEffect, useContext} from 'react';
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import { Card, CardBody } from 'reactstrap';
import { CredsContext } from '../../context/Context';
import moment from 'moment';
import Swal from 'sweetalert2'
import IncrementRequestTable from './IncrementRequestTable';
import IncrementRequestForm from './IncrementRequestForm';
import { config } from '../../config/config';

const IncrementRequest = () => {
  const { empCode, accessLevel, name, isLoggedIn, employees, username } = useContext(CredsContext)
  const [isLoading, setIsLoading] = useState(true)
  const [incrementRequests, setIncrementRequests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [hraManager, setHraManager] = useState({})
  const [searchField, setSearchField] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [designation, setDesignation] = useState("")
  const [employeeCode, setEmployeeCode] = useState("")
  const [department, setDepartment] = useState("")
  const [nationality, setNationality] = useState("")
  const [hideListEmployees, setHideListEmployees] = useState(true)
  const [grade, setGrade] = useState(0)
  const [date, setDate] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [selectedIncrementRequest, setSelectedIncrementRequest] = useState({})
  const [projectManager, setProjectManager] = useState([])
  const [immediateSupervisor, setImmediateSupervisor] = useState([])

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
              if(indivData.application_form_code === "INCREMENT_REQUEST")
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
            setIncrementRequests([...pending, ...review, ...processing, ...denied, ...approved])
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
    setDate(moment(new Date()).format("YYYY-MM-DD"))
  }

  const handleRefresh = () => {
    setShowForm(false)
    fetchData()
    setSearchField("")
    setSelectedEmployee([])
    setHideListEmployees(true)
    setIsLoading(false)
    setIsEdit(false)
  }

  const handleEdit = (incrementRequest) => {
    setShowForm(true)
    setIsEdit(true)
    setSelectedIncrementRequest(incrementRequest)
    setGrade(incrementRequest.application_data.grade)
    setDate(incrementRequest.application_data.date)
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

    employees.map(employee => {
      if(employee.code === selected[0].project_manager) {
        setProjectManager(employee)
      }
      if(employee.code === selected[0].immediate_superior) {
        setImmediateSupervisor(employee)
      }
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

  const selectEmployeeForIncrementRequest = filteredEmployees.map((employee, i) => {
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

  const handleGradeChange = e => {
    setGrade(parseFloat(e.target.value))
  }

  const handleDateChange = e => {
    setDate(e.target.value)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    if (selectedEmployee.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure to select Employee!",
      });
    }
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if(isEdit) {
      fetch(`${config.baseURL}/application?id=${selectedIncrementRequest.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
      body: JSON.stringify({
        application_form_code: selectedIncrementRequest.application_form_code,
        employee_code: selectedIncrementRequest.employee_code,
        application_data: {
          employee_table_id: selectedIncrementRequest.application_data.employee_table_id,
          name: selectedIncrementRequest.application_data.name,
          employee_code: selectedIncrementRequest.application_data.employee_code,
          department: selectedIncrementRequest.application_data.department,
          designation: selectedIncrementRequest.application_data.designation,
          joining_date: selectedIncrementRequest.application_data.joining_date,
          employee_signature: selectedIncrementRequest.application_data.employee_signature,
          nationality: selectedIncrementRequest.application_data.nationality,
          employee_signature_date: selectedIncrementRequest.application_data.employee_signature_date,
          date_of_last_increment: selectedIncrementRequest.application_data.date_of_last_increment,
          basic: selectedIncrementRequest.application_data.basic,
          general_allowance: selectedIncrementRequest.application_data.general_allowance,
          housing_allowance: selectedIncrementRequest.application_data.housing_allowance,
          transportation_allowance: selectedIncrementRequest.application_data.transportation_allowance,
          tel_allowance: selectedIncrementRequest.application_data.tel_allowance,
          food_allowance: selectedIncrementRequest.application_data.food_allowance,
          date: date,
          grade: grade,
          new_basic: selectedIncrementRequest.application_data.new_basic,
          new_general_allowance: selectedIncrementRequest.application_data.new_general_allowance,
          new_housing_allowance: selectedIncrementRequest.application_data.new_housing_allowance,
          new_transportation_allowance: selectedIncrementRequest.application_data.new_transportation_allowance,
          new_tel_allowance: selectedIncrementRequest.application_data.new_tel_allowance,
          new_food_allowance: selectedIncrementRequest.application_data.new_food_allowance,
          effective_date: selectedIncrementRequest.application_data.effective_date,
          supervisor_notesL1: selectedIncrementRequest.application_data.supervisor_notesL1,
          supervisor_notesL2: selectedIncrementRequest.application_data.supervisor_notesL2,
          supervisor_notesL3: selectedIncrementRequest.application_data.supervisor_notesL3,
          supervisor_notesL4: selectedIncrementRequest.application_data.supervisor_notesL4,
          supervisor_notesL5: selectedIncrementRequest.application_data.supervisor_notesL5,
          immediate_supervisor: selectedIncrementRequest.application_data.immediate_supervisor,
          immediate_supervisor_name: selectedIncrementRequest.application_data.immediate_supervisor_name,
          immidiate_supervisor_manager_signature: selectedIncrementRequest.application_data.immidiate_supervisor_manager_signature,
          immidiate_supervisor_sign_date: selectedIncrementRequest.application_data.immidiate_supervisor_sign_date,
          project_manager_notesL1: selectedIncrementRequest.application_data.project_manager_notesL1,
          project_manager_notesL2: selectedIncrementRequest.application_data.project_manager_notesL2,
          project_manager_notesL3: selectedIncrementRequest.application_data.project_manager_notesL3,
          project_manager_notesL4: selectedIncrementRequest.application_data.project_manager_notesL4,
          project_manager_notesL5: selectedIncrementRequest.application_data.project_manager_notesL5,
          project_manager: selectedIncrementRequest.application_data.project_manager,
          project_manager_name: selectedIncrementRequest.application_data.project_manager_name,
          project_manager_signature: selectedIncrementRequest.application_data.project_manager_signature,
          project_manager_sign_date: selectedIncrementRequest.application_data.project_manager_sign_date,
          hr_manager_signature: selectedIncrementRequest.application_data.hr_manager_signature,
          hr_manager_sign_date: selectedIncrementRequest.application_data.hr_manager_sign_date,
          hr_manager_notes: selectedIncrementRequest.application_data.hr_manager_notes,
          hr_manager_approved: selectedIncrementRequest.application_data.hr_manager_approved,
          coo_approved: selectedIncrementRequest.application_data.coo_approved,
          ceo_approved: selectedIncrementRequest.application_data.ceo_approved,
          coo_signature: selectedIncrementRequest.application_data.coo_signature,
          coo_notes: selectedIncrementRequest.application_data.coo_notes,
          coo_sign_date: selectedIncrementRequest.application_data.coo_sign_date,
          ceo_signature: selectedIncrementRequest.application_data.ceo_signature,
          ceo_notes: selectedIncrementRequest.application_data.ceo_notes,
          ceo_sign_date: selectedIncrementRequest.application_data.ceo_sign_date,
          createdby: selectedIncrementRequest.application_data.createdby,
          createdat: selectedIncrementRequest.application_data.createdat,
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
          let newIncrementRequest = [...incrementRequests]
          newIncrementRequest.push(data)
          setIncrementRequests(newIncrementRequest)
          Swal.fire(
            'Success!',
            'Increment Request has been updated successfully!',
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
          application_form_code: "INCREMENT_REQUEST",
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
            date_of_last_increment: "",
            basic: selectedEmployee[0].basic,
            general_allowance: selectedEmployee[0].general_allowance,
            housing_allowance: selectedEmployee[0].housing_allowance,
            transportation_allowance: selectedEmployee[0].transportation_allowance,
            tel_allowance: selectedEmployee[0].tel_allow,
            food_allowance: selectedEmployee[0].food_allowance,
            date: date,
            grade: grade,
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
            immediate_supervisor: selectedEmployee[0].immediate_superior,
            immediate_supervisor_name: immediateSupervisor.fullname,
            immidiate_supervisor_manager_signature: "",
            immidiate_supervisor_sign_date: "",
            project_manager_notesL1: "",
            project_manager_notesL2: "",
            project_manager_notesL3: "",
            project_manager_notesL4: "",
            project_manager_notesL5: "",
            project_manager: selectedEmployee[0].project_manager,
            project_manager_name: projectManager.fullname,
            project_manager_signature: "",
            project_manager_sign_date: "",
            hr_manager_signature: "",
            hr_manager_sign_date: "",
            hr_manager_notes: "",
            hr_manager_approved: "",
            coo_approved: "",
            ceo_approved: "",
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
            let newIncrementRequest = [...incrementRequests]
            newIncrementRequest.push(data)
            setIncrementRequests(newIncrementRequest)
            Swal.fire(
              'Success!',
              'Increment Request has been filed successfully!',
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
          <IncrementRequestForm 
            showForm={showForm}
            handleShowForm={handleShowForm}
            isEdit={isEdit}
            ceo={ceo}
            coo={coo}
            hraManager={hraManager}
            handleFilterEmployee={handleFilterEmployee}
            selectEmployeeForIncrementRequest={selectEmployeeForIncrementRequest}
            hideListEmployees={hideListEmployees}
            handleHideListEmployees={handleHideListEmployees}
            selectedEmployee={selectedEmployee}
            designation={designation}
            employeeCode={employeeCode}
            department={department}
            nationality={nationality}
            handleGradeChange={handleGradeChange}
            handleDateChange={handleDateChange}
            handleSubmit={handleSubmit}
            handleRefresh={handleRefresh}
            selectedIncrementRequest={selectedIncrementRequest}
          />
        </div>
      </div>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='container'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Increment Request</h1>
            </div>
            <div className='col-lg-12 justify-content-center'>
              <Card>
                <CardBody>
                  <IncrementRequestTable 
                    data={incrementRequests}
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
}

export default IncrementRequest;