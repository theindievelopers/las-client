/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../../Layout/Sidebar'
import Topbar from '../../../Layout/Topbar'
import moment from 'moment'
import { Card, CardTitle, CardSubtitle, Row, Col, CardBody } from 'reactstrap';
import Swal from 'sweetalert2'
import ResignationApprovalTable from './ResignationApprovalTable'
import ResignationApprovalForm from './ResignationApprovalForm'
import { CredsContext } from '../../../context/Context'

const ResignationApproval = React.memo(props => {
  const { empCode, accessLevel, name, isLoggedIn, username } = useContext(CredsContext)

  const [showForm, setShowForm] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [approvals, setApprovals] = useState([])
  const [employess, setEmployees] = useState([])
  const [applications, setApplications] = useState([])
  const [selectedApproval, setSelectedApproval] = useState([])
  const [selectedApplication, setSelectedAppication] = useState([])
  const [selectedApplicationData, setSelectedApplicaitonData] = useState([])
  const [forApproval, setForApproval] = useState(0)
  const [approved, setApproved] = useState(0)
  const [denied, setDenied] = useState(0)
  const [review, setReview] = useState(0)
  const [accounting, setAccounting] = useState({})
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [logisticsOfficer, setLogisticsOfficer] = useState({})
  const [hraManager, setHraManager] = useState({})
  const [projectManager, setProjectManager] = useState({})
  const [immediateSuperior, setImmediateSuperior] = useState({})
  const [hideProjectManagerComments, setHideProjectManagerComments] = useState(true)
  const [hideSupervisorComments, setHideSupervisorComments] = useState(true)
  const [supervisorCommentL1, setSupervisorCommentL1] = useState("")
  const [supervisorCommentL2, setSupervisorCommentL2] = useState("")
  const [supervisorCommentL3, setSupervisorCommentL3] = useState("")
  const [supervisorComments, setSupervisorComments] = useState("")
  const [projectManagerCommentL1, setProjectManagerCommentL1] = useState("")
  const [projectManagerCommentL2, setProjectManagerCommentL2] = useState("")
  const [projectManagerCommentL3, setProjectManagerCommentL3] = useState("")
  const [projectManagerNotes, setProjectManagerNotes] = useState("")
  const [hideHRComments, setHideHRComments] = useState(true)
  const [hrCommentsL1, setHRCommentsL1] = useState("")
  const [hrCommentsL2, setHRCommentsL2] = useState("")
  const [hraComments, setHraComments] = useState("")
  

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }
    if (accessLevel === 4) {
      window.location.replace('#/leaves')
    }

    refetch()
  }, [])

  const refetch = () => {
    fetch('http://localhost:3000/approvals')
      .then(res => res.json())
      .then(data => {
        let allData = []
        let approved = []
        let denied = []
        let review = []
        let pending = []
        data.map(indivData => {
          if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.approver_id) {
            if (indivData.application_type === "RESIGNATION") {
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

    fetch('http://localhost:3000/application')
      .then(res => res.json())
      .then(data => {
        let allData = []
        data.map(indivData => {
          allData.push(indivData)
        })
        setApplications(allData)
      })

    fetch('http://localhost:3000/applicationform')
      .then(res => res.json())
      .then(data => {
        let approverCode = data[0].data.approvers
        let accounting = []
        let ceo = []
        let coo = []
        let hraManager = []
        let logisticsOfficer = []
        fetch('http://localhost:3000/employee')
          .then(res => res.json())
          .then(data => {
            data.map(inidvData => {
              if (inidvData.code === approverCode.accounting) {
                accounting.push(inidvData)
              }
              if (inidvData.code === approverCode.ceo) {
                ceo.push(inidvData)
              }
              if (inidvData.code === approverCode.coo) {
                coo.push(inidvData)
              }
              if (inidvData.code === approverCode.hra_manager) {
                hraManager.push(inidvData)
              }
              if (inidvData.code === approverCode.logistics_officer) {
                logisticsOfficer.push(inidvData)
              }
            })
            setEmployees(data)
          })
          .then(() => {
            setAccounting(accounting[0])
            setCeo(ceo[0])
            setCoo(coo[0])
            setLogisticsOfficer(logisticsOfficer[0])
            setHraManager(hraManager[0])
          })
      })
  }

  const handleShowForm = (data) => {
    setSelectedApproval(data)
    let projectManID = ""
    let immediateSupID = ""
    applications.map(indivApplication => {
      if (indivApplication.collateid === data.collateid) {
        setSelectedAppication(indivApplication)
        setSelectedApplicaitonData(indivApplication.application_data)
        projectManID = indivApplication.application_data.project_manager
        immediateSupID = indivApplication.application_data.immediate_supervisor
      }
    })
    employess.map(indivEmpoyee => {
      if (indivEmpoyee.code === immediateSupID) {
        setImmediateSuperior(indivEmpoyee)
      }
      if (indivEmpoyee.code === projectManID) {
        setProjectManager(indivEmpoyee)
      }
    })
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
    setShowForm(true)
  }

  const handleRefresh = () => {
    setIsReady(false)
    setShowForm(false)
    setHideProjectManagerComments(true)
    setHideSupervisorComments(true)
    setHideHRComments(true)
  }

  const handleShowProjectManagerCommentsInput = () => {
    setHideProjectManagerComments(!hideProjectManagerComments)
  }

  const handleShowSupervisorCommentsInput = () => {
    setHideSupervisorComments(!hideSupervisorComments)
  }

  const handleSupervisorCommentsChange = (e) => {
    let supervisorComments = e.target.value.split(/[\s]+/)
    let trimmedSupervisorCommentsL1 = []
    let trimmedSupervisorCommentsL2 = []
    let trimmedSupervisorCommentsL3 = []
    supervisorComments.map(word => {
      if(trimmedSupervisorCommentsL1.length <=17) {
        return trimmedSupervisorCommentsL1.push(word)
      } else if(trimmedSupervisorCommentsL2.length <=17) {
        return trimmedSupervisorCommentsL2.push(word)
      } else {
        return trimmedSupervisorCommentsL3.push(word)
      }
    })
    setSupervisorCommentL1(trimmedSupervisorCommentsL1.join(" "))
    setSupervisorCommentL2(trimmedSupervisorCommentsL2.join(" "))
    setSupervisorCommentL3(trimmedSupervisorCommentsL3.join(" "))
  }

  const handleProjectManagerNotesChange = (e) => {
    let projectManagerNotes = e.target.value.split(/[\s]+/)
    let trimmedProjManNotesL1 = []
    let trimmedProjManNotesL2 = []
    let trimmedProjManNotesL3 = []
    projectManagerNotes.map(word => {
      if(trimmedProjManNotesL1.length <=17) {
        return trimmedProjManNotesL1.push(word)
      } else if(trimmedProjManNotesL2.length <=17) {
        return trimmedProjManNotesL2.push(word)
      } else {
        return trimmedProjManNotesL3.push(word)
      }
    })
    setProjectManagerCommentL1(trimmedProjManNotesL1.join(" "))
    setProjectManagerCommentL2(trimmedProjManNotesL2.join(" "))
    setProjectManagerCommentL3(trimmedProjManNotesL3.join(" "))
  }
  

  const handleEditSupervisorCommentsInput = () => {
    let applicationData = selectedApplication.application_data
    setIsEdit(true)
    setHideSupervisorComments(!hideSupervisorComments)
    setSupervisorCommentL1(applicationData.supervisor_commentL1)
    setSupervisorCommentL2(applicationData.supervisor_commentL2)
    setSupervisorCommentL3(applicationData.supervisor_commentL3)
    setSupervisorComments(
      `${applicationData.supervisor_commentL1} ${applicationData.supervisor_commentL2} ${applicationData.supervisor_commentL3}`
    )
  }

  const handleEditProjectManagerCommentsInput = () => {
    let applicationData = selectedApplication.application_data
    setIsEdit(true)
    setHideProjectManagerComments(!hideProjectManagerComments)
    setProjectManagerCommentL1(applicationData.project_manager_commentL1)
    setProjectManagerCommentL2(applicationData.project_manager_commentL2)
    setProjectManagerCommentL3(applicationData.project_manager_commentL3)
    setProjectManagerNotes(
      `${applicationData.project_manager_commentL1} ${applicationData.project_manager_commentL2} ${applicationData.project_manager_commentL3}`
    )
  }

  const handleEditHRCommentsInput = () => {
    let applicationData = selectedApplication.application_data
    setIsEdit(true)
    setHideHRComments(!hideHRComments)
    setHRCommentsL1(applicationData.hr_manager_commentL1)
    setHRCommentsL2(applicationData.hr_manager_commentL2)
    setHraComments(
      `${applicationData.hr_manager_commentL1} ${applicationData.hr_manager_commentL2}`
    )
  }
  
  const handleShowHRCommentsInput = () => {
    setHideHRComments(!hideHRComments)
  }
  
  const handleHRCommentL1 = (e) => {
    setHRCommentsL1(e.target.value)
  }
  
  const handleHRCommentL2 = (e) => {
    setHRCommentsL2(e.target.value)
  }

  const handleHraCommentsChange = (e) => {
    let hraComments = e.target.value.split(/[\s]+/)
    let trimmedHraCommentsL1 = []
    let trimmedHraCommentsL2 = []
    hraComments.map(word => {
      if(trimmedHraCommentsL1.length <=17) {
        return trimmedHraCommentsL1.push(word)
      } else {
        return trimmedHraCommentsL2.push(word)
      }
    })
    setHRCommentsL1(trimmedHraCommentsL1.join(" "))
    setHRCommentsL2(trimmedHraCommentsL2.join(" "))
  }

  const handleSaveHRComments = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
      body: JSON.stringify({
        application_form_code: selectedApplication.application_form_code,
        employee_code: selectedApplication.employee_code,
        application_data: {
          employee_table_id: selectedApplication.application_data.employee_table_id,
          name: selectedApplication.application_data.name,
          employee_code: selectedApplication.application_data.employee_code,
          department: selectedApplication.application_data.department,
          position: selectedApplication.application_data.position,
          joining_date: selectedApplication.application_data.joining_date,
          effective_resignation_date: selectedApplication.application_data.effective_resignation_date,
          reason_for_resignationL1: selectedApplication.application_data.reason_for_resignationL1,
          reason_for_resignationL2: selectedApplication.application_data.reason_for_resignationL2,
          reason_for_resignationL3: selectedApplication.application_data.reason_for_resignationL3,
          reason_for_resignationL4: selectedApplication.application_data.reason_for_resignationL4,
          employee_signature: selectedApplication.application_data.employee_signature,
          employee_signature_date: selectedApplication.application_data.employee_signature_date,
          supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
          supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
          supervisor_commentL3: selectedApplication.application_data.supervisor_commentL3,
          immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
          immidiate_supervisor_manager_signature: selectedApplication.application_data.immidiate_supervisor_manager_signature,
          immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
          project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
          project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
          project_manager_commentL3: selectedApplication.application_data.project_manager_commentL3,
          project_manager: selectedApplication.application_data.project_manager,
          project_manager_signature: selectedApplication.application_data.project_manager_signature,
          project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
          hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
          hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
          hr_manager_commentL1: hrCommentsL1,
          hr_manager_commentL2: hrCommentsL2,
          coo_signature: selectedApplication.application_data.coo_signature,
          coo_sign_date: selectedApplication.application_data.coo_sign_date,
          ceo_signature: selectedApplication.application_data.ceo_signature,
          ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
          createdby: selectedApplication.application_data.createdby,
          createdat: selectedApplication.application_data.createdat,
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
        handleShowHRCommentsInput()
        fetch('http://localhost:3000/application')
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
                  'Comments has been updated successfully!',
                  'success'
                )
              } else {
                Swal.fire(
                  'Success!',
                  'Comments has been added successfully!',
                  'success'
                )
              }
            }
            let allData = []
            data.map(indivData => {
              allData.push(indivData)
            })
            setApplications(allData)
            allData.map(indivApplication => {
              if (indivApplication.collateid === selectedApproval.collateid) {
                setSelectedAppication(indivApplication)
                setSelectedApplicaitonData(indivApplication.application_data)
              }
            })
          })
          .then(() => {
            setIsReady(true)
          })
        
      })
  }

  const handleSaveProjectManagerComments = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
      body: JSON.stringify({
        application_form_code: selectedApplication.application_form_code,
        employee_code: selectedApplication.employee_code,
        application_data: {
          employee_table_id: selectedApplication.application_data.employee_table_id,
          name: selectedApplication.application_data.name,
          employee_code: selectedApplication.application_data.employee_code,
          department: selectedApplication.application_data.department,
          position: selectedApplication.application_data.position,
          joining_date: selectedApplication.application_data.joining_date,
          effective_resignation_date: selectedApplication.application_data.effective_resignation_date,
          reason_for_resignationL1: selectedApplication.application_data.reason_for_resignationL1,
          reason_for_resignationL2: selectedApplication.application_data.reason_for_resignationL2,
          reason_for_resignationL3: selectedApplication.application_data.reason_for_resignationL3,
          reason_for_resignationL4: selectedApplication.application_data.reason_for_resignationL4,
          employee_signature: selectedApplication.application_data.employee_signature,
          employee_signature_date: selectedApplication.application_data.employee_signature_date,
          supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
          supervisor_commentL2: selectedApplication.application_data.supervisor_commentL1,
          supervisor_commentL3: selectedApplication.application_data.supervisor_commentL1,
          immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
          immidiate_supervisor_manager_signature: selectedApplication.application_data.immidiate_supervisor_manager_signature,
          immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
          project_manager_commentL1: projectManagerCommentL1,
          project_manager_commentL2: projectManagerCommentL2,
          project_manager_commentL3: projectManagerCommentL3,
          project_manager: selectedApplication.application_data.project_manager,
          project_manager_signature: selectedApplication.application_data.project_manager_signature,
          project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
          hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
          hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
          hr_manager_commentL1: selectedApplication.application_data.hr_manager_commentL1,
          hr_manager_commentL2: selectedApplication.application_data.hr_manager_commentL2,
          coo_signature: selectedApplication.application_data.coo_signature,
          coo_sign_date: selectedApplication.application_data.coo_sign_date,
          ceo_signature: selectedApplication.application_data.ceo_signature,
          ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
          createdby: selectedApplication.application_data.createdby,
          createdat: selectedApplication.application_data.createdat,
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
        handleShowProjectManagerCommentsInput()
        fetch('http://localhost:3000/application')
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
                  'Comments has been updated successfully!',
                  'success'
                )
              } else {
                Swal.fire(
                  'Success!',
                  'Comments has been added successfully!',
                  'success'
                )
              }
            }
            let allData = []
            data.map(indivData => {
              allData.push(indivData)
            })
            setApplications(allData)
            allData.map(indivApplication => {
              if (indivApplication.collateid === selectedApproval.collateid) {
                setSelectedAppication(indivApplication)
                setSelectedApplicaitonData(indivApplication.application_data)
              }
            })
          })
          .then(() => {
            setIsReady(true)
          })
        
      })
  }

  const handleSaveSupervisorComments = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
      body: JSON.stringify({
        application_form_code: selectedApplication.application_form_code,
        employee_code: selectedApplication.employee_code,
        application_data: {
          employee_table_id: selectedApplication.application_data.employee_table_id,
          name: selectedApplication.application_data.name,
          employee_code: selectedApplication.application_data.employee_code,
          department: selectedApplication.application_data.department,
          position: selectedApplication.application_data.position,
          joining_date: selectedApplication.application_data.joining_date,
          effective_resignation_date: selectedApplication.application_data.effective_resignation_date,
          reason_for_resignationL1: selectedApplication.application_data.reason_for_resignationL1,
          reason_for_resignationL2: selectedApplication.application_data.reason_for_resignationL2,
          reason_for_resignationL3: selectedApplication.application_data.reason_for_resignationL3,
          reason_for_resignationL4: selectedApplication.application_data.reason_for_resignationL4,
          employee_signature: selectedApplication.application_data.employee_signature,
          employee_signature_date: selectedApplication.application_data.employee_signature_date,
          supervisor_commentL1: supervisorCommentL1,
          supervisor_commentL2: supervisorCommentL2,
          supervisor_commentL3: supervisorCommentL3,
          immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
          immidiate_supervisor_manager_signature: selectedApplication.application_data.immidiate_supervisor_manager_signature,
          immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
          project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
          project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
          project_manager_commentL3: selectedApplication.application_data.project_manager_commentL3,
          project_manager: selectedApplication.application_data.project_manager,
          project_manager_signature: selectedApplication.application_data.project_manager_signature,
          project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
          hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
          hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
          hr_manager_commentL1: selectedApplication.application_data.hr_manager_commentL1,
          hr_manager_commentL2: selectedApplication.application_data.hr_manager_commentL2,
          coo_signature: selectedApplication.application_data.coo_signature,
          coo_sign_date: selectedApplication.application_data.coo_sign_date,
          ceo_signature: selectedApplication.application_data.ceo_signature,
          ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
          createdby: selectedApplication.application_data.createdby,
          createdat: selectedApplication.application_data.createdat,
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
        handleShowSupervisorCommentsInput()
        fetch('http://localhost:3000/application')
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
                  'Comments has been updated successfully!',
                  'success'
                )
              } else {
                Swal.fire(
                  'Success!',
                  'Comments has been added successfully!',
                  'success'
                )
              }
            }
            let allData = []
            data.map(indivData => {
              allData.push(indivData)
            })
            setApplications(allData)
            allData.map(indivApplication => {
              if (indivApplication.collateid === selectedApproval.collateid) {
                setSelectedAppication(indivApplication)
                setSelectedApplicaitonData(indivApplication.application_data)
              }
            })
          })
          .then(() => {
            setIsReady(true)
          })
        
      })
  }

  const handleApprove = () => {
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
    if (selectedApproval.approver_id === immediateSuperior.code) {
      immSign = immediateSuperior.signature
      immSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === projectManager.code) {
      projSign = projectManager.signature
      projSignDate = moment(new Date()).format("MM/DD/YYYY")
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
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
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
            fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_id: selectedApplication.employee_id,
                application_data: {
                  employee_table_id: selectedApplication.application_data.employee_table_id,
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  department: selectedApplication.application_data.department,
                  position: selectedApplication.application_data.position,
                  joining_date: selectedApplication.application_data.joining_date,
                  effective_resignation_date: selectedApplication.application_data.effective_resignation_date,
                  reason_for_resignationL1: selectedApplication.application_data.reason_for_resignationL1,
                  reason_for_resignationL2: selectedApplication.application_data.reason_for_resignationL2,
                  reason_for_resignationL3: selectedApplication.application_data.reason_for_resignationL3,
                  reason_for_resignationL4: selectedApplication.application_data.reason_for_resignationL4,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
                  supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
                  supervisor_commentL3: selectedApplication.application_data.supervisor_commentL3,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  immidiate_supervisor_manager_signature: (selectedApplication.application_data.immidiate_supervisor_manager_signature ? selectedApplication.application_data.immidiate_supervisor_manager_signature : immSign),
                  immidiate_supervisor_sign_date: (selectedApplication.application_data.immidiate_supervisor_sign_date ? selectedApplication.application_data.immidiate_supervisor_sign_date : immSignDate),
                  project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
                  project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                  project_manager_commentL3: selectedApplication.application_data.project_manager_commentL3,
                  project_manager: selectedApplication.application_data.project_manager,
                  project_manager_signature: (selectedApplication.application_data.project_manager_signature ? selectedApplication.application_data.project_manager_signature : projSign),
                  project_manager_sign_date: (selectedApplication.application_data.project_manager_sign_date ? selectedApplication.application_data.project_manager_sign_date : projSignDate),
                  hr_manager_signature: (selectedApplication.application_data.hr_manager_signature ? selectedApplication.application_data.hr_manager_signature : hraSign),
                  hr_manager_sign_date: (selectedApplication.application_data.hr_manager_sign_date ? selectedApplication.application_data.hr_manager_sign_date : hraSignDate),
                  hr_manager_commentL1: selectedApplication.application_data.hr_manager_commentL1,
                  hr_manager_commentL2: selectedApplication.application_data.hr_manager_commentL2,
                  coo_signature: (selectedApplication.application_data.coo_signature ? selectedApplication.application_data.coo_signature : cooSign),
                  coo_sign_date: (selectedApplication.application_data.coo_sign_date ? selectedApplication.application_data.coo_sign_date : cooSignDate),
                  ceo_signature: (selectedApplication.application_data.ceo_signature ? selectedApplication.application_data.ceo_signature : ceoSign),
                  ceo_sign_date: (selectedApplication.application_data.ceo_sign_date ? selectedApplication.application_data.ceo_sign_date : ceoSignDate),
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
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
                let empTblID = selectedApplication.application_data.employee_table_id
                if(data.data.status === "APPROVED"){
                  fetch(`http://localhost:3000/employees?id=${empTblID}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
                    body: JSON.stringify({
                      employment_status: "RESIGNED",
                      updatedBy: name,
                      updatedAt: moment(new Date()).format("MM/DD/YYYY")
                    })
                  })
                    .then(res => res.json())
                    .then(data => {
                    })
                }
                refetch()
                handleRefresh()
              })
            refetch()
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
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
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
            fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_id: selectedApplication.employee_id,
                application_data: {
                  employee_table_id: selectedApplication.application_data.employee_table_id,
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  department: selectedApplication.application_data.department,
                  position: selectedApplication.application_data.position,
                  joining_date: selectedApplication.application_data.joining_date,
                  effective_resignation_date: selectedApplication.application_data.effective_resignation_date,
                  reason_for_resignationL1: selectedApplication.application_data.reason_for_resignationL1,
                  reason_for_resignationL2: selectedApplication.application_data.reason_for_resignationL2,
                  reason_for_resignationL3: selectedApplication.application_data.reason_for_resignationL3,
                  reason_for_resignationL4: selectedApplication.application_data.reason_for_resignationL4,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
                  supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
                  supervisor_commentL3: selectedApplication.application_data.supervisor_commentL3,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  immidiate_supervisor_manager_signature: selectedApplication.application_data.immidiate_supervisor_manager_signature,
                  immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
                  project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
                  project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                  project_manager_commentL3: selectedApplication.application_data.project_manager_commentL3,
                  project_manager: selectedApplication.application_data.project_manager,
                  project_manager_signature: selectedApplication.application_data.project_manager_signature,
                  project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                  hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
                  hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
                  hr_manager_commentL1: selectedApplication.application_data.hr_manager_commentL1,
                  hr_manager_commentL2: selectedApplication.application_data.hr_manager_commentL2,
                  coo_signature: selectedApplication.application_data.coo_signature,
                  coo_sign_date: selectedApplication.application_data.coo_sign_date,
                  ceo_signature: selectedApplication.application_data.ceo_signature,
                  ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
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
                refetch()
                handleRefresh()
              })
            refetch()
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
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
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
            fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_id: selectedApplication.employee_id,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  department: selectedApplication.application_data.department,
                  position: selectedApplication.application_data.position,
                  joining_date: selectedApplication.application_data.joining_date,
                  effective_resignation_date: selectedApplication.application_data.effective_resignation_date,
                  reason_for_resignationL1: selectedApplication.application_data.reason_for_resignationL1,
                  reason_for_resignationL2: selectedApplication.application_data.reason_for_resignationL2,
                  reason_for_resignationL3: selectedApplication.application_data.reason_for_resignationL3,
                  reason_for_resignationL4: selectedApplication.application_data.reason_for_resignationL4,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
                  supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
                  supervisor_commentL3: selectedApplication.application_data.supervisor_commentL3,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  immidiate_supervisor_manager_signature: selectedApplication.application_data.immidiate_supervisor_manager_signature,
                  immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
                  project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
                  project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                  project_manager_commentL3: selectedApplication.application_data.project_manager_commentL3,
                  project_manager: selectedApplication.application_data.project_manager,
                  project_manager_signature: selectedApplication.application_data.project_manager_signature,
                  project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                  hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
                  hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
                  hr_manager_commentL1: selectedApplication.application_data.hr_manager_commentL1,
                  hr_manager_commentL2: selectedApplication.application_data.hr_manager_commentL2,
                  coo_signature: selectedApplication.application_data.coo_signature,
                  coo_sign_date: selectedApplication.application_data.coo_sign_date,
                  ceo_signature: selectedApplication.application_data.ceo_signature,
                  ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
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
                refetch()
                handleRefresh()
              })
            refetch()
            handleRefresh()
          })
      }
    })
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-4 offset-8 text-right">
          <ResignationApprovalForm
            accessLevel={accessLevel}
            showForm={showForm}
            handleShowForm={handleShowForm}
            selectedApplication={selectedApplication}
            selectedApplicationData={selectedApplicationData}
            isReady={isReady}
            handleRefresh={handleRefresh}
            accounting={accounting}
            ceo={ceo}
            coo={coo}
            hraManager={hraManager}
            logisticsOfficer={logisticsOfficer}
            projectManager={projectManager}
            immediateSuperior={immediateSuperior}
            approvals={approvals}
            handleApprove={handleApprove}
            handleDeny={handleDeny}
            handleReview={handleReview}
            selectedApproval={selectedApproval}
            empCode={empCode}
            hideProjectManagerComments={hideProjectManagerComments}
            hideSupervisorComments={hideSupervisorComments}
            handleShowProjectManagerCommentsInput={handleShowProjectManagerCommentsInput}
            handleShowSupervisorCommentsInput={handleShowSupervisorCommentsInput}
            handleSaveSupervisorComments={handleSaveSupervisorComments}
            supervisorCommentL1={supervisorCommentL1}
            supervisorCommentL2={supervisorCommentL2}
            supervisorCommentL3={supervisorCommentL3}
            handleEditSupervisorCommentsInput={handleEditSupervisorCommentsInput}
            handleEditProjectManagerCommentsInput={handleEditProjectManagerCommentsInput}
            isEdit={isEdit}
            handleSaveProjectManagerComments={handleSaveProjectManagerComments}
            handleEditHRCommentsInput={handleEditHRCommentsInput}
            handleShowHRCommentsInput={handleShowHRCommentsInput}
            hideHRComments={hideHRComments}
            handleHRCommentL1={handleHRCommentL1}
            handleHRCommentL2={handleHRCommentL2}
            handleSaveHRComments={handleSaveHRComments}
            handleProjectManagerNotesChange={handleProjectManagerNotesChange}
            projectManagerNotes={projectManagerNotes}
            handleSupervisorCommentsChange={handleSupervisorCommentsChange}
            supervisorComments={supervisorComments}
            handleHraCommentsChange={handleHraCommentsChange}
            hraComments={hraComments}
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
                    <ResignationApprovalTable
                      data={approvals}
                      handleShowForm={handleShowForm}
                      refetch={refetch}
                      isLoading={isLoading}
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


export default ResignationApproval;