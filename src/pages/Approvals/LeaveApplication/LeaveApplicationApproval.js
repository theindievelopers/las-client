/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../../Layout/Sidebar';
import Topbar from '../../../Layout/Topbar';
import moment from 'moment';
import { Card, CardTitle, CardSubtitle, Row, Col, CardBody } from 'reactstrap';
import Swal from 'sweetalert2';
import { CredsContext } from '../../../context/Context';
import LeaveApplicationApprovalTable from './LeaveApplicationApprovalTable';
import LeaveApplicationApprovalForm from './LeaveApplicationApprovalForm';
import { config } from '../../../config/config';

const LeaveApplicationApproval = React.memo(() => {
  const { empCode, accessLevel, name, isLoggedIn, username } = useContext(CredsContext)

  const [approvals, setApprovals] = useState([])
  const [forApproval, setForApproval] = useState(0)
  const [approved, setApproved] = useState(0)
  const [denied, setDenied] = useState(0)
  const [review, setReview] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hraManager, setHraManager] = useState({})
  const [projectManager, setProjectManager] = useState({})
  const [immediateSuperior, setImmediateSuperior] = useState({})
  const [employess, setEmployees] = useState([])
  const [applications, setApplications] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState([])
  const [selectedApplication, setSelectedApplication] = useState([])
  const [selectedApplicationData, setSelectedApplicationData] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [hideSupervisorComments, setHideSupervisorComments] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [supervisorCommentsL1, setSupervisorCommentsL1] = useState("")
  const [supervisorCommentsL2, setSupervisorCommentsL2] = useState("")
  const [supervisorComments, setSupervisorComments] = useState("")
  const [projectManagerComments, setProjectManagerComments] = useState("")
  const [hideProjectManagerComments, setHideProjectManagerComments] = useState(true)
  const [hideHraRemarks, setHideHraRemarks] = useState(true)
  const [previousLeaveDate, setPreviousLeaveDate] = useState("")
  const [previousLeaveType, setPreviousLeaveType] = useState("")
  const [previousAnnualLeave, setPreviousAnnualLeave] = useState("")
  const [hraRemarks, setHraRemarks] = useState("")
  const [hraRemarksL1, setHraRemarksL1] = useState("")
  const [hraRemarksL2, setHraRemarksL2] = useState("")
  const [hraRemarksL3, setHraRemarksL3] = useState("")

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.replace('#/login')
    }
    if (accessLevel === 4) {
      window.location.replace('#/leaves')
    }
    refetch()
  }, [])

  const refetch = () => {
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
            if (indivData.application_type === "LEAVE_WORKER_APPLICATION") {
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
        let hraManager = []
        fetch(`${config.baseURL}/employee`)
          .then(res => res.json())
          .then(data => {
            data.map(inidvData => {
              if (inidvData.code === approverCode.hra_manager) {
                hraManager.push(inidvData)
              }
            })
            setEmployees(data)
          })
          .then(() => {
            setHraManager(hraManager[0])
          })
      })
  }

  const handleRefresh = () => {
    setIsReady(false)
    setShowForm(false)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
    setHideHraRemarks(true)
  }

  const handleShowForm = (data) => {
    setSelectedApproval(data)
    let projectManID = ""
    let immediateSupID = ""
    applications.map(indivApplication => {
      if (indivApplication.collateid === data.collateid) {
        setSelectedApplication(indivApplication)
        setSelectedApplicationData(indivApplication.application_data)
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
    setShowForm(!showForm)
  }

  const handleShowSupervisorComments = () => {
    setHideSupervisorComments(!hideSupervisorComments)
    setHideProjectManagerComments(true)
    setHideHraRemarks(true)
  }

  const handleEditSupervisorComments = () => {
    setIsEdit(true)
    setSupervisorComments(
      `${selectedApplicationData.supervisor_commentL1} ${selectedApplicationData.supervisor_commentL2}`
    )
    setSupervisorCommentsL1(selectedApplicationData.supervisor_commentL1)
    setSupervisorCommentsL2(selectedApplicationData.supervisor_commentL2)
    setHideSupervisorComments(!hideSupervisorComments)
    setHideProjectManagerComments(true)
    setHideHraRemarks(true)
  }

  const handleSupervisorCommentsChange = (e) => {
    let supervisorComments = e.target.value.split(/[\s]+/)
    let trimmedSupervisorCommentsL1 = []
    let trimmedSupervisorCommentsL2 = []

    supervisorComments.map(word => {
      if(trimmedSupervisorCommentsL1.length <= 14) {
        return trimmedSupervisorCommentsL1.push(word)
      } else {
        return trimmedSupervisorCommentsL2.push(word)
      }
    })
    setSupervisorCommentsL1(trimmedSupervisorCommentsL1.join(" "))
    setSupervisorCommentsL2(trimmedSupervisorCommentsL2.join(" "))
  }

  const handleEditProjectManagerComments = () => {
    setIsEdit(true)
    setProjectManagerComments(selectedApplicationData.project_manager_comment)
    setHideProjectManagerComments(!hideProjectManagerComments)
    setHideSupervisorComments(true)
    setHideHraRemarks(true)
  }

  const handleShowProjectManagerComments = () => {
    setHideProjectManagerComments(!hideProjectManagerComments)
    setHideSupervisorComments(true)
    setHideHraRemarks(true)
  }

  const handleProjectManagerCommentsChange = (e) => {
    setProjectManagerComments(e.target.value)
  }

  const handleEditHraRemarks = () => {
    setIsEdit(true)
    setHraRemarks(
      `${selectedApplicationData.hra_remarksL1} ${selectedApplicationData.hra_remarksL2} ${selectedApplicationData.hra_remarksL3}`
    )
    setHraRemarksL1(selectedApplicationData.hra_remarksL1)
    setHraRemarksL2(selectedApplicationData.hra_remarksL2)
    setHraRemarksL3(selectedApplicationData.hra_remarksL3)
    setPreviousAnnualLeave(selectedApplicationData.previous_annual_leave)
    setPreviousLeaveDate(selectedApplicationData.previous_leave_date)
    setPreviousLeaveType(selectedApplicationData.previous_leave_type)
    setHideHraRemarks(!hideHraRemarks)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
  }

  const handleShowHraRemarks = () => {
    setHideHraRemarks(!hideHraRemarks)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
  }
  
  const handlePreviousLeaveDateChange = (e) => {
    setPreviousLeaveDate(e.target.value)
  }
  
  const handlePreviousLeaveTypeChange = (e) => {
    setPreviousLeaveType(e.target.value)
  }
  
  const handlePreviousAnnualLeave = (e) => {
    setPreviousAnnualLeave(e.target.value)
  }
  
  const handleHraRemarksChange = (e) => {
    let hraRemarks = e.target.value.split(/[\s]+/)
    let trimmedHraRemarksL1 = []
    let trimmedHraRemarksL2 = []
    let trimmedHraRemarksL3 = []

    hraRemarks.map(word => {
      if(trimmedHraRemarksL1.length <= 17) {
        return trimmedHraRemarksL1.push(word)
      } else if(trimmedHraRemarksL2.length <= 17) {
        return trimmedHraRemarksL2.push(word)
      } else {
        return trimmedHraRemarksL3.push(word)
      }
    })
    setHraRemarksL1(trimmedHraRemarksL1.join(" "))
    setHraRemarksL2(trimmedHraRemarksL2.join(" "))
    setHraRemarksL3(trimmedHraRemarksL3.join(" "))
  }
  
  const handleSaveHraRemarks = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              name: selectedApplication.application_data.name,
              employee_code: selectedApplication.application_data.employee_code,
              nationality: selectedApplication.application_data.nationality,
              department: selectedApplication.application_data.department,
              designation: selectedApplication.application_data.designation,
              joining_date: selectedApplication.application_data.joining_date,
              country_of_destination: selectedApplication.application_data.country_of_destination,
              contact_country_destination: selectedApplication.application_data.contact_country_destination,
              sponsor: selectedApplication.application_data.sponsor,
              leave_type: selectedApplication.application_data.leave_type,
              leave_starting_date: selectedApplication.application_data.leave_starting_date,
              leave_ending_date: selectedApplication.application_data.leave_ending_date,
              actual_travel_date: selectedApplication.application_data.actual_travel_date,
              destination: selectedApplication.application_data.destination,
              no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
              submission_date: selectedApplication.application_data.submission_date,
              employee_signature: selectedApplication.application_data.employee_signature,
              employee_signature_date: selectedApplication.application_data.employee_signature_date,
              immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
              supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
              supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
              supervisor_signature: selectedApplication.application_data.supervisor_signature,
              project_manager: selectedApplication.application_data.project_manager,
              project_manager_comment: selectedApplication.application_data.project_manager_comment,
              project_manager_signature: selectedApplication.application_data.project_manager_signature,
              previous_leave_date: previousLeaveDate,
              previous_leave_type: previousLeaveType,
              previous_annual_leave: previousAnnualLeave,
              rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
              passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
              hra_approved: selectedApplication.application_data.hra_approved,
              hra_remarksL1: hraRemarksL1,
              hra_remarksL2: hraRemarksL2,
              hra_remarksL3: hraRemarksL3,
              hra_manager_signature: selectedApplication.application_data.hra_manager_signature,
              hra_manager_signature_date: selectedApplication.application_data.hra_manager_signature_date,
              createdBy: selectedApplication.application_data.createdby,
              createdAt: selectedApplication.application_data.createdat,
              updatedBy: name,
              updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
                  setHideProjectManagerComments(true)
                  setHideSupervisorComments(true)
                  setHideHraRemarks(true)
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

  const handleSaveProjectManagerComments = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              name: selectedApplication.application_data.name,
              employee_code: selectedApplication.application_data.employee_code,
              nationality: selectedApplication.application_data.nationality,
              department: selectedApplication.application_data.department,
              designation: selectedApplication.application_data.designation,
              joining_date: selectedApplication.application_data.joining_date,
              country_of_destination: selectedApplication.application_data.country_of_destination,
              contact_country_destination: selectedApplication.application_data.contact_country_destination,
              sponsor: selectedApplication.application_data.sponsor,
              leave_type: selectedApplication.application_data.leave_type,
              leave_starting_date: selectedApplication.application_data.leave_starting_date,
              leave_ending_date: selectedApplication.application_data.leave_ending_date,
              actual_travel_date: selectedApplication.application_data.actual_travel_date,
              destination: selectedApplication.application_data.destination,
              no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
              submission_date: selectedApplication.application_data.submission_date,
              employee_signature: selectedApplication.application_data.employee_signature,
              employee_signature_date: selectedApplication.application_data.employee_signature_date,
              immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
              supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
              supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
              supervisor_signature: selectedApplication.application_data.supervisor_signature,
              project_manager: selectedApplication.application_data.project_manager,
              project_manager_comment: projectManagerComments,
              project_manager_signature: selectedApplication.application_data.project_manager_signature,
              previous_leave_date: selectedApplication.application_data.previous_leave_date,
              previous_leave_type: selectedApplication.application_data.previous_leave_type,
              previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
              rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
              passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
              hra_approved: selectedApplication.application_data.hra_approved,
              hra_remarksL1: selectedApplication.application_data.hra_remarksL1,
              hra_remarksL2: selectedApplication.application_data.hra_remarksL2,
              hra_remarksL3: selectedApplication.application_data.hra_remarksL3,
              hra_manager_signature: selectedApplication.application_data.hra_manager_signature,
              hra_manager_signature_date: selectedApplication.application_data.hra_manager_signature_date,
              createdBy: selectedApplication.application_data.createdby,
              createdAt: selectedApplication.application_data.createdat,
              updatedBy: name,
              updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
              setHideProjectManagerComments(true)
              setHideSupervisorComments(true)
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

  const handleSaveSupervisorComments = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              name: selectedApplication.application_data.name,
              employee_code: selectedApplication.application_data.employee_code,
              nationality: selectedApplication.application_data.nationality,
              department: selectedApplication.application_data.department,
              designation: selectedApplication.application_data.designation,
              joining_date: selectedApplication.application_data.joining_date,
              country_of_destination: selectedApplication.application_data.country_of_destination,
              contact_country_destination: selectedApplication.application_data.contact_country_destination,
              sponsor: selectedApplication.application_data.sponsor,
              leave_type: selectedApplication.application_data.leave_type,
              leave_starting_date: selectedApplication.application_data.leave_starting_date,
              leave_ending_date: selectedApplication.application_data.leave_ending_date,
              actual_travel_date: selectedApplication.application_data.actual_travel_date,
              destination: selectedApplication.application_data.destination,
              no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
              submission_date: selectedApplication.application_data.submission_date,
              employee_signature: selectedApplication.application_data.employee_signature,
              employee_signature_date: selectedApplication.application_data.employee_signature_date,
              immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
              supervisor_commentL1: supervisorCommentsL1,
              supervisor_commentL2: supervisorCommentsL2,
              supervisor_signature: selectedApplication.application_data.supervisor_signature,
              project_manager: selectedApplication.application_data.project_manager,
              project_manager_comment: selectedApplication.application_data.project_manager_comment,
              project_manager_signature: selectedApplication.application_data.project_manager_signature,
              previous_leave_date: selectedApplication.application_data.previous_leave_date,
              previous_leave_type: selectedApplication.application_data.previous_leave_type,
              previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
              rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
              passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
              hra_approved: selectedApplication.application_data.hra_approved,
              hra_remarksL1: selectedApplication.application_data.hra_remarksL1,
              hra_remarksL2: selectedApplication.application_data.hra_remarksL2,
              hra_remarksL3: selectedApplication.application_data.hra_remarksL3,
              hra_manager_signature: selectedApplication.application_data.hra_manager_signature,
              hra_manager_signature_date: selectedApplication.application_data.hra_manager_signature_date,
              createdBy: selectedApplication.application_data.createdby,
              createdAt: selectedApplication.application_data.createdat,
              updatedBy: name,
              updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
              // setHideProjectManagerNotes(true)
              setHideSupervisorComments(true)
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
    let hraSign = ""
    let hraSignDate = ""
    let projSign = ""
    let immSign = ""

    if (selectedApproval.approver_id === hraManager.code) {
      hraSign = hraManager.signature
      hraSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === immediateSuperior.code) {
      immSign = immediateSuperior.signature
    }
    if (selectedApproval.approver_id === projectManager.code) {
      projSign = projectManager.signature
    }

    if(selectedApplication.application_data.hra_remarksL1 === "" && empCode === hraManager.code) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input Remarks!',
      })
    }

    if(selectedApplication.application_data.supervisor_commentL1 === "" && empCode === immediateSuperior.code){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input comments!',
      })
    }

    if(selectedApplication.application_data.project_manager_comment === "" && empCode === projectManager.code){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input comments!',
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
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  nationality: selectedApplication.application_data.nationality,
                  department: selectedApplication.application_data.department,
                  designation: selectedApplication.application_data.designation,
                  joining_date: selectedApplication.application_data.joining_date,
                  country_of_destination: selectedApplication.application_data.country_of_destination,
                  contact_country_destination: selectedApplication.application_data.contact_country_destination,
                  sponsor: selectedApplication.application_data.sponsor,
                  leave_type: selectedApplication.application_data.leave_type,
                  leave_starting_date: selectedApplication.application_data.leave_starting_date,
                  leave_ending_date: selectedApplication.application_data.leave_ending_date,
                  actual_travel_date: selectedApplication.application_data.actual_travel_date,
                  destination: selectedApplication.application_data.destination,
                  no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                  submission_date: selectedApplication.application_data.submission_date,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
                  supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
                  supervisor_signature: (selectedApplication.application_data.supervisor_signature ? selectedApplication.application_data.supervisor_signature : immSign),
                  project_manager: selectedApplication.application_data.project_manager,
                  project_manager_comment: selectedApplication.application_data.project_manager_comment,
                  project_manager_signature: (selectedApplication.application_data.project_manager_signature ? selectedApplication.application_data.project_manager_signature : projSign),
                  previous_leave_date: selectedApplication.application_data.previous_leave_date,
                  previous_leave_type: selectedApplication.application_data.previous_leave_type,
                  previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                  rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                  passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                  hra_approved: (data.data.status === "APPROVED" && data.data.approver_id === hraManager.code ? true : selectedApplication.application_data.hra_approved),
                  hra_remarksL1: selectedApplication.application_data.hra_remarksL1,
                  hra_remarksL2: selectedApplication.application_data.hra_remarksL2,
                  hra_remarksL3: selectedApplication.application_data.hra_remarksL3,
                  hra_manager_signature: (selectedApplication.application_data.hra_manager_signature ? selectedApplication.application_data.hra_manager_signature : hraSign),
                  hra_manager_signature_date: (selectedApplication.application_data.hra_manager_signature_date ? selectedApplication.application_data.hra_manager_signature_date : hraSignDate),
                  createdBy: selectedApplication.application_data.createdby,
                  createdAt: selectedApplication.application_data.createdat,
                  updatedBy: name,
                  updatedAt: moment(new Date()).format("MM/DD/YYYY")
                },
                status: (
                    (data.data.status === "APPROVED" && data.data.approver_id === hraManager.code ) &&
                    (selectedApplication.application_data.supervisor_signature || immSign) &&
                    (selectedApplication.application_data.project_manager_signature || projSign)
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
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  nationality: selectedApplication.application_data.nationality,
                  department: selectedApplication.application_data.department,
                  designation: selectedApplication.application_data.designation,
                  joining_date: selectedApplication.application_data.joining_date,
                  country_of_destination: selectedApplication.application_data.country_of_destination,
                  contact_country_destination: selectedApplication.application_data.contact_country_destination,
                  sponsor: selectedApplication.application_data.sponsor,
                  leave_type: selectedApplication.application_data.leave_type,
                  leave_starting_date: selectedApplication.application_data.leave_starting_date,
                  leave_ending_date: selectedApplication.application_data.leave_ending_date,
                  actual_travel_date: selectedApplication.application_data.actual_travel_date,
                  destination: selectedApplication.application_data.destination,
                  no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                  submission_date: selectedApplication.application_data.submission_date,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
                  supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
                  supervisor_signature: selectedApplication.application_data.supervisor_signature,
                  project_manager: selectedApplication.application_data.project_manager,
                  project_manager_comment: selectedApplication.application_data.project_manager_comment,
                  project_manager_signature: selectedApplication.application_data.project_manager_signature,
                  previous_leave_date: selectedApplication.application_data.previous_leave_date,
                  previous_leave_type: selectedApplication.application_data.previous_leave_type,
                  previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                  rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                  passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                  hra_approved: (data.data.status === "DENIED" && data.data.approver_id === hraManager.code ? false : selectedApplication.application_data.hra_approved),
                  hra_remarksL1: selectedApplication.application_data.hra_remarksL1,
                  hra_remarksL2: selectedApplication.application_data.hra_remarksL2,
                  hra_remarksL3: selectedApplication.application_data.hra_remarksL3,
                  hra_manager_signature: selectedApplication.application_data.hra_manager_signature,
                  hra_manager_signature_date: selectedApplication.application_data.hra_manager_signature_date,
                  createdBy: selectedApplication.application_data.createdby,
                  createdAt: selectedApplication.application_data.createdat,
                  updatedBy: name,
                  updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  nationality: selectedApplication.application_data.nationality,
                  department: selectedApplication.application_data.department,
                  designation: selectedApplication.application_data.designation,
                  joining_date: selectedApplication.application_data.joining_date,
                  country_of_destination: selectedApplication.application_data.country_of_destination,
                  contact_country_destination: selectedApplication.application_data.contact_country_destination,
                  sponsor: selectedApplication.application_data.sponsor,
                  leave_type: selectedApplication.application_data.leave_type,
                  leave_starting_date: selectedApplication.application_data.leave_starting_date,
                  leave_ending_date: selectedApplication.application_data.leave_ending_date,
                  actual_travel_date: selectedApplication.application_data.actual_travel_date,
                  destination: selectedApplication.application_data.destination,
                  no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                  submission_date: selectedApplication.application_data.submission_date,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  supervisor_commentL1: selectedApplication.application_data.supervisor_commentL1,
                  supervisor_commentL2: selectedApplication.application_data.supervisor_commentL2,
                  supervisor_signature: selectedApplication.application_data.supervisor_signature,
                  project_manager: selectedApplication.application_data.project_manager,
                  project_manager_comment: selectedApplication.application_data.project_manager_comment,
                  project_manager_signature: selectedApplication.application_data.project_manager_signature,
                  previous_leave_date: selectedApplication.application_data.previous_leave_date,
                  previous_leave_type: selectedApplication.application_data.previous_leave_type,
                  previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                  rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                  passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                  hra_approved: selectedApplication.application_data.hra_approved,
                  hra_remarksL1: selectedApplication.application_data.hra_remarksL1,
                  hra_remarksL2: selectedApplication.application_data.hra_remarksL2,
                  hra_remarksL3: selectedApplication.application_data.hra_remarksL3,
                  hra_manager_signature: selectedApplication.application_data.hra_manager_signature,
                  hra_manager_signature_date: selectedApplication.application_data.hra_manager_signature_date,
                  createdBy: selectedApplication.application_data.createdby,
                  createdAt: selectedApplication.application_data.createdat,
                  updatedBy: name,
                  updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
 
  return(
    <React.Fragment>
      <div className="row">
        <div className="col-4 offset-8 text-right">
          <LeaveApplicationApprovalForm 
            accessLevel={accessLevel}
            empCode={empCode}
            showForm={showForm}
            handleShowForm={handleShowForm}
            selectedApproval={selectedApproval}
            selectedApplication={selectedApplication}
            selectedApplicationData={selectedApplicationData}
            isReady={isReady}
            hraManager={hraManager}
            projectManager={projectManager}
            immediateSuperior={immediateSuperior}
            handleRefresh={handleRefresh}
            handleEditSupervisorComments={handleEditSupervisorComments}
            handleShowSupervisorComments={handleShowSupervisorComments}
            hideSupervisorComments={hideSupervisorComments}
            handleSupervisorCommentsChange={handleSupervisorCommentsChange}
            isEdit={isEdit}
            supervisorComments={supervisorComments}
            handleSaveSupervisorComments={handleSaveSupervisorComments}
            handleEditProjectManagerComments={handleEditProjectManagerComments}
            handleShowProjectManagerComments={handleShowProjectManagerComments}
            hideProjectManagerComments={hideProjectManagerComments}
            handleProjectManagerCommentsChange={handleProjectManagerCommentsChange}
            projectManagerComments={projectManagerComments}
            handleSaveProjectManagerComments={handleSaveProjectManagerComments}
            handleEditHraRemarks={handleEditHraRemarks}
            handleShowHraRemarks={handleShowHraRemarks}
            hideHraRemarks={hideHraRemarks}
            handleSaveHraRemarks={handleSaveHraRemarks}
            handlePreviousLeaveDateChange={handlePreviousLeaveDateChange}
            handlePreviousLeaveTypeChange={handlePreviousLeaveTypeChange}
            handlePreviousAnnualLeave={handlePreviousAnnualLeave}
            handleHraRemarksChange={handleHraRemarksChange}
            hraRemarks={hraRemarks}
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
                    <LeaveApplicationApprovalTable 
                      data={approvals}
                      refetch={refetch}
                      handleShowForm={handleShowForm}
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

export default LeaveApplicationApproval;