import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../../Layout/Sidebar'
import Topbar from '../../../Layout/Topbar'
import moment from 'moment'
import { Card, CardTitle, CardSubtitle, Row, Col, CardBody } from 'reactstrap';
import Swal from 'sweetalert2'
import LeaveApprovalTable from './LeaveApprovalTable'
import LeaveApprovalForm from './LeaveApprovalForm'
import { CredsContext } from '../../../context/Context'

const LeaveApproval = React.memo(props => {
  const { empCode, accessLevel, name, isLoggedIn, username } = useContext(CredsContext)

  const [showForm, setShowForm] = useState(false)
  const [isReady, setIsReady] = useState(false)
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
        let approved = []
        let denied = []
        let review = []
        let pending = []
        data.map(indivData => {
          if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.approver_id) {
            if (indivData.application_type === "LEAVE_STAFF" || indivData.application_type === "LEAVE_WORKER") {
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
        setApprovals([...pending, ...review, ...denied, ...approved])
        setForApproval(pending.length)
        setApproved(approved.length)
        setDenied(denied.length)
        setReview(review.length)
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
    setShowForm(!showForm)
  }

  const handleRefresh = () => {
    setIsReady(false)
    setShowForm(false)
  }

  const handleApprove = () => {
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    let acctSign = ""
    let acctSignDate = ""
    let ceoSign = ""
    let ceoSignDate = ""
    let cooSign = ""
    let cooSignDate = ""
    let logisticsSign = ""
    let logisticsSignDate = ""
    let hraSign = ""
    let hraSignDate = ""
    let projSign = ""
    let projSignDate = ""
    let immSign = ""
    let immSignDate = ""
    if (selectedApproval.approver_id === accounting.code) {
      acctSign = accounting.signature
      acctSignDate = moment(new Date()).format("MM/DD/YYYY")
    } 
    if (selectedApproval.approver_id === ceo.code) {
      ceoSign = ceo.signature
      ceoSignDate = moment(new Date()).format("MM/DD/YYYY")
    }
    if (selectedApproval.approver_id === coo.code) {
      cooSign = coo.signature
      cooSignDate = moment(new Date()).format("MM/DD/YYYY")
    } 
    if (selectedApproval.approver_id === logisticsOfficer.code) {
      logisticsSign = logisticsOfficer.signature
      logisticsSignDate = moment(new Date()).format("MM/DD/YYYY")
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
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("YYYY-MM-DD"),
            status: "APPROVED"
          })
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire(
              'Updated!',
              'Application has been Approved.',
              'success'
            )
            fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_code: selectedApplication.employee_code,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  project: selectedApplication.application_data.project,
                  position: selectedApplication.application_data.position,
                  project_manager: selectedApplication.application_data.project_manager,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  departure_date: selectedApplication.application_data.departure_date,
                  return_date: selectedApplication.application_data.return_date,
                  leave_type: selectedApplication.application_data.leave_type,
                  contact_number: selectedApplication.application_data.contact_number,
                  handover_briefing_to_successor: selectedApplication.application_data.handover_briefing_to_successor,
                  handover_briefing_to_successor_employee_name: selectedApplication.application_data.handover_briefing_to_successor_employee_name,
                  handover_briefing_to_successor_employee_code: "",
                  handover_documents: selectedApplication.application_data.handover_documents,
                  handover_documents_employee_name: selectedApplication.application_data.handover_documents_employee_name,
                  handover_documents_employee_code: selectedApplication.application_data.handover_documents_employee_code,
                  items_issued: selectedApplication.application_data.items_issued,
                  items_issued2: selectedApplication.application_data.items_issued2,
                  items_issued3: selectedApplication.application_data.items_issued3,
                  items_issued4: selectedApplication.application_data.items_issued4,
                  remarks: selectedApplication.application_data.remarks,
                  remarks2: selectedApplication.application_data.remarks2,
                  remarks3: selectedApplication.application_data.remarks3,
                  remarks4: selectedApplication.application_data.remarks4,
                  logistics_officer_sign_date: (selectedApplication.application_data.logistics_officer_sign_date ? selectedApplication.application_data.logistics_officer_sign_date : logisticsSignDate),
                  immidiate_supervisor_sign_date: (selectedApplication.application_data.immidiate_supervisor_sign_date ? selectedApplication.application_data.immidiate_supervisor_sign_date : immSignDate),
                  project_manager_sign_date: (selectedApplication.application_data.project_manager_sign_date ? selectedApplication.application_data.project_manager_sign_date : projSignDate),
                  accounting_dept_sign_date: (selectedApplication.application_data.accounting_dept_sign_date ? selectedApplication.application_data.accounting_dept_sign_date : acctSignDate),
                  hr_manager_sign_date: (selectedApplication.application_data.hr_manager_sign_date ? selectedApplication.application_data.hr_manager_sign_date : hraSignDate),
                  coo_sign_date: (selectedApplication.application_data.coo_sign_date ? selectedApplication.application_data.coo_sign_date : cooSignDate),
                  ceo_sign_date: (selectedApplication.application_data.ceo_sign_date ? selectedApplication.application_data.ceo_sign_date : ceoSignDate),
                  logistics_officer_signature_and_date: (selectedApplication.application_data.logistics_officer_signature_and_date ? selectedApplication.application_data.logistics_officer_signature_and_date : logisticsSign),
                  immidiate_supervisor_manager_signature_and_date: (selectedApplication.application_data.immidiate_supervisor_manager_signature_and_date ? selectedApplication.application_data.immidiate_supervisor_manager_signature_and_date : immSign),
                  project_manager_signature_and_date: (selectedApplication.application_data.project_manager_signature_and_date ? selectedApplication.application_data.project_manager_signature_and_date : projSign),
                  accounting_department_signature_and_date: (selectedApplication.application_data.accounting_department_signature_and_date ? selectedApplication.application_data.accounting_department_signature_and_date : acctSign),
                  receive_ticket: selectedApplication.application_data.receive_ticket,
                  receive_settlement: selectedApplication.application_data.receive_settlement,
                  receive_others: selectedApplication.application_data.receive_others,
                  receive_others_remarks: selectedApplication.application_data.receive_others_remarks,
                  leave_from: selectedApplication.application_data.leave_from,
                  leave_to: selectedApplication.application_data.leave_to,
                  be_back_on: selectedApplication.application_data.be_back_on,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  airport_transportation_departure_date: selectedApplication.application_data.airport_transportation_departure_date,
                  airport_transportation_arrival_date: selectedApplication.application_data.airport_transportation_arrival_date,
                  airport_transportation_accommodation: selectedApplication.application_data.airport_transportation_accommodation,
                  airport_transportation_mobile_number: selectedApplication.application_data.airport_transportation_mobile_number,
                  hr_manager_signature_and_date: (selectedApplication.application_data.hr_manager_signature_and_date ? selectedApplication.application_data.hr_manager_signature_and_date : hraSign),
                  coo_signature_and_date: (selectedApplication.application_data.coo_signature_and_date ? selectedApplication.application_data.coo_signature_and_date : cooSign),
                  ceo_signature_and_date: (selectedApplication.application_data.ceo_signature_and_date ? selectedApplication.application_data.ceo_signature_and_date : ceoSign),
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
                  updatedby: selectedApplication.application_data.updatedBy,
                  updatedat: selectedApplication.application_data.updatedAt
                },
                status: (
                    selectedApplication.application_data.project_manager && selectedApplication.application_data.immediate_supervisor &&
                    (selectedApplication.application_data.logistics_officer_signature_and_date || logisticsSign) &&
                    (selectedApplication.application_data.immidiate_supervisor_manager_signature_and_date || immSign) &&
                    (selectedApplication.application_data.project_manager_signature_and_date || projSign) &&
                    (selectedApplication.application_data.accounting_department_signature_and_date || acctSign) &&
                    (selectedApplication.application_data.hr_manager_signature_and_date || hraSign) &&
                    (selectedApplication.application_data.coo_signature_and_date || cooSign) &&
                    (selectedApplication.application_data.ceo_signature_and_date || ceoSign)
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
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
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
                employee_code: selectedApplication.employee_code,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  project: selectedApplication.application_data.project,
                  position: selectedApplication.application_data.position,
                  project_manager: selectedApplication.application_data.project_manager,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  departure_date: selectedApplication.application_data.departure_date,
                  return_date: selectedApplication.application_data.return_date,
                  leave_type: selectedApplication.application_data.leave_type,
                  contact_number: selectedApplication.application_data.contact_number,
                  handover_briefing_to_successor: selectedApplication.application_data.handover_briefing_to_successor,
                  handover_briefing_to_successor_employee_name: selectedApplication.application_data.handover_briefing_to_successor_employee_name,
                  handover_briefing_to_successor_employee_code: "",
                  handover_documents: selectedApplication.application_data.handover_documents,
                  handover_documents_employee_name: selectedApplication.application_data.handover_documents_employee_name,
                  handover_documents_employee_code: selectedApplication.application_data.handover_documents_employee_code,
                  items_issued: selectedApplication.application_data.items_issued,
                  items_issued2: selectedApplication.application_data.items_issued2,
                  items_issued3: selectedApplication.application_data.items_issued3,
                  items_issued4: selectedApplication.application_data.items_issued4,
                  remarks: selectedApplication.application_data.remarks,
                  remarks2: selectedApplication.application_data.remarks2,
                  remarks3: selectedApplication.application_data.remarks3,
                  remarks4: selectedApplication.application_data.remarks4,
                  logistics_officer_sign_date: selectedApplication.application_data.logistics_officer_sign_date,
                  immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
                  project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                  accounting_dept_sign_date: selectedApplication.application_data.accounting_dept_sign_date,
                  hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
                  coo_sign_date: selectedApplication.application_data.coo_sign_date,
                  ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                  logistics_officer_signature_and_date: selectedApplication.application_data.logistics_officer_signature_and_date,
                  immidiate_supervisor_manager_signature_and_date: selectedApplication.application_data.immidiate_supervisor_manager_signature_and_date,
                  project_manager_signature_and_date: selectedApplication.application_data.project_manager_signature_and_date,
                  accounting_department_signature_and_date: selectedApplication.application_data.accounting_department_signature_and_date,
                  receive_ticket: selectedApplication.application_data.receive_ticket,
                  receive_settlement: selectedApplication.application_data.receive_settlement,
                  receive_others: selectedApplication.application_data.receive_others,
                  receive_others_remarks: selectedApplication.application_data.receive_others_remarks,
                  leave_from: selectedApplication.application_data.leave_from,
                  leave_to: selectedApplication.application_data.leave_to,
                  be_back_on: selectedApplication.application_data.be_back_on,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  airport_transportation_departure_date: selectedApplication.application_data.airport_transportation_departure_date,
                  airport_transportation_arrival_date: selectedApplication.application_data.airport_transportation_arrival_date,
                  airport_transportation_accommodation: selectedApplication.application_data.airport_transportation_accommodation,
                  airport_transportation_mobile_number: selectedApplication.application_data.airport_transportation_mobile_number,
                  hr_manager_signature_and_date: selectedApplication.application_data.hr_manager_signature_and_date,
                  coo_signature_and_date: selectedApplication.application_data.coo_signature_and_date,
                  ceo_signature_and_date: selectedApplication.application_data.ceo_signature_and_date,
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
                  updatedby: selectedApplication.application_data.updatedBy,
                  updatedat: selectedApplication.application_data.updatedAt
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
                employee_code: selectedApplication.employee_code,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  project: selectedApplication.application_data.project,
                  position: selectedApplication.application_data.position,
                  project_manager: selectedApplication.application_data.project_manager,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  departure_date: selectedApplication.application_data.departure_date,
                  return_date: selectedApplication.application_data.return_date,
                  leave_type: selectedApplication.application_data.leave_type,
                  contact_number: selectedApplication.application_data.contact_number,
                  handover_briefing_to_successor: selectedApplication.application_data.handover_briefing_to_successor,
                  handover_briefing_to_successor_employee_name: selectedApplication.application_data.handover_briefing_to_successor_employee_name,
                  handover_briefing_to_successor_employee_code: "",
                  handover_documents: selectedApplication.application_data.handover_documents,
                  handover_documents_employee_name: selectedApplication.application_data.handover_documents_employee_name,
                  handover_documents_employee_code: selectedApplication.application_data.handover_documents_employee_code,
                  items_issued: selectedApplication.application_data.items_issued,
                  items_issued2: selectedApplication.application_data.items_issued2,
                  items_issued3: selectedApplication.application_data.items_issued3,
                  items_issued4: selectedApplication.application_data.items_issued4,
                  remarks: selectedApplication.application_data.remarks,
                  remarks2: selectedApplication.application_data.remarks2,
                  remarks3: selectedApplication.application_data.remarks3,
                  remarks4: selectedApplication.application_data.remarks4,
                  logistics_officer_sign_date: selectedApplication.application_data.logistics_officer_sign_date,
                  immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
                  project_manager_sign_date: selectedApplication.application_data.project_manager_sign_date,
                  accounting_dept_sign_date: selectedApplication.application_data.accounting_dept_sign_date,
                  hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
                  coo_sign_date: selectedApplication.application_data.coo_sign_date,
                  ceo_sign_date: selectedApplication.application_data.ceo_sign_date,
                  logistics_officer_signature_and_date: selectedApplication.application_data.logistics_officer_signature_and_date,
                  immidiate_supervisor_manager_signature_and_date: selectedApplication.application_data.immidiate_supervisor_manager_signature_and_date,
                  project_manager_signature_and_date: selectedApplication.application_data.project_manager_signature_and_date,
                  accounting_department_signature_and_date: selectedApplication.application_data.accounting_department_signature_and_date,
                  receive_ticket: selectedApplication.application_data.receive_ticket,
                  receive_settlement: selectedApplication.application_data.receive_settlement,
                  receive_others: selectedApplication.application_data.receive_others,
                  receive_others_remarks: selectedApplication.application_data.receive_others_remarks,
                  leave_from: selectedApplication.application_data.leave_from,
                  leave_to: selectedApplication.application_data.leave_to,
                  be_back_on: selectedApplication.application_data.be_back_on,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  airport_transportation_departure_date: selectedApplication.application_data.airport_transportation_departure_date,
                  airport_transportation_arrival_date: selectedApplication.application_data.airport_transportation_arrival_date,
                  airport_transportation_accommodation: selectedApplication.application_data.airport_transportation_accommodation,
                  airport_transportation_mobile_number: selectedApplication.application_data.airport_transportation_mobile_number,
                  hr_manager_signature_and_date: selectedApplication.application_data.hr_manager_signature_and_date,
                  coo_signature_and_date: selectedApplication.application_data.coo_signature_and_date,
                  ceo_signature_and_date: selectedApplication.application_data.ceo_signature_and_date,
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
                  updatedby: selectedApplication.application_data.updatedBy,
                  updatedat: selectedApplication.application_data.updatedAt
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

  const handleApproveWorker = () => {
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    let acctSign = ""
    let acctSignDate = ""
    let hraSign = ""
    let hraSignDate = ""
    let immSign = ""
    let immSignDate = ""
    if (selectedApproval.approver_id === accounting.code) {
      acctSign = accounting.signature
      acctSignDate = moment(new Date()).format("MM/DD/YYYY")
    } else if (selectedApproval.approver_id === hraManager.code) {
      hraSign = hraManager.signature
      hraSignDate = moment(new Date()).format("MM/DD/YYYY")
    } else if (selectedApproval.approver_id === immediateSuperior.code) {
      immSign = immediateSuperior.signature
      immSignDate = moment(new Date()).format("MM/DD/YYYY")
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
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("YYYY-MM-DD"),
            status: "APPROVED"
          })
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire(
              'Updated!',
              'Application has been Approved.',
              'success'
            )
            fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
              body: JSON.stringify({
                application_form_code: selectedApplication.application_form_code,
                employee_code: selectedApplication.employee_code,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  project: selectedApplication.application_data.project,
                  position: selectedApplication.application_data.position,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  departure_date: selectedApplication.application_data.departure_date,
                  return_date: selectedApplication.application_data.return_date,
                  leave_type: selectedApplication.application_data.leave_type,
                  contact_number: selectedApplication.application_data.contact_number,
                  items_issued_type: selectedApplication.application_data.items_issued_type,
                  items_issued_others_remarks: selectedApplication.application_data.items_issued_others_remarks,
                  signature_and_date: selectedApplication.application_data.employee_signature_date,
                  immidiate_supervisor_manager_signature: (selectedApplication.application_data.immidiate_supervisor_manager_signature ? selectedApplication.application_data.immidiate_supervisor_manager_signature : immSign),
                  immidiate_supervisor_sign_date: (selectedApplication.application_data.immidiate_supervisor_sign_date ? selectedApplication.application_data.immidiate_supervisor_sign_date : immSignDate),
                  accounting_department_signature: (selectedApplication.application_data.accounting_department_signature ? selectedApplication.application_data.accounting_department_signature : acctSign),
                  accounting_dept_sign_date: (selectedApplication.application_data.accounting_dept_sign_date ? selectedApplication.application_data.accounting_dept_sign_date : acctSignDate),
                  hr_manager_signature: (selectedApplication.application_data.hr_manager_signature ? selectedApplication.application_data.hr_manager_signature : hraSign),
                  hr_manager_sign_date: (selectedApplication.application_data.hr_manager_sign_date ? selectedApplication.application_data.hr_manager_sign_date : hraSignDate),
                  receive_passport: selectedApplication.application_data.receive_passport,
                  receive_ticket: selectedApplication.application_data.receive_ticket,
                  receive_settlement: selectedApplication.application_data.receive_settlement,
                  receive_others: selectedApplication.application_data.receive_others,
                  receive_others_remarks: selectedApplication.application_data.receive_others_remarks,
                  leave_from: selectedApplication.application_data.leave_from,
                  leave_to: selectedApplication.application_data.leave_to,
                  be_back_on: selectedApplication.application_data.be_back_on,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
                  createdby: selectedApplication.application_data.createdby,
                  createdat: selectedApplication.application_data.createdat,
                  updatedby: name,
                  updatedat: moment(new Date()).format("MM/DD/YYYY")
                },
                status: (
                    selectedApplication.application_data.project_manager && selectedApplication.application_data.immediate_supervisor &&
                    (selectedApplication.application_data.immidiate_supervisor_manager_signature_and_date || immSign) &&
                    (selectedApplication.application_data.accounting_department_signature_and_date || acctSign) &&
                    (selectedApplication.application_data.hr_manager_signature_and_date || hraSign)
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

  const handleDenyWorker = () => {
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
          'Application has been tagged for Denied.',
          'success'
        )
        fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            collateid: selectedApproval.collateid,
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
                employee_code: selectedApplication.employee_code,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  project: selectedApplication.application_data.project,
                  position: selectedApplication.application_data.position,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  departure_date: selectedApplication.application_data.departure_date,
                  return_date: selectedApplication.application_data.return_date,
                  leave_type: selectedApplication.application_data.leave_type,
                  contact_number: selectedApplication.application_data.contact_number,
                  items_issued_type: selectedApplication.application_data.items_issued_type,
                  items_issued_others_remarks: selectedApplication.application_data.items_issued_others_remarks,
                  signature_and_date: selectedApplication.application_data.employee_signature_date,
                  immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature_and_date,
                  immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
                  accounting_department_signature: selectedApplication.application_data.accounting_department_signature_and_date,
                  accounting_dept_sign_date: selectedApplication.application_data.accounting_dept_sign_date,
                  hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
                  hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
                  receive_passport: selectedApplication.application_data.receive_passport,
                  receive_ticket: selectedApplication.application_data.receive_ticket,
                  receive_settlement: selectedApplication.application_data.receive_settlement,
                  receive_others: selectedApplication.application_data.receive_others,
                  receive_others_remarks: selectedApplication.application_data.receive_others_remarks,
                  leave_from: selectedApplication.application_data.leave_from,
                  leave_to: selectedApplication.application_data.leave_to,
                  be_back_on: selectedApplication.application_data.be_back_on,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
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

  const handleReviewWorker = () => {
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
                employee_code: selectedApplication.employee_code,
                application_data: {
                  name: selectedApplication.application_data.name,
                  employee_code: selectedApplication.application_data.employee_code,
                  project: selectedApplication.application_data.project,
                  position: selectedApplication.application_data.position,
                  immediate_supervisor: selectedApplication.application_data.immediate_supervisor,
                  departure_date: selectedApplication.application_data.departure_date,
                  return_date: selectedApplication.application_data.return_date,
                  leave_type: selectedApplication.application_data.leave_type,
                  contact_number: selectedApplication.application_data.contact_number,
                  items_issued_type: selectedApplication.application_data.items_issued_type,
                  items_issued_others_remarks: selectedApplication.application_data.items_issued_others_remarks,
                  signature_and_date: selectedApplication.application_data.employee_signature_date,
                  immediate_supervisor_signature: selectedApplication.application_data.immediate_supervisor_signature_and_date,
                  immidiate_supervisor_sign_date: selectedApplication.application_data.immidiate_supervisor_sign_date,
                  accounting_department_signature: selectedApplication.application_data.accounting_department_signature_and_date,
                  accounting_dept_sign_date: selectedApplication.application_data.accounting_dept_sign_date,
                  hr_manager_signature: selectedApplication.application_data.hr_manager_signature,
                  hr_manager_sign_date: selectedApplication.application_data.hr_manager_sign_date,
                  receive_passport: selectedApplication.application_data.receive_passport,
                  receive_ticket: selectedApplication.application_data.receive_ticket,
                  receive_settlement: selectedApplication.application_data.receive_settlement,
                  receive_others: selectedApplication.application_data.receive_others,
                  receive_others_remarks: selectedApplication.application_data.receive_others_remarks,
                  leave_from: selectedApplication.application_data.leave_from,
                  leave_to: selectedApplication.application_data.leave_to,
                  be_back_on: selectedApplication.application_data.be_back_on,
                  employee_signature: selectedApplication.application_data.employee_signature,
                  employee_signature_date: selectedApplication.application_data.employee_signature_date,
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
          <LeaveApprovalForm
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
            handleReviewWorker={handleReviewWorker}
            handleDenyWorker={handleDenyWorker}
            handleApproveWorker={handleApproveWorker}
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
                    <LeaveApprovalTable
                      data={approvals}
                      handleShowForm={handleShowForm}
                      refetch={refetch}
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


export default LeaveApproval;