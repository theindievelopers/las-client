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
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
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
  const [projectManagerCommentsL1, setProjectManagerCommentsL1] = useState("")
  const [projectManagerCommentsL2, setProjectManagerCommentsL2] = useState("")
  const [hideProjectManagerComments, setHideProjectManagerComments] = useState(true)
  const [hideHraRemarks, setHideHraRemarks] = useState(true)
  const [previousLeaveDate, setPreviousLeaveDate] = useState("")
  const [previousLeaveType, setPreviousLeaveType] = useState("")
  const [previousAnnualLeave, setPreviousAnnualLeave] = useState("")
  const [hraRemarks, setHraRemarks] = useState("")
  const [hraRemarksL1, setHraRemarksL1] = useState("")
  const [hraRemarksL2, setHraRemarksL2] = useState("")
  const [hraRemarksL3, setHraRemarksL3] = useState("")
  const [disableFamilyTicket, setDisableFamilyTicket] = useState(true)
  const [familyTitcketEntitlement, setFamilyTicketEntitlement] = useState("")
  const [ticketWife, setTicketWife] = useState(false)
  const [ticketChildren, setTicketChildren] = useState(false)
  const [released, setReleased] = useState("")
  const [accruedLeaveDays, setAccruedLeaveDays] = useState("")
  const [ticketEntitlementRoute, setTicketEntitlementRoute] = useState("")
  const [hideCEORemarks, setHideCEORemarks] = useState(true)
  const [ceoRemarks, setCEORemarks] = useState("")
  const [hideCOORemarks, setHideCOORemarks] = useState(true)
  const [cooRemarks, setCOORemarks] = useState("")

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
            if (indivData.application_type === "LEAVE_WORKER_APPLICATION" || indivData.application_type === "LEAVE_STAFF_APPLICATION") {
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
        let ceo = []
        let coo = []
        fetch(`${config.baseURL}/employee`)
          .then(res => res.json())
          .then(data => {
            data.map(inidvData => {
              if (inidvData.code === approverCode.hra_manager) {
                hraManager.push(inidvData)
              }
              if (inidvData.code === approverCode.ceo) {
                ceo.push(inidvData)
              }
              if (inidvData.code === approverCode.coo) {
                coo.push(inidvData)
              }
            })
            setEmployees(data)
          })
          .then(() => {
            setHraManager(hraManager[0])
            setCeo(ceo[0])
            setCoo(coo[0])
          })
      })
  }

  const handleRefresh = () => {
    setIsReady(false)
    setShowForm(false)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
    setHideHraRemarks(true)
    setHideCEORemarks(true)
    setSelectedApproval([])
    setSelectedApplication({})
    setSelectedApplicationData({})
    setIsEdit(false)
  }

  const handleShowForm = (data) => {
    setSelectedApproval(data)
    let projectManID = ""
    let immediateSupID = ""
    applications.map(indivApplication => {
      if (indivApplication.collateid === data.collateid) {
        setPreviousLeaveType(indivApplication.application_data.previous_leave_type)
        setSelectedApplication(indivApplication)
        setSelectedApplicationData(indivApplication.application_data)
        projectManID = indivApplication.application_data.project_manager
        immediateSupID = indivApplication.application_data.immediate_supervisor
      }
    }
    , 
    () => {
      let leaveType = document.getElementById("leaveType")
      leaveType.value = selectedApplicationData.previous_leave_type
    }
    )
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
    if(selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION") {
      setSupervisorComments(
        `${selectedApplicationData.supervisor_commentL1} ${selectedApplicationData.supervisor_commentL2}`
      )
      setSupervisorCommentsL1(selectedApplicationData.supervisor_commentL1)
      setSupervisorCommentsL2(selectedApplicationData.supervisor_commentL2)
    } else {
      setSupervisorComments(
        `${selectedApplicationData.immediate_supervisor_commentL1} ${selectedApplicationData.immediate_supervisor_commentL1}`
      )
      setSupervisorCommentsL1(selectedApplicationData.immediate_supervisor_commentL1)
      setSupervisorCommentsL2(selectedApplicationData.immediate_supervisor_commentL2)
    }
    setHideSupervisorComments(!hideSupervisorComments)
    setHideProjectManagerComments(true)
    setHideHraRemarks(true)
    setHideCEORemarks(true)
    setHideCOORemarks(true)
  }

  const handleSupervisorCommentsChange = (e) => {
    let supervisorComments = e.target.value.split(/[\s]+/)
    let trimmedSupervisorCommentsL1 = []
    let trimmedSupervisorCommentsL2 = []

    supervisorComments.map(word => {
      if(selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION") {
        if(trimmedSupervisorCommentsL1.length <= 14) {
          return trimmedSupervisorCommentsL1.push(word)
        } else {
          return trimmedSupervisorCommentsL2.push(word)
        }
      } else {
        if(trimmedSupervisorCommentsL1.length <= 8) {
          return trimmedSupervisorCommentsL1.push(word)
        } else {
          return trimmedSupervisorCommentsL2.push(word)
        }
      }
    })
    setSupervisorCommentsL1(trimmedSupervisorCommentsL1.join(" "))
    setSupervisorCommentsL2(trimmedSupervisorCommentsL2.join(" "))
  }

  const handleEditProjectManagerComments = () => {
    setIsEdit(true)
    if(selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION") {
      setProjectManagerComments(selectedApplicationData.project_manager_comment)
    } else {
      setProjectManagerComments(
        `${selectedApplicationData.project_manager_commentL1} ${selectedApplicationData.project_manager_commentL2}`
      )
      setProjectManagerCommentsL1(selectedApplicationData.project_manager_commentL1)
      setProjectManagerCommentsL2(selectedApplicationData.project_manager_commentL2)
    }
    setHideProjectManagerComments(!hideProjectManagerComments)
    setHideSupervisorComments(true)
    setHideHraRemarks(true)
  }

  const handleShowProjectManagerComments = () => {
    setHideProjectManagerComments(!hideProjectManagerComments)
    setHideSupervisorComments(true)
    setHideHraRemarks(true)
    setHideCEORemarks(true)
    setHideCOORemarks(true)
  }

  const handleProjectManagerCommentsChange = (e) => {
    if(selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION"){
      setProjectManagerComments(e.target.value)
    } else {
      let projectManagerComments = e.target.value.split(/[\s]+/)
      let trimmedProjectManagerCommentsL1 = []
      let trimmedProjectManagerCommentsL2 = []

      projectManagerComments.map(word => {
          if(trimmedProjectManagerCommentsL1.length <= 8) {
            return trimmedProjectManagerCommentsL1.push(word)
          } else {
            return trimmedProjectManagerCommentsL2.push(word)
          }
      })
      setProjectManagerCommentsL1(trimmedProjectManagerCommentsL1.join(" "))
      setProjectManagerCommentsL2(trimmedProjectManagerCommentsL2.join(" "))
    }
  }

  const handleEditHraRemarks = () => {
    setIsEdit(true)
    if(selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION") {
      setHraRemarks(
        `${selectedApplicationData.hra_remarksL1} ${selectedApplicationData.hra_remarksL2} ${selectedApplicationData.hra_remarksL3}`
      )
      setHraRemarksL1(selectedApplicationData.hra_remarksL1)
      setHraRemarksL2(selectedApplicationData.hra_remarksL2)
      setHraRemarksL3(selectedApplicationData.hra_remarksL3)
    } else {
      setHraRemarks(selectedApplicationData.hra_remarks)
    }
    setPreviousAnnualLeave(selectedApplicationData.previous_annual_leave)
    setPreviousLeaveDate(selectedApplicationData.previous_leave_date)
    setPreviousLeaveType(selectedApplicationData.previous_leave_type)
    setAccruedLeaveDays(selectedApplicationData.accrued_leave_days)
    setFamilyTicketEntitlement(selectedApplicationData.family_ticket_entitlement)
    setTicketWife(selectedApplicationData.ticket_wife)
    setTicketChildren(selectedApplicationData.ticket_children)
    setTicketEntitlementRoute(selectedApplicationData.ticket_entitlement_route)
    setReleased(selectedApplicationData.released)
    if(selectedApplicationData.released === "Yes") {
      setDisableFamilyTicket(false)
    }
    setHideHraRemarks(!hideHraRemarks)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
    setHideCEORemarks(true)
    setHideCOORemarks(true)
  }

  const handleShowHraRemarks = () => {
    setHideHraRemarks(!hideHraRemarks)
    setHideCEORemarks(true)
    setHideCOORemarks(true)
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
  
  const handleAccruedLeaveDays = (e) => {
    setAccruedLeaveDays(e.target.value)
  }

  const handleFamilyTicketEntitlement = (e) => {
    if(e.target.value === "Yes") {
      setFamilyTicketEntitlement(e.target.value)
      setDisableFamilyTicket(false)
    } else if (e.target.value === "No" || e.target.value === "-") {
      setDisableFamilyTicket(true)
      setFamilyTicketEntitlement("No")
    }
  }

  const handleWife = (e) => {
    setTicketWife(e.target.checked)
  }

  const handleChildren = (e) => {
    setTicketChildren(e.target.checked)
  }

  const handleTicketEntitlementRoute = (e) => {
    setTicketEntitlementRoute(e.target.value)
  }
  
  const handleReleased = (e) => {
    if(e.target.value === "" || e.target.value === "-" || e.target.value === "No") {
      setReleased("No")
    } else if(e.target.value === "Yes") {
      setReleased(e.target.value)
    }
  }

  const handleHraRemarksChange = (e) => {
    if(selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION") {
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
    } else {
      setHraRemarks(e.target.value)
    }
  }

  const handleEditCEORemarks = () => {
    setIsEdit(true)
    setCEORemarks(selectedApplicationData.ceo_remarks)
    setHideCEORemarks(!hideCEORemarks)
    setHideCOORemarks(true)
    setHideHraRemarks(true)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
  }
  const handleShowCEORemarks = () => {
    setHideCEORemarks(!hideCEORemarks)
    setHideCOORemarks(true)
    setHideHraRemarks(true)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
  }

  const handleCEORemarksChange = (e) => {
    setCEORemarks(e.target.value)
  }

  const handleEditCOORemarks = () => {
    setIsEdit(true)
    setCEORemarks(selectedApplicationData.ceo_remarks)
    setHideCOORemarks(!hideCOORemarks)
    setHideCEORemarks(true)
    setHideHraRemarks(true)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
  }
  const handleShowCOORemarks = () => {
    setHideCOORemarks(!hideCOORemarks)
    setHideCEORemarks(true)
    setHideHraRemarks(true)
    setHideSupervisorComments(true)
    setHideProjectManagerComments(true)
  }

  const handleCOORemarksChange = (e) => {
    setCOORemarks(e.target.value)
  }

  const handleSaveCOORemarks = () => {
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
              mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
              leave_type: selectedApplication.application_data.leave_type,
              other_leave: selectedApplication.application_data.other_leave,
              leave_starting_date: selectedApplication.application_data.leave_starting_date,
              leave_ending_date: selectedApplication.application_data.leave_ending_date,
              actual_travel_date: selectedApplication.application_data.actual_travel_date,
              no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
              no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
              preferred_airlines: selectedApplication.application_data.preferred_airlines,
              with_wife: selectedApplication.application_data.with_wife,
              with_children: selectedApplication.application_data.with_children,
              dates_from: selectedApplication.application_data.dates_from,
              dates_to: selectedApplication.application_data.dates_to,
              family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
              employee_signature: selectedApplication.application_data.employee_signature,
              employee_signature_date: selectedApplication.application_data.employee_signature_date,
              immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
              immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
              immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
              immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
              immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
              project_manager: selectedApplication.application_data.project_manager,
              project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
              project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
              project_manager_signature: selectedApplication.application_data.project_manager_signature,
              project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
              previous_leave_date: selectedApplication.application_data.previous_leave_date,
              previous_leave_type: selectedApplication.application_data.previous_leave_type,
              previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
              rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
              passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
              accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
              ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
              released: selectedApplication.application_data.released,
              family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
              ticket_wife: selectedApplication.application_data.ticket_wife,
              ticket_children: selectedApplication.application_data.ticket_children,
              hra_approved: selectedApplication.application_data.hra_approved,
              hra_remarks: selectedApplication.application_data.hra_remarks,
              hra_signature: selectedApplication.application_data.hra_signature,
              hra_sign_date: selectedApplication.application_data.hra_sign_date,
              coo_approved: selectedApplication.application_data.coo_approved,
              coo_remarks: cooRemarks,
              coo_signature: selectedApplication.application_data.coo_signature,
              coo_sign_date: selectedApplication.application_data.coo_sign_date,
              ceo_approved: selectedApplication.application_data.ceo_approved,
              ceo_remarks: selectedApplication.application_data.ceo_remarks,
              ceo_signature: selectedApplication.application_data.ceo_signature,
              ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
              createdBy: selectedApplication.application_data.createdBy,
              createdAt: selectedApplication.application_data.createdAt,
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
                      'Remarks has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Remarks has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerComments(true)
                  setHideSupervisorComments(true)
                  setHideHraRemarks(true)
                  setHideCEORemarks(true)
                  setHideCOORemarks(true)
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

  const handleSaveCEORemarks = () => {
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
              mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
              leave_type: selectedApplication.application_data.leave_type,
              other_leave: selectedApplication.application_data.other_leave,
              leave_starting_date: selectedApplication.application_data.leave_starting_date,
              leave_ending_date: selectedApplication.application_data.leave_ending_date,
              actual_travel_date: selectedApplication.application_data.actual_travel_date,
              no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
              no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
              preferred_airlines: selectedApplication.application_data.preferred_airlines,
              with_wife: selectedApplication.application_data.with_wife,
              with_children: selectedApplication.application_data.with_children,
              dates_from: selectedApplication.application_data.dates_from,
              dates_to: selectedApplication.application_data.dates_to,
              family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
              employee_signature: selectedApplication.application_data.employee_signature,
              employee_signature_date: selectedApplication.application_data.employee_signature_date,
              immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
              immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
              immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
              immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
              immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
              project_manager: selectedApplication.application_data.project_manager,
              project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1,
              project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
              project_manager_signature: selectedApplication.application_data.project_manager_signature,
              project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
              previous_leave_date: selectedApplication.application_data.previous_leave_date,
              previous_leave_type: selectedApplication.application_data.previous_leave_type,
              previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
              rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
              passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
              accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
              ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
              released: selectedApplication.application_data.released,
              family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
              ticket_wife: selectedApplication.application_data.ticket_wife,
              ticket_children: selectedApplication.application_data.ticket_children,
              hra_approved: selectedApplication.application_data.hra_approved,
              hra_remarks: selectedApplication.application_data.hra_remarks,
              hra_signature: selectedApplication.application_data.hra_signature,
              hra_sign_date: selectedApplication.application_data.hra_sign_date,
              coo_approved: selectedApplication.application_data.coo_approved,
              coo_remarks: selectedApplication.application_data.coo_remarks,
              coo_signature: selectedApplication.application_data.coo_signature,
              coo_sign_date: selectedApplication.application_data.coo_sign_date,
              ceo_approved: selectedApplication.application_data.ceo_approved,
              ceo_remarks: ceoRemarks,
              ceo_signature: selectedApplication.application_data.ceo_signature,
              ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
              createdBy: selectedApplication.application_data.createdBy,
              createdAt: selectedApplication.application_data.createdAt,
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
                      'Remarks has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Remarks has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerComments(true)
                  setHideSupervisorComments(true)
                  setHideHraRemarks(true)
                  setHideCEORemarks(true)
                  setHideCOORemarks(true)
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
  
  const handleSaveHraRemarks = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
              {
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
              }
            :
              {
                name: selectedApplication.application_data.name,
                employee_code: selectedApplication.application_data.employee_code,
                nationality: selectedApplication.application_data.nationality,
                department: selectedApplication.application_data.department,
                designation: selectedApplication.application_data.designation,
                joining_date: selectedApplication.application_data.joining_date,
                country_of_destination: selectedApplication.application_data.country_of_destination,
                contact_country_destination: selectedApplication.application_data.contact_country_destination,
                mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
                leave_type: selectedApplication.application_data.leave_type,
                other_leave: selectedApplication.application_data.other_leave,
                leave_starting_date: selectedApplication.application_data.leave_starting_date,
                leave_ending_date: selectedApplication.application_data.leave_ending_date,
                actual_travel_date: selectedApplication.application_data.actual_travel_date,
                no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
                preferred_airlines: selectedApplication.application_data.preferred_airlines,
                with_wife: selectedApplication.application_data.with_wife,
                with_children: selectedApplication.application_data.with_children,
                dates_from: selectedApplication.application_data.dates_from,
                dates_to: selectedApplication.application_data.dates_to,
                family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
                employee_signature: selectedApplication.application_data.employee_signature,
                employee_signature_date: selectedApplication.application_data.employee_signature_date,
                immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
                immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
                immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
                immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
                project_manager: selectedApplication.application_data.project_manager,
                project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1, 
                project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                project_manager_signature: selectedApplication.application_data.project_manager_signature,
                project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                previous_leave_date: previousLeaveDate,
                previous_leave_type: previousLeaveType,
                previous_annual_leave: previousAnnualLeave,
                rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                accrued_leave_days: accruedLeaveDays,
                ticket_entitlement_route: ticketEntitlementRoute,
                released: released,
                family_ticket_entitlement: familyTitcketEntitlement,
                ticket_wife: ticketWife,
                ticket_children: ticketChildren,
                hra_approved: selectedApplication.application_data.hra_approved,
                hra_remarks: hraRemarks,
                hra_signature: selectedApplication.application_data.hra_signature,
                hra_sign_date: selectedApplication.application_data.hra_sign_date,
                coo_approved: selectedApplication.application_data.coo_approved,
                coo_remarks: selectedApplication.application_data.coo_remarks,
                coo_signature: selectedApplication.application_data.coo_signature,
                coo_sign_date: selectedApplication.application_data.coo_sign_date,
                ceo_approved: selectedApplication.application_data.ceo_approved,
                ceo_remarks: selectedApplication.application_data.ceo_remarks,
                ceo_signature: selectedApplication.application_data.ceo_signature,
                ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                createdBy: selectedApplication.application_data.createdBy,
                createdAt: selectedApplication.application_data.createdAt,
                updatedBy: name,
                updatedAt: moment(new Date()).format("MM/DD/YYYY")
              }
            ),
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
                      'Remarks has been updated successfully!',
                      'success'
                    )
                  } else {
                    Swal.fire(
                      'Success!',
                      'Remarks has been added successfully!',
                      'success'
                    )
                  }
                  setHideProjectManagerComments(true)
                  setHideSupervisorComments(true)
                  setHideHraRemarks(true)
                  setHideCEORemarks(true)
                  setHideCOORemarks(true)
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
            application_data: (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
              {
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
              }
            :
              {
                name: selectedApplication.application_data.name,
                employee_code: selectedApplication.application_data.employee_code,
                nationality: selectedApplication.application_data.nationality,
                department: selectedApplication.application_data.department,
                designation: selectedApplication.application_data.designation,
                joining_date: selectedApplication.application_data.joining_date,
                country_of_destination: selectedApplication.application_data.country_of_destination,
                contact_country_destination: selectedApplication.application_data.contact_country_destination,
                mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
                leave_type: selectedApplication.application_data.leave_type,
                other_leave: selectedApplication.application_data.other_leave,
                leave_starting_date: selectedApplication.application_data.leave_starting_date,
                leave_ending_date: selectedApplication.application_data.leave_ending_date,
                actual_travel_date: selectedApplication.application_data.actual_travel_date,
                no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
                preferred_airlines: selectedApplication.application_data.preferred_airlines,
                with_wife: selectedApplication.application_data.with_wife,
                with_children: selectedApplication.application_data.with_children,
                dates_from: selectedApplication.application_data.dates_from,
                dates_to: selectedApplication.application_data.dates_to,
                family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
                employee_signature: selectedApplication.application_data.employee_signature,
                employee_signature_date: selectedApplication.application_data.employee_signature_date,
                immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
                immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
                immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
                immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
                project_manager: selectedApplication.application_data.project_manager,
                project_manager_commentL1: projectManagerCommentsL1, 
                project_manager_commentL2: projectManagerCommentsL2,
                project_manager_signature: selectedApplication.application_data.project_manager_signature,
                project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                previous_leave_date: selectedApplication.application_data.previous_leave_date,
                previous_leave_type: selectedApplication.application_data.previous_leave_type,
                previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
                ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
                released: selectedApplication.application_data.released,
                family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
                ticket_wife: selectedApplication.application_data.ticket_wife,
                ticket_children: selectedApplication.application_data.ticket_children,
                hra_approved: selectedApplication.application_data.hra_approved,
                hra_remarks: selectedApplication.application_data.hra_remarks,
                hra_signature: selectedApplication.application_data.hra_signature,
                hra_sign_date: selectedApplication.application_data.hra_sign_date,
                coo_approved: selectedApplication.application_data.coo_approved,
                coo_remarks: selectedApplication.application_data.coo_remarks,
                coo_signature: selectedApplication.application_data.coo_signature,
                coo_sign_date: selectedApplication.application_data.coo_sign_date,
                ceo_approved: selectedApplication.application_data.ceo_approved,
                ceo_remarks: selectedApplication.application_data.ceo_remarks,
                ceo_signature: selectedApplication.application_data.ceo_signature,
                ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                createdBy: selectedApplication.application_data.createdBy,
                createdAt: selectedApplication.application_data.createdAt,
                updatedBy: name,
                updatedAt: moment(new Date()).format("MM/DD/YYYY")
              }
            ),
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
              setHideCEORemarks(true)
              setHideCOORemarks(true)
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

  const handleSaveSupervisorComments = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
              {
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
              }
            : {
                name: selectedApplication.application_data.name,
                employee_code: selectedApplication.application_data.employee_code,
                nationality: selectedApplication.application_data.nationality,
                department: selectedApplication.application_data.department,
                designation: selectedApplication.application_data.designation,
                joining_date: selectedApplication.application_data.joining_date,
                country_of_destination: selectedApplication.application_data.country_of_destination,
                contact_country_destination: selectedApplication.application_data.contact_country_destination,
                mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
                leave_type: selectedApplication.application_data.leave_type,
                other_leave: selectedApplication.application_data.other_leave,
                leave_starting_date: selectedApplication.application_data.leave_starting_date,
                leave_ending_date: selectedApplication.application_data.leave_ending_date,
                actual_travel_date: selectedApplication.application_data.actual_travel_date,
                no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
                preferred_airlines: selectedApplication.application_data.preferred_airlines,
                with_wife: selectedApplication.application_data.with_wife,
                with_children: selectedApplication.application_data.with_children,
                dates_from: selectedApplication.application_data.dates_from,
                dates_to: selectedApplication.application_data.dates_to,
                family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
                employee_signature: selectedApplication.application_data.employee_signature,
                employee_signature_date: selectedApplication.application_data.employee_signature_date,
                immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                immediate_supervisor_commentL1: supervisorCommentsL1,
                immediate_supervisor_commentL2: supervisorCommentsL2,
                immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
                immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
                project_manager: selectedApplication.application_data.project_manager,
                project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1, 
                project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                project_manager_signature: selectedApplication.application_data.project_manager_signature,
                project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                previous_leave_date: selectedApplication.application_data.previous_leave_date,
                previous_leave_type: selectedApplication.application_data.previous_leave_type,
                previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
                ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
                released: selectedApplication.application_data.released,
                family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
                ticket_wife: selectedApplication.application_data.ticket_wife,
                ticket_children: selectedApplication.application_data.ticket_children,
                hra_approved: selectedApplication.application_data.hra_approved,
                hra_remarks: selectedApplication.application_data.hra_remarks,
                hra_signature: selectedApplication.application_data.hra_signature,
                hra_sign_date: selectedApplication.application_data.hra_sign_date,
                coo_approved: selectedApplication.application_data.coo_approved,
                coo_remarks: selectedApplication.application_data.coo_remarks,
                coo_signature: selectedApplication.application_data.coo_signature,
                coo_sign_date: selectedApplication.application_data.coo_sign_date,
                ceo_approved: selectedApplication.application_data.ceo_approved,
                ceo_remarks: selectedApplication.application_data.ceo_remarks,
                ceo_signature: selectedApplication.application_data.ceo_signature,
                ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                createdBy: selectedApplication.application_data.createdBy,
                createdAt: selectedApplication.application_data.createdAt,
                updatedBy: name,
                updatedAt: moment(new Date()).format("MM/DD/YYYY")
              }
            ),
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
              setHideSupervisorComments(true)
              setHideProjectManagerComments(true)
              setHideCEORemarks(true)
              setHideCOORemarks(true)
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

  const handleApproved = () => {
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    let hraSign = ""
    let hraSignDate = ""
    let projSign = ""
    let projSignDate = ""
    let immSign = ""
    let immSignDate = ""
    let ceoSign = ""
    let ceoSignDate = ""
    let cooSign = ""
    let cooSignDate = ""

    if (selectedApproval.approver_id === hraManager.code) {
      hraSign = hraManager.signature
      hraSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === ceo.code) {
      ceoSign = ceo.signature
      ceoSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === coo.code) {
      cooSign = coo.signature
      cooSignDate = moment(new Date()).format("MM/DD/YYYY")
    } 
    if (selectedApproval.approver_id === immediateSuperior.code) {
      immSign = immediateSuperior.signature
      immSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === projectManager.code) {
      projSign = projectManager.signature
      projSignDate = moment(new Date()).format("MM/DD/YYYY")
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
                application_data: (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
                  {
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
                  }
                :
                  {
                    name: selectedApplication.application_data.name,
                    employee_code: selectedApplication.application_data.employee_code,
                    nationality: selectedApplication.application_data.nationality,
                    department: selectedApplication.application_data.department,
                    designation: selectedApplication.application_data.designation,
                    joining_date: selectedApplication.application_data.joining_date,
                    country_of_destination: selectedApplication.application_data.country_of_destination,
                    contact_country_destination: selectedApplication.application_data.contact_country_destination,
                    mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
                    leave_type: selectedApplication.application_data.leave_type,
                    other_leave: selectedApplication.application_data.other_leave,
                    leave_starting_date: selectedApplication.application_data.leave_starting_date,
                    leave_ending_date: selectedApplication.application_data.leave_ending_date,
                    actual_travel_date: selectedApplication.application_data.actual_travel_date,
                    no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                    no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
                    preferred_airlines: selectedApplication.application_data.preferred_airlines,
                    with_wife: selectedApplication.application_data.with_wife,
                    with_children: selectedApplication.application_data.with_children,
                    dates_from: selectedApplication.application_data.dates_from,
                    dates_to: selectedApplication.application_data.dates_to,
                    family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
                    employee_signature: selectedApplication.application_data.employee_signature,
                    employee_signature_date: selectedApplication.application_data.employee_signature_date,
                    immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                    immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
                    immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
                    immediate_supervisor_signature: (selectedApplication.application_data.immediate_supervisor_signature ? selectedApplication.application_data.immediate_supervisor_signature : immSign),
                    immediate_supervisor_sign_date: (selectedApplication.application_data.immediate_supervisor_sign_date ? selectedApplication.application_data.immediate_supervisor_sign_date : immSignDate),
                    project_manager: selectedApplication.application_data.project_manager,
                    project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1, 
                    project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                    project_manager_signature: (selectedApplication.application_data.project_manager_signature ? selectedApplication.application_data.project_manager_signature : projSign),
                    project_manager_sign_date: (selectedApplication.application_data.project_manager_sign_date ? selectedApplication.application_data.project_manager_sign_date : projSignDate),
                    previous_leave_date: selectedApplication.application_data.previous_leave_date,
                    previous_leave_type: selectedApplication.application_data.previous_leave_type,
                    previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                    rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                    passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                    accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
                    ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
                    released: selectedApplication.application_data.released,
                    family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
                    ticket_wife: selectedApplication.application_data.ticket_wife,
                    ticket_children: selectedApplication.application_data.ticket_children,
                    hra_approved: (data.data.status === "APPROVED" && data.data.approver_id === hraManager.code ? true : selectedApplication.application_data.hra_approved),
                    hra_remarks: selectedApplication.application_data.hra_remarks,
                    hra_signature: (selectedApplication.application_data.hra_signature ? selectedApplication.application_data.hra_signature : hraSign),
                    hra_sign_date: (selectedApplication.application_data.hra_sign_date ? selectedApplication.application_data.hra_sign_date : hraSignDate),
                    coo_approved: (data.data.status === "APPROVED" && data.data.approver_id === coo.code ? true : selectedApplication.application_data.coo_approved),
                    coo_remarks: selectedApplication.application_data.coo_remarks,
                    coo_signature: (selectedApplication.application_data.coo_signature ? selectedApplication.application_data.coo_signature : cooSign),
                    coo_sign_date: (selectedApplication.application_data.coo_sign_date ? selectedApplication.application_data.coo_sign_date : cooSignDate),
                    ceo_approved: (data.data.status === "APPROVED" && data.data.approver_id === ceo.code ? true : selectedApplication.application_data.ceo_approved),
                    ceo_remarks: selectedApplication.application_data.ceo_remarks,
                    ceo_signature: (selectedApplication.application_data.ceo_signature ? selectedApplication.application_data.ceo_signature : ceoSign),
                    ceo_sign_date: (selectedApplication.application_data.ceo_sign_date ? selectedApplication.application_data.ceo_sign_date : ceoSignDate),
                    createdBy: selectedApplication.application_data.createdBy,
                    createdAt: selectedApplication.application_data.createdAt,
                    updatedBy: name,
                    updatedAt: moment(new Date()).format("MM/DD/YYYY")
                  }
                ),
                status: (
                  (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
                      (data.data.status === "APPROVED" && data.data.approver_id === hraManager.code ) &&
                      (selectedApplication.application_data.project_manager_signature || projSign) &&	                    
                      (selectedApplication.application_data.supervisor_signature || immSign)
                    :
                      data.data.status === "APPROVED" &&
                      (selectedApplication.application_data.immediate_supervisor_signature || immSign) &&
                      (selectedApplication.application_data.project_manager_signature || projSign) &&
                      (selectedApplication.application_data.hra_signature || hraSign) &&
                      (selectedApplication.application_data.coo_signature || cooSign) &&
                      (selectedApplication.application_data.ceo_signature || ceoSign)
                  )
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
                application_data: (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
                  {
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
                  }
                :
                  {
                    name: selectedApplication.application_data.name,
                    employee_code: selectedApplication.application_data.employee_code,
                    nationality: selectedApplication.application_data.nationality,
                    department: selectedApplication.application_data.department,
                    designation: selectedApplication.application_data.designation,
                    joining_date: selectedApplication.application_data.joining_date,
                    country_of_destination: selectedApplication.application_data.country_of_destination,
                    contact_country_destination: selectedApplication.application_data.contact_country_destination,
                    mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
                    leave_type: selectedApplication.application_data.leave_type,
                    other_leave: selectedApplication.application_data.other_leave,
                    leave_starting_date: selectedApplication.application_data.leave_starting_date,
                    leave_ending_date: selectedApplication.application_data.leave_ending_date,
                    actual_travel_date: selectedApplication.application_data.actual_travel_date,
                    no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                    no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
                    preferred_airlines: selectedApplication.application_data.preferred_airlines,
                    with_wife: selectedApplication.application_data.with_wife,
                    with_children: selectedApplication.application_data.with_children,
                    dates_from: selectedApplication.application_data.dates_from,
                    dates_to: selectedApplication.application_data.dates_to,
                    family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
                    employee_signature: selectedApplication.application_data.employee_signature,
                    employee_signature_date: selectedApplication.application_data.employee_signature_date,
                    immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                    immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
                    immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
                    immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
                    immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
                    project_manager: selectedApplication.application_data.project_manager,
                    project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1, 
                    project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                    project_manager_signature: selectedApplication.application_data.project_manager_signature,
                    project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                    previous_leave_date: selectedApplication.application_data.previous_leave_date,
                    previous_leave_type: selectedApplication.application_data.previous_leave_type,
                    previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                    rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                    passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                    accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
                    ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
                    released: selectedApplication.application_data.released,
                    family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
                    ticket_wife: selectedApplication.application_data.ticket_wife,
                    ticket_children: selectedApplication.application_data.ticket_children,
                    hra_approved: selectedApplication.application_data.hra_approved,
                    hra_remarks: selectedApplication.application_data.hra_remarks,
                    hra_signature: selectedApplication.application_data.hra_signature,
                    hra_sign_date: selectedApplication.application_data.hra_sign_date,
                    coo_approved: selectedApplication.application_data.coo_approved,
                    coo_remarks: selectedApplication.application_data.coo_remarks,
                    coo_signature: selectedApplication.application_data.coo_signature,
                    coo_sign_date: selectedApplication.application_data.coo_sign_date,
                    ceo_approved: selectedApplication.application_data.ceo_approved,
                    ceo_remarks: selectedApplication.application_data.ceo_remarks,
                    ceo_signature: selectedApplication.application_data.ceo_signature,
                    ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                    createdBy: selectedApplication.application_data.createdBy,
                    createdAt: selectedApplication.application_data.createdAt,
                    updatedBy: name,
                    updatedAt: moment(new Date()).format("MM/DD/YYYY")
                  }
                ),
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
                application_data: (selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
                  {
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
                  }
                  :
                  {
                    name: selectedApplication.application_data.name,
                    employee_code: selectedApplication.application_data.employee_code,
                    nationality: selectedApplication.application_data.nationality,
                    department: selectedApplication.application_data.department,
                    designation: selectedApplication.application_data.designation,
                    joining_date: selectedApplication.application_data.joining_date,
                    country_of_destination: selectedApplication.application_data.country_of_destination,
                    contact_country_destination: selectedApplication.application_data.contact_country_destination,
                    mobile_no_qatar: selectedApplication.application_data.mobile_no_qatar,
                    leave_type: selectedApplication.application_data.leave_type,
                    other_leave: selectedApplication.application_data.other_leave,
                    leave_starting_date: selectedApplication.application_data.leave_starting_date,
                    leave_ending_date: selectedApplication.application_data.leave_ending_date,
                    actual_travel_date: selectedApplication.application_data.actual_travel_date,
                    no_of_days_applied: selectedApplication.application_data.no_of_days_applied,
                    no_of_days_to_encashed: selectedApplication.application_data.no_of_days_to_encashed,
                    preferred_airlines: selectedApplication.application_data.preferred_airlines,
                    with_wife: selectedApplication.application_data.with_wife,
                    with_children: selectedApplication.application_data.with_children,
                    dates_from: selectedApplication.application_data.dates_from,
                    dates_to: selectedApplication.application_data.dates_to,
                    family_preferred_airlines: selectedApplication.application_data.family_preferred_airlines,
                    employee_signature: selectedApplication.application_data.employee_signature,
                    employee_signature_date: selectedApplication.application_data.employee_signature_date,
                    immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                    immediate_supervisor_commentL1: selectedApplication.application_data.immediate_supervisor_commentL1,
                    immediate_supervisor_commentL2: selectedApplication.application_data.immediate_supervisor_commentL2,
                    immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature,
                    immediate_supervisor_sign_date: selectedApplication.application_data.immediate_supervisor_sign_date,
                    project_manager: selectedApplication.application_data.project_manager,
                    project_manager_commentL1: selectedApplication.application_data.project_manager_commentL1, 
                    project_manager_commentL2: selectedApplication.application_data.project_manager_commentL2,
                    project_manager_signature: selectedApplication.application_data.project_manager_signature,
                    project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                    previous_leave_date: selectedApplication.application_data.previous_leave_date,
                    previous_leave_type: selectedApplication.application_data.previous_leave_type,
                    previous_annual_leave: selectedApplication.application_data.previous_annual_leave,
                    rp_expiry_date: selectedApplication.application_data.rp_expiry_date,
                    passport_expiry_date: selectedApplication.application_data.passport_expiry_date,
                    accrued_leave_days: selectedApplication.application_data.accrued_leave_days,
                    ticket_entitlement_route: selectedApplication.application_data.ticket_entitlement_route,
                    released: selectedApplication.application_data.released,
                    family_ticket_entitlement: selectedApplication.application_data.family_ticket_entitlement,
                    ticket_wife: selectedApplication.application_data.ticket_wife,
                    ticket_children: selectedApplication.application_data.ticket_children,
                    hra_approved: selectedApplication.application_data.hra_approved,
                    hra_remarks: selectedApplication.application_data.hra_remarks,
                    hra_signature: selectedApplication.application_data.hra_signature,
                    hra_sign_date: selectedApplication.application_data.hra_sign_date,
                    coo_approved: selectedApplication.application_data.coo_approved,
                    coo_remarks: selectedApplication.application_data.coo_remarks,
                    coo_signature: selectedApplication.application_data.coo_signature,
                    coo_sign_date: selectedApplication.application_data.coo_sign_date,
                    ceo_approved: selectedApplication.application_data.ceo_approved,
                    ceo_remarks: selectedApplication.application_data.ceo_remarks,
                    ceo_signature: selectedApplication.application_data.ceo_signature,
                    ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                    createdBy: selectedApplication.application_data.createdBy,
                    createdAt: selectedApplication.application_data.createdAt,
                    updatedBy: name,
                    updatedAt: moment(new Date()).format("MM/DD/YYYY")
                  }
                ),
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
            coo={coo}
            ceo={ceo}
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
            disableFamilyTicket={disableFamilyTicket}
            handleFamilyTicketEntitlement={handleFamilyTicketEntitlement}
            handleWife={handleWife}
            handleChildren={handleChildren}
            handleTicketEntitlementRoute={handleTicketEntitlementRoute}
            handleReleased={handleReleased}
            handleAccruedLeaveDays={handleAccruedLeaveDays}
            previousLeaveType={previousLeaveType}
            familyTitcketEntitlement={familyTitcketEntitlement}
            released={released}
            handleEditCEORemarks={handleEditCEORemarks}
            handleShowCEORemarks={handleShowCEORemarks}
            hideCEORemarks={hideCEORemarks}
            handleCEORemarksChange={handleCEORemarksChange}
            handleSaveCEORemarks={handleSaveCEORemarks}
            handleEditCOORemarks={handleEditCOORemarks}
            handleShowCOORemarks={handleShowCOORemarks}
            hideCOORemarks={hideCOORemarks}
            handleCOORemarksChange={handleCOORemarksChange}
            handleSaveCOORemarks={handleSaveCOORemarks}
          />
        </div>
      </div>
      <Sidebar />
      <div className="main-panel">
        <Topbar />
        {/* <div className="container"> */}
        <div className="px-5">
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
            </div>
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
    </React.Fragment>
  )
})

export default LeaveApplicationApproval;