/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../../Layout/Sidebar'
import Topbar from '../../../Layout/Topbar'
import { Card, CardTitle, CardSubtitle, Row, Col, CardBody } from 'reactstrap';
import { CredsContext } from '../../../context/Context'
import IncrementRequestApprovalTable from './IncrementRequestApprovalTable';
import IncrementRequestApprovalForm from './IncrementRequestApprovalForm';
import moment from 'moment';
import Swal from 'sweetalert2';
import { config } from '../../../config/config'

const IncrementRequestApproval = React.memo(() => {
  const { empCode, accessLevel, name, isLoggedIn, username } = useContext(CredsContext)
  const [approvals, setApprovals] = useState([])
  const [forApproval, setForApproval] = useState([])
  const [approved, setApproved] = useState(0)
  const [denied, setDenied] = useState(0)
  const [review, setReview] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [hraManager, setHraManager] = useState({})
  const [applications, setApplications] = useState([])
  const [employees, setEmployees] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState({})
  const [selectedApplication, setSelectedApplication] = useState([])
  const [selectedApplicationData, setSelectedApplicationData] = useState([])
  const [immediateSupervisor, setImmediateSupervisor] = useState({})
  const [projectManager, setProjectManager] = useState({})
  const [isReady, setIsReady] = useState(false)
  const [hideSupervisorNotes, setHideSupervisorNotes] = useState(true)
  const [supervisorNotesL1, setSupervisorNotesL1] = useState("")
  const [supervisorNotesL2, setSupervisorNotesL2] = useState("")
  const [supervisorNotesL3, setSupervisorNotesL3] = useState("")
  const [supervisorNotesL4, setSupervisorNotesL4] = useState("")
  const [supervisorNotesL5, setSupervisorNotesL5] = useState("")
  const [supervisorNotes, setSupervisorNotes] = useState("")
  const [hideProjectManagerNotes, setHideProjectManagerNotes] = useState(true)
  const [projectManagerNotes, setProjectManagerNotes] = useState("")
  const [projectManagerNotesL1, setProjectManagerNotesL1] = useState("")
  const [projectManagerNotesL2, setProjectManagerNotesL2] = useState("")
  const [projectManagerNotesL3, setProjectManagerNotesL3] = useState("")
  const [projectManagerNotesL4, setProjectManagerNotesL4] = useState("")
  const [projectManagerNotesL5, setProjectManagerNotesL5] = useState("")
  const [hideManagementDesicion, setHideManagementDesicion] = useState(true)
  const [newBasic, setNewBasic] = useState(0)
  const [newTransportation, setNewTransportation] = useState(0)
  const [newGeneralAllowance, setNewGeneralAllowance] = useState(0)
  const [newTelephoneAllowance, setNewTelephoneAllowance] = useState(0)
  const [newHousingAllowance, setNewHousingAllowance] = useState(0)
  const [newFoodAllowance, setNewFoodAllowance] = useState(0)
  const [newSalaryEffectiveDate, setNewSalaryEffectiveDate] = useState("")
  const [hrNotes, setHRNotes] = useState("")
  const [dateOfLastIncrement, setDateOfLastIncrement] = useState("")
  const [hideCEONotes, setHideCEONotes] = useState(true)
  const [ceoNotes, setCEONotes] = useState("")
  const [hideCOONotes, setHideCOONotes] = useState(true)
  const [cooNotes, setCOONotes] = useState("")

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }
    if (accessLevel === 4) {
      window.location.replace('#/leaves')
    }

    fetchData()
  }, [])

  const fetchData = () => {
    fetch(`${config.baseURL}/approvals`)
      .then(res => res.json())
      .then(data => {
        let allData = []
        let approved = []
        let denied = []
        let review = []
        let pending = []
        data.map(indivData => {
          if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.approver_id) {
            if (indivData.application_type === "INCREMENT_REQUEST") {
              allData.push(indivData)
              if (indivData.status === "APPROVED") {
                approved.push(indivData)
              } else if (indivData.status === "DENIED") {
                denied.push(indivData)
              } else if (indivData.status === "REVIEW") {
                review.push(indivData)
              } else if (indivData.status === "PENDING") {
                pending.push(indivData)
              }
            }
          }
        })
        // setApprovals(allData)
        setApprovals([...pending, ...review, ...denied, ...approved])
        setForApproval(pending.length)
        setApproved(approved.length)
        setDenied(denied.length)
        setReview(review.length)
        setIsLoading(false)
      })

    fetch(`${config.baseURL}/application`)
      .then(res => res.json())
      .then(data => {
        let allData = []
        data.map(indivData => {
          allData.push(indivData)
        })
        setApplications(allData)
      })

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
            data.map(inidvData => {
              if (inidvData.code === approverCode.ceo) {
                ceo.push(inidvData)
              }
              if (inidvData.code === approverCode.coo) {
                coo.push(inidvData)
              }
              if (inidvData.code === approverCode.hra_manager) {
                hraManager.push(inidvData)
              }
            })
            setEmployees(data)
          })
          .then(() => {
            setCeo(ceo[0])
            setCoo(coo[0])
            setHraManager(hraManager[0])
          })
      })

  }

  const handleRefresh = () => {
    setShowForm(false)
    setIsReady(false)
  }

  const handleShowForm = (data) => {
    setSelectedApproval(data)
    let projectManID = ""
    let immediateSupID = ""
    applications.map(indivApplication => {
      if(indivApplication.collateid === data.collateid) {
        setSelectedApplication(indivApplication)
        setSelectedApplicationData(indivApplication.application_data)
        projectManID = indivApplication.application_data.project_manager
        immediateSupID = indivApplication.application_data.immediate_supervisor
      }
    })
    employees.map(indivEmpoyee => {
      if (indivEmpoyee.code === immediateSupID) {
        setImmediateSupervisor(indivEmpoyee)
      }
      if (indivEmpoyee.code === projectManID) {
        setProjectManager(indivEmpoyee)
      }
    })
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
    setShowForm(!showForm)
  }

  const handleShowSupervisorNotes = () => {
    setHideSupervisorNotes(!hideSupervisorNotes)
    setHideProjectManagerNotes(true)
    setHideManagementDesicion(true)  
    setHideCOONotes(true)
    setHideCEONotes(true)
  }

  const handleSupervisorNotesChange = (e) => {
    let supervisorNotes = e.target.value.split(/[\s]+/)
    let trimmedSupervisorNotesL1 = []
    let trimmedSupervisorNotesL2 = []
    let trimmedSupervisorNotesL3 = []
    let trimmedSupervisorNotesL4 = []
    let trimmedSupervisorNotesL5 = []
    supervisorNotes.map(word => {
      if(trimmedSupervisorNotesL1.length <=6) {
        return trimmedSupervisorNotesL1.push(word)
      } else if(trimmedSupervisorNotesL2.length <=6) {
        return trimmedSupervisorNotesL2.push(word)
      } else if(trimmedSupervisorNotesL3.length <=6) {
        return trimmedSupervisorNotesL3.push(word)
      } else if(trimmedSupervisorNotesL4.length <=6) {
        return trimmedSupervisorNotesL4.push(word)
      } else {
        return trimmedSupervisorNotesL5.push(word)
      }
    })
    setSupervisorNotesL1(trimmedSupervisorNotesL1.join(" "))
    setSupervisorNotesL2(trimmedSupervisorNotesL2.join(" "))
    setSupervisorNotesL3(trimmedSupervisorNotesL3.join(" "))
    setSupervisorNotesL4(trimmedSupervisorNotesL4.join(" "))
    setSupervisorNotesL5(trimmedSupervisorNotesL5.join(" "))
  }

  const handleEditSupervisorNotes = () => {
    setIsEdit(true)
    setSupervisorNotes(
      `${selectedApplicationData.supervisor_notesL1} ${selectedApplicationData.supervisor_notesL2} ${selectedApplicationData.supervisor_notesL3} ${selectedApplicationData.supervisor_notesL4} ${selectedApplicationData.supervisor_notesL5}`
    )
    setSupervisorNotesL1(selectedApplicationData.supervisor_notesL1)
    setSupervisorNotesL2(selectedApplicationData.supervisor_notesL2)
    setSupervisorNotesL3(selectedApplicationData.supervisor_notesL3)
    setSupervisorNotesL4(selectedApplicationData.supervisor_notesL4)
    setSupervisorNotesL5(selectedApplicationData.supervisor_notesL5)
    setHideSupervisorNotes(!hideSupervisorNotes)
    setHideProjectManagerNotes(true)
    setHideManagementDesicion(true)    
    setHideCOONotes(true)
    setHideCEONotes(true)
  }

  
  const handleShowProjectManagerNotes = () => {
    setHideProjectManagerNotes(!hideProjectManagerNotes)
    setHideSupervisorNotes(true)
    setHideManagementDesicion(true)    
    setHideCOONotes(true)
    setHideCEONotes(true)
  }
  
  const handleEditProjectManagerNotes = () => {
    setIsEdit(true)
    setProjectManagerNotes(
      `${selectedApplicationData.project_manager_notesL1} ${selectedApplicationData.project_manager_notesL2} ${selectedApplicationData.project_manager_notesL3} ${selectedApplicationData.project_manager_notesL4} ${selectedApplicationData.project_manager_notesL5}`
    )
    setProjectManagerNotesL1(selectedApplicationData.project_manager_notesL1)
    setProjectManagerNotesL2(selectedApplicationData.project_manager_notesL2)
    setProjectManagerNotesL3(selectedApplicationData.project_manager_notesL3)
    setProjectManagerNotesL4(selectedApplicationData.project_manager_notesL4)
    setProjectManagerNotesL5(selectedApplicationData.project_manager_notesL5)
    setHideProjectManagerNotes(!hideProjectManagerNotes)
    setHideSupervisorNotes(true)
    setHideManagementDesicion(true)    
    setHideCOONotes(true)
    setHideCEONotes(true)
  }

  const handleProjectManagerNotesChange = e => {
    let projectManagerNotes = e.target.value.split(/[\s]+/)
    let trimmedProjectManagerNotesL1 = []
    let trimmedProjectManagerNotesL2 = []
    let trimmedProjectManagerNotesL3 = []
    let trimmedProjectManagerNotesL4 = []
    let trimmedProjectManagerNotesL5 = []
    projectManagerNotes.map(word => {
      if(trimmedProjectManagerNotesL1.length <=6) {
        return trimmedProjectManagerNotesL1.push(word)
      } else if(trimmedProjectManagerNotesL2.length <=6) {
        return trimmedProjectManagerNotesL2.push(word)
      } else if(trimmedProjectManagerNotesL3.length <=6) {
        return trimmedProjectManagerNotesL3.push(word)
      } else if(trimmedProjectManagerNotesL4.length <=6) {
        return trimmedProjectManagerNotesL4.push(word)
      } else {
        return trimmedProjectManagerNotesL5.push(word)
      }
    })
    setProjectManagerNotesL1(trimmedProjectManagerNotesL1.join(" "))
    setProjectManagerNotesL2(trimmedProjectManagerNotesL2.join(" "))
    setProjectManagerNotesL3(trimmedProjectManagerNotesL3.join(" "))
    setProjectManagerNotesL4(trimmedProjectManagerNotesL4.join(" "))
    setProjectManagerNotesL5(trimmedProjectManagerNotesL5.join(" "))
  }

  const handleNewBasicChange = e => {
    setNewBasic(parseInt(e.target.value, 10))
  }
  const handleNewTransportationChange = e => {
    setNewTransportation(parseInt(e.target.value, 10))
  }
  const handleNewGeneralAllowanceChange = e => {
    setNewGeneralAllowance(parseInt(e.target.value, 10))
  }
  const handleNewTelephoneAllowanceChange = e => {
    setNewTelephoneAllowance(parseInt(e.target.value, 10))
  }
  const handleNewHousingAllowance = e => {
    setNewHousingAllowance(parseInt(e.target.value, 10))
  }
  const handleNewFoodAllowanceChange = e => {
    setNewFoodAllowance(parseInt(e.target.value, 10))
  }

  const handleHRNotesChange = e => {
    setHRNotes(e.target.value)
  }

  const handleNewSalaryEffectivedateChange = e => {
    setNewSalaryEffectiveDate(e.target.value)
  }

  const handleDateOfLastIncrementChange = e => {
    setDateOfLastIncrement(e.target.value)
  }

  const handleShowManagementDesicion = () => {
    setNewBasic(selectedApplicationData.basic)
    setNewTransportation(selectedApplicationData.transportation_allowance)
    setNewGeneralAllowance(selectedApplicationData.general_allowance)
    setNewTelephoneAllowance(selectedApplicationData.tel_allowance)
    setNewHousingAllowance(selectedApplicationData.housing_allowance)
    setNewFoodAllowance(selectedApplicationData.food_allowance)
    setHideManagementDesicion(!hideManagementDesicion)
    setHideProjectManagerNotes(true)
    setHideSupervisorNotes(true)
  }
  
  const handleEditManagementDesicion = () => {
    setIsEdit(true)
    setNewBasic(selectedApplicationData.new_basic)
    setNewTransportation(selectedApplicationData.new_transportation_allowance)
    setNewGeneralAllowance(selectedApplicationData.new_general_allowance)
    setNewTelephoneAllowance(selectedApplicationData.new_tel_allowance)
    setNewHousingAllowance(selectedApplicationData.new_housing_allowance)
    setNewFoodAllowance(selectedApplicationData.new_food_allowance)
    setHRNotes(selectedApplicationData.hr_manager_notes)
    setDateOfLastIncrement(selectedApplicationData.date_of_last_increment)
    setNewSalaryEffectiveDate(selectedApplicationData.effective_date)
    setHideManagementDesicion(!hideManagementDesicion)
    setHideProjectManagerNotes(true)
    setHideSupervisorNotes(true)
  }

  const handleShowCEONotes = () => {
    setHideCEONotes(!hideCEONotes)
    setHideCOONotes(true)
    setHideManagementDesicion(true)
    setHideProjectManagerNotes(true)
    setHideSupervisorNotes(true)
  }

  const handleCEONotesChange = e => {
    setCEONotes(e.target.value)
  }

  const handleEditCEONotes = () => {
    setIsEdit(true)
    setCEONotes(selectedApplicationData.ceo_notes)
    setHideCEONotes(!hideCEONotes)
    setHideManagementDesicion(true)
    setHideProjectManagerNotes(true)
    setHideSupervisorNotes(true)
    setHideCOONotes(true)
  }

  const handleShowCOONotes = () => {
    setHideCOONotes(!hideCOONotes)
    setHideCEONotes(true)
    setHideManagementDesicion(true)
    setHideProjectManagerNotes(true)
    setHideSupervisorNotes(true)
  }

  const handleEditCOONotes = () => {
    setIsEdit(true)
    setCOONotes(selectedApplicationData.coo_notes)
    setHideCOONotes(!hideCOONotes)
    setHideCEONotes(true)
    setHideManagementDesicion(true)
    setHideProjectManagerNotes(true)
    setHideSupervisorNotes(true)
  }

  const handleCOONotesChange = e => {
    setCOONotes(e.target.value)
  }

  const handleSaveCOONotes = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              employee_table_id: selectedApplicationData.employee_table_id,
              name: selectedApplicationData.name,
              employee_code: selectedApplicationData.employee_code,
              department: selectedApplicationData.department,
              designation: selectedApplicationData.designation,
              joining_date: selectedApplicationData.joining_date,
              employee_signature: selectedApplicationData.employee_signature,
              nationality: selectedApplicationData.nationality,
              employee_signature_date: selectedApplicationData.employee_signature_date,
              date_of_last_increment: selectedApplicationData.date_of_last_increment,
              new_designation: selectedApplicationData.new_designation,
              basic: selectedApplicationData.basic,
              general_allowance: selectedApplicationData.general_allowance,
              housing_allowance: selectedApplicationData.housing_allowance,
              profession_on_joining:selectedApplicationData.designation,
              transportation_allowance: selectedApplicationData.transportation_allowance,
              tel_allowance: selectedApplicationData.tel_allowance,
              food_allowance: selectedApplicationData.food_allowance,
              date: selectedApplicationData.date,
              grade: selectedApplicationData.grade,
              new_basic: selectedApplicationData.new_basic,
              new_general_allowance: selectedApplicationData.new_general_allowance,
              new_housing_allowance: selectedApplicationData.new_housing_allowance,
              new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
              new_tel_allowance: selectedApplicationData.new_tel_allowance,
              new_food_allowance: selectedApplicationData.new_food_allowance,
              effective_date: selectedApplicationData.effective_date,
              supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
              supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
              supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
              supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
              supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
              supervisor_notesL6: selectedApplicationData.supervisor_notesL6,
              supervisor_notesL7: selectedApplicationData.supervisor_notesL7,
              supervisor_notesL8: selectedApplicationData.supervisor_notesL8,
              supervisor_notesL9: selectedApplicationData.supervisor_notesL9,
              immediate_supervisor: selectedApplicationData.immediate_supervisor,
              immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
              project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
              project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
              project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
              project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
              project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
              project_manager_notesL6: selectedApplicationData.project_manager_notesL6,
              project_manager_notesL7: selectedApplicationData.project_manager_notesL7,
              project_manager_notesL8: selectedApplicationData.project_manager_notesL8,
              project_manager_notesL9: selectedApplicationData.project_manager_notesL9,
              project_manager: selectedApplicationData.project_manager,
              project_manager_signature: selectedApplicationData.project_manager_signature,
              project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
              immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
              project_manager_name: selectedApplicationData.project_manager_name,
              hr_manager_signature: selectedApplicationData.hr_manager_signature,
              hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
              hr_manager_notes: selectedApplicationData.hr_manager_notes,
              hr_manager_approved: selectedApplicationData.hr_manager_approved,
              coo_approved: selectedApplicationData.coo_approved,
              ceo_approved: selectedApplicationData.ceo_approved,
              coo_signature: selectedApplicationData.coo_signature,
              coo_notes: cooNotes,
              coo_sign_date: selectedApplicationData.coo_sign_date,
              ceo_signature: selectedApplicationData.ceo_signature,
              ceo_notes: selectedApplicationData.ceo_notes,
              ceo_sign_date: selectedApplicationData.ceo_sign_date,
              createdby: selectedApplicationData.createdby,
              createdat: selectedApplicationData.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedApplication.status,
            createdBy: selectedApplication.createdBy,
            createdAt: selectedApplication.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            handleShowSupervisorNotes()
            fetch(`${config.baseURL}/application`)
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.error}`,
                  })
                } else {
                  if(isEdit){
                    Swal.fire(
                      'Success!',
                      'Notes has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Notes has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerNotes(true)
                  setHideSupervisorNotes(true)
                  setHideManagementDesicion(true)
                  setHideCEONotes(true)
                  setHideCOONotes(true)
                }
                let allData = []
                data.map(indivData => {
                  allData.push(indivData)
                })
                setApplications(allData)
                allData.map(indivApplication => {
                  if (indivApplication.collateid === selectedApproval.collateid) {
                    setSelectedApplication(indivApplication)
                    setSelectedApplicationData(indivApplication.application_data)
                  }
                })
              })
              .then(() => {
                setIsReady(true)
              })
        
          })
  }

  const handleSaveCEONotes = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              employee_table_id: selectedApplicationData.employee_table_id,
              name: selectedApplicationData.name,
              employee_code: selectedApplicationData.employee_code,
              department: selectedApplicationData.department,
              designation: selectedApplicationData.designation,
              joining_date: selectedApplicationData.joining_date,
              employee_signature: selectedApplicationData.employee_signature,
              nationality: selectedApplicationData.nationality,
              employee_signature_date: selectedApplicationData.employee_signature_date,
              date_of_last_increment: selectedApplicationData.date_of_last_increment,
              new_designation: selectedApplicationData.new_designation,
              basic: selectedApplicationData.basic,
              general_allowance: selectedApplicationData.general_allowance,
              housing_allowance: selectedApplicationData.housing_allowance,
              profession_on_joining:selectedApplicationData.designation,
              transportation_allowance: selectedApplicationData.transportation_allowance,
              tel_allowance: selectedApplicationData.tel_allowance,
              food_allowance: selectedApplicationData.food_allowance,
              date: selectedApplicationData.date,
              grade: selectedApplicationData.grade,
              new_basic: selectedApplicationData.new_basic,
              new_general_allowance: selectedApplicationData.new_general_allowance,
              new_housing_allowance: selectedApplicationData.new_housing_allowance,
              new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
              new_tel_allowance: selectedApplicationData.new_tel_allowance,
              new_food_allowance: selectedApplicationData.new_food_allowance,
              effective_date: selectedApplicationData.effective_date,
              supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
              supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
              supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
              supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
              supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
              supervisor_notesL6: selectedApplicationData.supervisor_notesL6,
              supervisor_notesL7: selectedApplicationData.supervisor_notesL7,
              supervisor_notesL8: selectedApplicationData.supervisor_notesL8,
              supervisor_notesL9: selectedApplicationData.supervisor_notesL9,
              immediate_supervisor: selectedApplicationData.immediate_supervisor,
              immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
              project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
              project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
              project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
              project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
              project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
              project_manager_notesL6: selectedApplicationData.project_manager_notesL6,
              project_manager_notesL7: selectedApplicationData.project_manager_notesL7,
              project_manager_notesL8: selectedApplicationData.project_manager_notesL8,
              project_manager_notesL9: selectedApplicationData.project_manager_notesL9,
              project_manager: selectedApplicationData.project_manager,
              project_manager_signature: selectedApplicationData.project_manager_signature,
              project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
              immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
              project_manager_name: selectedApplicationData.project_manager_name,
              hr_manager_signature: selectedApplicationData.hr_manager_signature,
              hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
              hr_manager_notes: selectedApplicationData.hr_manager_notes,
              hr_manager_approved: selectedApplicationData.hr_manager_approved,
              coo_approved: selectedApplicationData.coo_approved,
              ceo_approved: selectedApplicationData.ceo_approved,
              coo_signature: selectedApplicationData.coo_signature,
              coo_notes: selectedApplicationData.coo_notes,
              coo_sign_date: selectedApplicationData.coo_sign_date,
              ceo_signature: selectedApplicationData.ceo_signature,
              ceo_notes: ceoNotes,
              ceo_sign_date: selectedApplicationData.ceo_sign_date,
              createdby: selectedApplicationData.createdby,
              createdat: selectedApplicationData.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedApplication.status,
            createdBy: selectedApplication.createdBy,
            createdAt: selectedApplication.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            handleShowSupervisorNotes()
            fetch(`${config.baseURL}/application`)
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.error}`,
                  })
                } else {
                  if(isEdit){
                    Swal.fire(
                      'Success!',
                      'Notes has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Notes has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerNotes(true)
                  setHideSupervisorNotes(true)
                  setHideManagementDesicion(true)
                  setHideCEONotes(true)
                  setHideCOONotes(true)
                }
                let allData = []
                data.map(indivData => {
                  allData.push(indivData)
                })
                setApplications(allData)
                allData.map(indivApplication => {
                  if (indivApplication.collateid === selectedApproval.collateid) {
                    setSelectedApplication(indivApplication)
                    setSelectedApplicationData(indivApplication.application_data)
                  }
                })
              })
              .then(() => {
                setIsReady(true)
              })
        
          })
  }

  const handleSaveMangementDesicion = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              employee_table_id: selectedApplicationData.employee_table_id,
              name: selectedApplicationData.name,
              employee_code: selectedApplicationData.employee_code,
              department: selectedApplicationData.department,
              designation: selectedApplicationData.designation,
              joining_date: selectedApplicationData.joining_date,
              employee_signature: selectedApplicationData.employee_signature,
              nationality: selectedApplicationData.nationality,
              employee_signature_date: selectedApplicationData.employee_signature_date,
              date_of_last_increment: dateOfLastIncrement,
              new_designation: selectedApplicationData.new_designation,
              basic: selectedApplicationData.basic,
              general_allowance: selectedApplicationData.general_allowance,
              housing_allowance: selectedApplicationData.housing_allowance,
              profession_on_joining:selectedApplicationData.designation,
              transportation_allowance: selectedApplicationData.transportation_allowance,
              tel_allowance: selectedApplicationData.tel_allowance,
              food_allowance: selectedApplicationData.food_allowance,
              date: selectedApplicationData.date,
              grade: selectedApplicationData.grade,
              new_basic: newBasic,
              new_general_allowance: newGeneralAllowance,
              new_housing_allowance: newHousingAllowance,
              new_transportation_allowance: newTransportation,
              new_tel_allowance: newTelephoneAllowance,
              new_food_allowance: newFoodAllowance,
              effective_date: newSalaryEffectiveDate,
              supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
              supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
              supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
              supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
              supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
              supervisor_notesL6: selectedApplicationData.supervisor_notesL6,
              supervisor_notesL7: selectedApplicationData.supervisor_notesL7,
              supervisor_notesL8: selectedApplicationData.supervisor_notesL8,
              supervisor_notesL9: selectedApplicationData.supervisor_notesL9,
              immediate_supervisor: selectedApplicationData.immediate_supervisor,
              immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
              project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
              project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
              project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
              project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
              project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
              project_manager_notesL6: selectedApplicationData.project_manager_notesL6,
              project_manager_notesL7: selectedApplicationData.project_manager_notesL7,
              project_manager_notesL8: selectedApplicationData.project_manager_notesL8,
              project_manager_notesL9: selectedApplicationData.project_manager_notesL9,
              project_manager: selectedApplicationData.project_manager,
              project_manager_signature: selectedApplicationData.project_manager_signature,
              project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
              immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
              project_manager_name: selectedApplicationData.project_manager_name,
              hr_manager_signature: selectedApplicationData.hr_manager_signature,
              hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
              hr_manager_notes: hrNotes,
              hr_manager_approved: selectedApplicationData.hr_manager_approved,
              coo_approved: selectedApplicationData.coo_approved,
              ceo_approved: selectedApplicationData.ceo_approved,
              coo_signature: selectedApplicationData.coo_signature,
              coo_notes: selectedApplicationData.coo_notes,
              coo_sign_date: selectedApplicationData.coo_sign_date,
              ceo_signature: selectedApplicationData.ceo_signature,
              ceo_notes: selectedApplicationData.ceo_notes,
              ceo_sign_date: selectedApplicationData.ceo_sign_date,
              createdby: selectedApplicationData.createdby,
              createdat: selectedApplicationData.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedApplication.status,
            createdBy: selectedApplication.createdBy,
            createdAt: selectedApplication.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`${config.baseURL}/application`)
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.error}`,
                  })
                } else {
                  if(isEdit){
                    Swal.fire(
                      'Success!',
                      'Justification has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Justification has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerNotes(true)
                  setHideSupervisorNotes(true)
                  setHideManagementDesicion(true)
                  setHideCEONotes(true)
                  setHideCOONotes(true)
                }
                let allData = []
                data.map(indivData => {
                  allData.push(indivData)
                })
                setApplications(allData)
                allData.map(indivApplication => {
                  if (indivApplication.collateid === selectedApproval.collateid) {
                    setSelectedApplication(indivApplication)
                    setSelectedApplicationData(indivApplication.application_data)
                  }
                })
              })
              .then(() => {
                setIsReady(true)
              })
        
          })
  }
  
  const handleSaveProjectManagerNotes = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              employee_table_id: selectedApplicationData.employee_table_id,
              name: selectedApplicationData.name,
              employee_code: selectedApplicationData.employee_code,
              department: selectedApplicationData.department,
              designation: selectedApplicationData.designation,
              joining_date: selectedApplicationData.joining_date,
              employee_signature: selectedApplicationData.employee_signature,
              nationality: selectedApplicationData.nationality,
              employee_signature_date: selectedApplicationData.employee_signature_date,
              date_of_last_increment: selectedApplicationData.date_of_last_increment,
              basic: selectedApplicationData.basic,
              general_allowance: selectedApplicationData.general_allowance,
              housing_allowance: selectedApplicationData.housing_allowance,
              transportation_allowance: selectedApplicationData.transportation_allowance,
              tel_allowance: selectedApplicationData.tel_allowance,
              food_allowance: selectedApplicationData.food_allowance,
              date: selectedApplicationData.date,
              grade: selectedApplicationData.grade,
              new_basic: selectedApplicationData.new_basic,
              new_general_allowance: selectedApplicationData.new_general_allowance,
              new_housing_allowance: selectedApplicationData.new_housing_allowance,
              new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
              new_tel_allowance: selectedApplicationData.new_tel_allowance,
              new_food_allowance: selectedApplicationData.new_food_allowance,
              effective_date: selectedApplicationData.effective_date,
              supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
              supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
              supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
              supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
              supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
              immediate_supervisor: selectedApplicationData.immediate_supervisor,
              immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
              immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
              project_manager_notesL1: projectManagerNotesL1,
              project_manager_notesL2: projectManagerNotesL2,
              project_manager_notesL3: projectManagerNotesL3,
              project_manager_notesL4: projectManagerNotesL4,
              project_manager_notesL5: projectManagerNotesL5,
              project_manager: selectedApplicationData.project_manager,
              project_manager_name: selectedApplicationData.project_manager_name,
              project_manager_signature: selectedApplicationData.project_manager_signature,
              project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
              hr_manager_signature: selectedApplicationData.hr_manager_signature,
              hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
              hr_manager_notes: selectedApplicationData.hr_manager_notes,
              hr_manager_approved: selectedApplicationData.hr_manager_approved,
              coo_approved: selectedApplicationData.coo_approved,
              ceo_approved: selectedApplicationData.ceo_approved,
              coo_signature: selectedApplicationData.coo_signature,
              coo_notes: selectedApplicationData.coo_notes,
              coo_sign_date: selectedApplicationData.coo_sign_date,
              ceo_signature: selectedApplicationData.ceo_signature,
              ceo_notes: selectedApplicationData.ceo_notes,
              ceo_sign_date: selectedApplicationData.ceo_sign_date,
              createdby: selectedApplicationData.createdby,
              createdat: selectedApplicationData.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedApplication.status,
            createdBy: selectedApplication.createdBy,
            createdAt: selectedApplication.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`${config.baseURL}/application`)
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.error}`,
                  })
                } else {
                  if(isEdit){
                    Swal.fire(
                      'Success!',
                      'Notes has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Notes has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerNotes(true)
                  setHideSupervisorNotes(true)
                  setHideManagementDesicion(true)
                  setHideCEONotes(true)
                  setHideCOONotes(true)
                }
                let allData = []
                data.map(indivData => {
                  allData.push(indivData)
                })
                setApplications(allData)
                allData.map(indivApplication => {
                  if (indivApplication.collateid === selectedApproval.collateid) {
                    setSelectedApplication(indivApplication)
                    setSelectedApplicationData(indivApplication.application_data)
                  }
                })
              })
              .then(() => {
                setIsReady(true)
              })
            
          })
  }

  const handleSaveSupervisorNotes = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              employee_table_id: selectedApplicationData.employee_table_id,
              name: selectedApplicationData.name,
              employee_code: selectedApplicationData.employee_code,
              department: selectedApplicationData.department,
              designation: selectedApplicationData.designation,
              joining_date: selectedApplicationData.joining_date,
              employee_signature: selectedApplicationData.employee_signature,
              nationality: selectedApplicationData.nationality,
              employee_signature_date: selectedApplicationData.employee_signature_date,
              date_of_last_increment: selectedApplicationData.date_of_last_increment,
              basic: selectedApplicationData.basic,
              general_allowance: selectedApplicationData.general_allowance,
              housing_allowance: selectedApplicationData.housing_allowance,
              transportation_allowance: selectedApplicationData.transportation_allowance,
              tel_allowance: selectedApplicationData.tel_allowance,
              food_allowance: selectedApplicationData.food_allowance,
              date: selectedApplicationData.date,
              grade: selectedApplicationData.grade,
              new_basic: selectedApplicationData.new_basic,
              new_general_allowance: selectedApplicationData.new_general_allowance,
              new_housing_allowance: selectedApplicationData.new_housing_allowance,
              new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
              new_tel_allowance: selectedApplicationData.new_tel_allowance,
              new_food_allowance: selectedApplicationData.new_food_allowance,
              effective_date: selectedApplicationData.effective_date,
              supervisor_notesL1: supervisorNotesL1,
              supervisor_notesL2: supervisorNotesL2,
              supervisor_notesL3: supervisorNotesL3,
              supervisor_notesL4: supervisorNotesL4,
              supervisor_notesL5: supervisorNotesL5,
              immediate_supervisor: selectedApplicationData.immediate_supervisor,
              immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
              immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
              project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
              project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
              project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
              project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
              project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
              project_manager: selectedApplicationData.project_manager,
              project_manager_name: selectedApplicationData.project_manager_name,
              project_manager_signature: selectedApplicationData.project_manager_signature,
              project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
              hr_manager_signature: selectedApplicationData.hr_manager_signature,
              hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
              hr_manager_notes: selectedApplicationData.hr_manager_notes,
              hr_manager_approved: selectedApplicationData.hr_manager_approved,
              coo_approved: selectedApplicationData.coo_approved,
              ceo_approved: selectedApplicationData.ceo_approved,
              coo_signature: selectedApplicationData.coo_signature,
              coo_notes: selectedApplicationData.coo_notes,
              coo_sign_date: selectedApplicationData.coo_sign_date,
              ceo_signature: selectedApplicationData.ceo_signature,
              ceo_notes: selectedApplicationData.ceo_notes,
              ceo_sign_date: selectedApplicationData.ceo_sign_date,
              createdby: selectedApplicationData.createdby,
              createdat: selectedApplicationData.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedApplication.status,
            createdBy: selectedApplication.createdBy,
            createdAt: selectedApplication.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`${config.baseURL}/application`)
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.error}`,
                  })
                } else {
                  if(isEdit){
                    Swal.fire(
                      'Success!',
                      'Notes has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Notes has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerNotes(true)
                  setHideSupervisorNotes(true)
                  setHideManagementDesicion(true)
                  setHideCEONotes(true)
                }
                let allData = []
                data.map(indivData => {
                  allData.push(indivData)
                })
                setApplications(allData)
                allData.map(indivApplication => {
                  if (indivApplication.collateid === selectedApproval.collateid) {
                    setSelectedApplication(indivApplication)
                    setSelectedApplicationData(indivApplication.application_data)
                  }
                })
              })
              .then(() => {
                setIsReady(true)
              })
        
          })
  }

  const handleApproved = () => {
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    let ceoSign = ""
    let ceoSignDate = ""
    let cooSign = ""
    let cooSignDate = ""
    let hraSign = ""
    let hraSignDate = ""
    let projSign = ""
    let projSignDate = ""
    let immSign = ""
    let immSignDate = ""
    if (selectedApproval.approver_id === ceo.code) {
      ceoSign = ceo.signature
      ceoSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === coo.code) {
      cooSign = coo.signature
      cooSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === hraManager.code) {
      hraSign = hraManager.signature
      hraSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === immediateSupervisor.code) {
      immSign = immediateSupervisor.signature
      immSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === projectManager.code) {
      projSign = projectManager.signature
      projSignDate = moment(new Date()).format("MM/DD/YYYY")
    }

    if(selectedApplicationData.hr_manager_notes === "" && empCode === hraManager.code) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input change in salary!',
      })
    }

    if(selectedApplicationData.supervisor_notesL1 === "" && empCode === immediateSupervisor.code){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input justification!',
      })
    }

    if(selectedApplicationData.project_manager_notesL1 === "" && empCode === projectManager.code){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input notes!',
      })
    }

    if(selectedApplicationData.ceo_notes === "" && empCode === ceo.code){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input notes!',
      })
    }

    if(selectedApplicationData.coo_notes === "" && empCode === coo.code){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input notes!',
      })
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'Application has been Approved.',
          'success'
        )
        fetch(`${config.baseURL}/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            application_type: selectedApproval.application_type,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("YYYY-MM-DD"),
            status: "APPROVED"
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_id: selectedApplication.employee_id,
                application_data: {
                  employee_table_id: selectedApplicationData.employee_table_id,
                  name: selectedApplicationData.name,
                  employee_code: selectedApplicationData.employee_code,
                  department: selectedApplicationData.department,
                  designation: selectedApplicationData.designation,
                  joining_date: selectedApplicationData.joining_date,
                  employee_signature: selectedApplicationData.employee_signature,
                  nationality: selectedApplicationData.nationality,
                  employee_signature_date: selectedApplicationData.employee_signature_date,
                  date_of_last_increment: selectedApplicationData.date_of_last_increment,
                  basic: selectedApplicationData.basic,
                  general_allowance: selectedApplicationData.general_allowance,
                  housing_allowance: selectedApplicationData.housing_allowance,
                  transportation_allowance: selectedApplicationData.transportation_allowance,
                  tel_allowance: selectedApplicationData.tel_allowance,
                  food_allowance: selectedApplicationData.food_allowance,
                  date: selectedApplicationData.date,
                  grade: selectedApplicationData.grade,
                  new_basic: selectedApplicationData.new_basic,
                  new_general_allowance: selectedApplicationData.new_general_allowance,
                  new_housing_allowance: selectedApplicationData.new_housing_allowance,
                  new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
                  new_tel_allowance: selectedApplicationData.new_tel_allowance,
                  new_food_allowance: selectedApplicationData.new_food_allowance,
                  effective_date: selectedApplicationData.effective_date,
                  supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
                  supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
                  supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
                  supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
                  supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
                  immediate_supervisor: selectedApplicationData.immediate_supervisor,
                  immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
                  immidiate_supervisor_manager_signature: (selectedApplicationData.immidiate_supervisor_manager_signature ? selectedApplicationData.immidiate_supervisor_manager_signature : immSign),
                  immidiate_supervisor_sign_date: (selectedApplicationData.immidiate_supervisor_sign_date ? selectedApplicationData.immidiate_supervisor_sign_date : immSignDate),
                  project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
                  project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
                  project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
                  project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
                  project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
                  project_manager: selectedApplicationData.project_manager,
                  project_manager_name: selectedApplicationData.project_manager_name,
                  project_manager_signature: (selectedApplicationData.project_manager_signature ? selectedApplicationData.project_manager_signature : projSign),
                  project_manager_sign_date: (selectedApplicationData.project_manager_sign_date ? selectedApplicationData.project_manager_sign_date : projSignDate),
                  hr_manager_signature: (selectedApplicationData.hr_manager_signature ? selectedApplicationData.hr_manager_signature : hraSign),
                  hr_manager_sign_date: (selectedApplicationData.hr_manager_sign_date ? selectedApplicationData.hr_manager_sign_date : hraSignDate),
                  hr_manager_notes: selectedApplicationData.hr_manager_notes,
                  hr_manager_approved: (data.data.status === "APPROVED" && data.data.approver_id === hraManager.code ? true : selectedApplicationData.hr_manager_approved),
                  coo_approved: (data.data.status === "APPROVED" && data.data.approver_id === coo.code ? true : selectedApplicationData.coo_approved),
                  ceo_approved: (data.data.status === "APPROVED" && data.data.approver_id === ceo.code ? true : selectedApplicationData.ceo_approved),
                  coo_signature: (selectedApplicationData.coo_signature ? selectedApplicationData.coo_signature : cooSign),
                  coo_notes: selectedApplicationData.coo_notes,
                  coo_sign_date: (selectedApplicationData.coo_sign_date ? selectedApplicationData.coo_sign_date : cooSignDate),
                  ceo_signature: (selectedApplicationData.ceo_signature ? selectedApplicationData.ceo_signature : ceoSign),
                  ceo_notes: selectedApplicationData.ceo_notes,
                  ceo_sign_date: (selectedApplicationData.ceo_sign_date ? selectedApplicationData.ceo_sign_date : ceoSignDate),
                  createdby: selectedApplicationData.createdby,
                  createdat: selectedApplicationData.createdat,
                  updatedby: name,
                  updatedat: moment(new Date()).format("MM/DD/YYYY")
                },
                status: (
                    (selectedApplication.application_data.immidiate_supervisor_manager_signature || immSign) &&
                    (selectedApplication.application_data.project_manager_signature || projSign) &&
                    (selectedApplication.application_data.hr_manager_signature || hraSign) &&
                    (selectedApplication.application_data.coo_signature || cooSign) &&
                    (selectedApplication.application_data.ceo_signature || ceoSign)
                    ? "APPROVED"
                    : "PROCESSING"
                ),
                createdBy: selectedApplication.createdBy,
                createdAt: selectedApplication.createdAt,
                updatedBy: name,
                updatedAt: moment(new Date()).format("MM/DD/YYYY")
              })
            })
              .then(res => res.json())
              .then(data => {
                let applicationData = JSON.parse(data.data.application_data)
                let empTblID = applicationData.employee_table_id
                if(data.data.status === "APPROVED"){
                  fetch(`${config.baseURL}/employees?id=${empTblID}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
                    body: JSON.stringify({
                      basic: applicationData.new_basic,
                      general_allowance: applicationData.new_general_allowance,
                      transportation_allowance: applicationData.new_transportation_allowance,
                      tel_allow: applicationData.new_tel_allowance,
                      food_allowance: applicationData.new_food_allowance,
                      housing_allowance: applicationData.new_housing_allowance,
                      updatedBy: name,
                      updatedAt: moment(new Date()).format("MM/DD/YYYY")
                    })
                  })
                    .then(res => res.json())
                    .then(data => {
                    })
                }
                fetchData()
                handleRefresh()
              })
            fetchData()
            handleRefresh()
          })
      }
    })
  }

  const handleDeny = () => {
    const creds = Buffer.from(`${name}:`, 'utf8').toString('base64')
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'Application has been Denied.',
          'success'
        )
        fetch(`${config.baseURL}/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            application_type: selectedApproval.application_type,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY"),
            status: "DENIED"
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_id: selectedApplication.employee_id,
                application_data: {
                  employee_table_id: selectedApplicationData.employee_table_id,
                  name: selectedApplicationData.name,
                  employee_code: selectedApplicationData.employee_code,
                  department: selectedApplicationData.department,
                  designation: selectedApplicationData.designation,
                  joining_date: selectedApplicationData.joining_date,
                  employee_signature: selectedApplicationData.employee_signature,
                  nationality: selectedApplicationData.nationality,
                  employee_signature_date: selectedApplicationData.employee_signature_date,
                  date_of_last_increment: selectedApplicationData.date_of_last_increment,
                  basic: selectedApplicationData.basic,
                  general_allowance: selectedApplicationData.general_allowance,
                  housing_allowance: selectedApplicationData.housing_allowance,
                  transportation_allowance: selectedApplicationData.transportation_allowance,
                  tel_allowance: selectedApplicationData.tel_allowance,
                  food_allowance: selectedApplicationData.food_allowance,
                  date: selectedApplicationData.date,
                  grade: selectedApplicationData.grade,
                  new_basic: selectedApplicationData.new_basic,
                  new_general_allowance: selectedApplicationData.new_general_allowance,
                  new_housing_allowance: selectedApplicationData.new_housing_allowance,
                  new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
                  new_tel_allowance: selectedApplicationData.new_tel_allowance,
                  new_food_allowance: selectedApplicationData.new_food_allowance,
                  effective_date: selectedApplicationData.effective_date,
                  supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
                  supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
                  supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
                  supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
                  supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
                  immediate_supervisor: selectedApplicationData.immediate_supervisor,
                  immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
                  immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
                  immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
                  project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
                  project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
                  project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
                  project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
                  project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
                  project_manager: selectedApplicationData.project_manager,
                  project_manager_name: selectedApplicationData.project_manager_name,
                  project_manager_signature: selectedApplicationData.project_manager_signature,
                  project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
                  hr_manager_signature: selectedApplicationData.hr_manager_signature,
                  hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
                  hr_manager_notes: selectedApplicationData.hr_manager_notes,
                  hr_manager_approved: (data.data.status === "DENIED" && data.data.approver_id === hraManager.code ? false : selectedApplicationData.hr_manager_approved),
                  coo_approved: (data.data.status === "DENIED" && data.data.approver_id === coo.code ? false : selectedApplicationData.coo_approved),
                  ceo_approved: (data.data.status === "DENIED" && data.data.approver_id === ceo.code ? false : selectedApplicationData.ceo_approved),
                  coo_signature: selectedApplicationData.coo_signature,
                  coo_notes: selectedApplicationData.coo_notes,
                  coo_sign_date: selectedApplicationData.coo_sign_date,
                  ceo_signature: selectedApplicationData.ceo_signature,
                  ceo_notes: selectedApplicationData.ceo_notes,
                  ceo_sign_date: selectedApplicationData.ceo_sign_date,
                  createdby: selectedApplicationData.createdby,
                  createdat: selectedApplicationData.createdat,
                  updatedby: name,
                  updatedat: moment(new Date()).format("MM/DD/YYYY")
                },
                status: "DENIED",
                createdBy: selectedApplication.createdBy,
                createdAt: selectedApplication.createdAt,
                updatedBy: name,
                updatedAt: moment(new Date()).format("MM/DD/YYYY")
              })
            })
              .then(res => res.json())
              .then(data => {
                fetchData()
                handleRefresh()
              })
            fetchData()
            handleRefresh()
          })
      }
    })
  }

  const handleReview = () => {
    const creds = Buffer.from(`${name}:`, 'utf8').toString('base64')
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'Application has been tagged for Review.',
          'success'
        )
        fetch(`${config.baseURL}/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            application_type: selectedApproval.application_type,
            collateid: selectedApproval.collateid,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY"),
            status: "REVIEW"
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_id: selectedApplication.employee_id,
                application_data: {
                  employee_table_id: selectedApplicationData.employee_table_id,
                  name: selectedApplicationData.name,
                  employee_code: selectedApplicationData.employee_code,
                  department: selectedApplicationData.department,
                  designation: selectedApplicationData.designation,
                  joining_date: selectedApplicationData.joining_date,
                  employee_signature: selectedApplicationData.employee_signature,
                  nationality: selectedApplicationData.nationality,
                  employee_signature_date: selectedApplicationData.employee_signature_date,
                  date_of_last_increment: selectedApplicationData.date_of_last_increment,
                  basic: selectedApplicationData.basic,
                  general_allowance: selectedApplicationData.general_allowance,
                  housing_allowance: selectedApplicationData.housing_allowance,
                  transportation_allowance: selectedApplicationData.transportation_allowance,
                  tel_allowance: selectedApplicationData.tel_allowance,
                  food_allowance: selectedApplicationData.food_allowance,
                  date: selectedApplicationData.date,
                  grade: selectedApplicationData.grade,
                  new_basic: selectedApplicationData.new_basic,
                  new_general_allowance: selectedApplicationData.new_general_allowance,
                  new_housing_allowance: selectedApplicationData.new_housing_allowance,
                  new_transportation_allowance: selectedApplicationData.new_transportation_allowance,
                  new_tel_allowance: selectedApplicationData.new_tel_allowance,
                  new_food_allowance: selectedApplicationData.new_food_allowance,
                  effective_date: selectedApplicationData.effective_date,
                  supervisor_notesL1: selectedApplicationData.supervisor_notesL1,
                  supervisor_notesL2: selectedApplicationData.supervisor_notesL2,
                  supervisor_notesL3: selectedApplicationData.supervisor_notesL3,
                  supervisor_notesL4: selectedApplicationData.supervisor_notesL4,
                  supervisor_notesL5: selectedApplicationData.supervisor_notesL5,
                  immediate_supervisor: selectedApplicationData.immediate_supervisor,
                  immediate_supervisor_name: selectedApplicationData.immediate_supervisor_name,
                  immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
                  immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
                  project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
                  project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
                  project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
                  project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
                  project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
                  project_manager: selectedApplicationData.project_manager,
                  project_manager_name: selectedApplicationData.project_manager_name,
                  project_manager_signature: selectedApplicationData.project_manager_signature,
                  project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
                  hr_manager_signature: selectedApplicationData.hr_manager_signature,
                  hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
                  hr_manager_notes: selectedApplicationData.hr_manager_notes,
                  hr_manager_approved: selectedApplicationData.hr_manager_approved,
                  coo_approved: selectedApplicationData.coo_approved,
                  ceo_approved: selectedApplicationData.ceo_approved,
                  coo_signature: selectedApplicationData.coo_signature,
                  coo_notes: selectedApplicationData.coo_notes,
                  coo_sign_date: selectedApplicationData.coo_sign_date,
                  ceo_signature: selectedApplicationData.ceo_signature,
                  ceo_notes: selectedApplicationData.ceo_notes,
                  ceo_sign_date: selectedApplicationData.ceo_sign_date,
                  createdby: selectedApplicationData.createdby,
                  createdat: selectedApplicationData.createdat,
                  updatedby: name,
                  updatedat: moment(new Date()).format("MM/DD/YYYY")
                },
                status: "REVIEW",
                createdBy: selectedApplication.createdBy,
                createdAt: selectedApplication.createdAt,
                updatedBy: name,
                updatedAt: moment(new Date()).format("MM/DD/YYYY")
              })
            })
              .then(res => res.json())
              .then(data => {
                fetchData()
                handleRefresh()
              })
            fetchData()
            handleRefresh()
          })
      }
    })
  }

  return(
    <React.Fragment>
      <div className="row">
        <div className="col-4 offset-8 text-right">
         <IncrementRequestApprovalForm 
          showForm={showForm}
          handleShowForm={handleShowForm}
          handleRefresh={handleRefresh}
          isReady={isReady}
          selectedApplicationData={selectedApplicationData}
          selectedApplication={selectedApplication}
          empCode={empCode}
          accessLevel={accessLevel}
          projectManager={projectManager}
          immediateSupervisor={immediateSupervisor}
          hraManager={hraManager}
          coo={coo}
          ceo={ceo}
          selectedApproval={selectedApproval}
          hideSupervisorNotes={hideSupervisorNotes}
          handleSupervisorNotesChange={handleSupervisorNotesChange}
          handleSaveSupervisorNotes={handleSaveSupervisorNotes}
          isEdit={isEdit}
          supervisorNotes={supervisorNotes}
          handleEditSupervisorNotes={handleEditSupervisorNotes}
          handleShowSupervisorNotes={handleShowSupervisorNotes}
          handleEditProjectManagerNotes={handleEditProjectManagerNotes}
          handleShowProjectManagerNotes={handleShowProjectManagerNotes}
          hideProjectManagerNotes={hideProjectManagerNotes}
          handleProjectManagerNotesChange={handleProjectManagerNotesChange}
          projectManagerNotes={projectManagerNotes}
          handleSaveProjectManagerNotes={handleSaveProjectManagerNotes}
          handleEditManagementDesicion={handleEditManagementDesicion}
          handleShowManagementDesicion={handleShowManagementDesicion}
          hideManagementDesicion={hideManagementDesicion}
          handleDateOfLastIncrementChange={handleDateOfLastIncrementChange}
          handleNewBasicChange={handleNewBasicChange}
          handleNewTransportationChange={handleNewTransportationChange}
          handleNewGeneralAllowanceChange={handleNewGeneralAllowanceChange}
          handleNewTelephoneAllowanceChange={handleNewTelephoneAllowanceChange}
          handleNewHousingAllowance={handleNewHousingAllowance}
          handleNewFoodAllowanceChange={handleNewFoodAllowanceChange}
          handleNewSalaryEffectivedateChange={handleNewSalaryEffectivedateChange}
          handleHRNotesChange={handleHRNotesChange}
          handleSaveMangementDesicion={handleSaveMangementDesicion}
          handleEditCEONotes={handleEditCEONotes}
          handleShowCEONotes={handleShowCEONotes}
          hideCEONotes={hideCEONotes}
          handleCEONotesChange={handleCEONotesChange}
          handleSaveCEONotes={handleSaveCEONotes}
          handleEditCOONotes={handleEditCOONotes}
          handleShowCOONotes={handleShowCOONotes}
          hideCOONotes={hideCOONotes}
          handleCOONotesChange={handleCOONotesChange}
          handleSaveCOONotes={handleSaveCOONotes}
          handleReview={handleReview}
          handleDeny={handleDeny}
          handleApproved={handleApproved}
         />
        </div>
      </div>
      <Sidebar />
      <div className="main-panel">
        <Topbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 ">
              <Row style={{ padding: "30px 0 15px 0" }}>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid yellow", borderBottom: "5px solid yellow" }}>
                    <CardTitle><h1>Pending</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{forApproval}</CardSubtitle>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid green", borderBottom: "5px solid green" }}>
                    <CardTitle><h1>Approved</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{approved}</CardSubtitle>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid red", borderBottom: "5px solid red" }}>
                    <CardTitle><h1>Denied</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{denied}</CardSubtitle>
                  </Card>
                </Col>
                {/* </Row>
              <Row> */}
                <div className="col-md-3">
                  {/* <div className="col-md-4 offset-4"> */}
                  <Card body className="text-center" style={{ borderLeft: "5px solid blue", borderBottom: "5px solid blue" }}>
                    <CardTitle><h1>For Review</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{review}</CardSubtitle>
                  </Card>
                </div>
              </Row>
              <div className='col-lg-12 justify-content-center'>
                <Card>
                  <CardBody>
                    <IncrementRequestApprovalTable 
                      data={approvals}
                      handleShowForm={handleShowForm}
                      refetch={fetchData}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
})

export default IncrementRequestApproval;