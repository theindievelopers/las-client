import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Topbar from '../../Layout/Topbar'
import Axios from 'axios'
import moment from 'moment'
import { Card, CardTitle, CardText, Row, Col, CardBody } from 'reactstrap';
import Swal from 'sweetalert2'
import ApprovalTable from './ApprovalsTable'
import ApprovalForm from './ApprovalForm'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import StaffPDF from '../../components/PDForms/StaffPDF'
import { useImperativeHandle } from 'react'

const Approvals = React.memo(props => {
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [approvals, setApprovals] = useState([])
  const [employess, setEmployees] = useState([])
  const [approversData, setApproversData] = useState([])
  const [leaves, setLeaves] = useState([])
  const [selectedApproval, setSelectedApproval] = useState([])
  const [selectedLeave, setSelectedLeave] = useState([])
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
  const [approvers, setApprovers] = useState({})
  const [accountingSign, setAccountingSign] = useState("")
  const [ceoSign, setCeoSign] = useState("")
  const [cooSign, setCooSign] = useState("")
  const [logisticsOfficerSign, setLogisticsOfficerSign] = useState("")
  const [hraManagerSign, setHraManagerSign] = useState("")

  useEffect(() => {
    if (!sessionStorage.isLoggedIn) {
      window.location.replace('#/login')
    }
  }, [])

  useEffect(() => {
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
        let uniqueApproversID = []
        data.map(indivData => {
          if(uniqueApproversID.includes(indivData.approver_id)){
            console.log("all ready there")
          } else {
            uniqueApproversID.push(indivData.approver_id)
            console.log(uniqueApproversID)
          }
          if (JSON.parse(sessionStorage.accessLevel) === 1 || JSON.parse(sessionStorage.accessLevel) === 2 || JSON.parse(sessionStorage.empCode) === indivData.approver_id) {
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
        })
        setApprovals(allData)
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
        setLeaves(allData)
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
              } else if (inidvData.code === approverCode.ceo) {
                ceo.push(inidvData)
              } else if (inidvData.code === approverCode.coo) {
                coo.push(inidvData)
              } else if (inidvData.code === approverCode.hra_manager) {
                hraManager.push(inidvData)
              } else if (inidvData.code === approverCode.logistics_officer) {
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
    console.log(data)
    console.log(leaves)
    setSelectedApproval(data)
    setAccountingSign(data.signature)
    let projectManID = ""
    let immediateSupID = ""
    leaves.map(indivLeave => {
      if (indivLeave.collateid === data.collateid) {
        console.log(indivLeave.application_data)
        setSelectedLeave(indivLeave)
        setSelectedApplicaitonData(indivLeave.application_data)
        console.log(indivLeave)
        projectManID = indivLeave.application_data.project_manager
        immediateSupID = indivLeave.application_data.immediate_supervisor
      }
    }, () => {
    })
    employess.map(indivEmpoyee => {
      console.log(immediateSupID)
      console.log(projectManID)
      if(indivEmpoyee.code === immediateSupID){
        setImmediateSuperior(indivEmpoyee)
      }
      if(indivEmpoyee.code === projectManID){
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
    let acctSign = ""
    let ceoSign = ""
    let cooSign = ""
    let logisticsSign = ""
    let hraSign = ""
    let projSign = ""
    let immSign = ""
    if (selectedApproval.approver_id === accounting.code) {
      acctSign = accounting.signature
    } else if (selectedApproval.approver_id === ceo.code) {
      ceoSign = ceo.signature
    } else if (selectedApproval.approver_id === coo.code) {
      cooSign = coo.code
    } else if (selectedApproval.approver_id === logisticsOfficer.code) {
      logisticsSign = logisticsOfficer.signature
    } else if (selectedApproval.approver_id === hraManager.code) {
      hraSign = hraManager.signature
    } else if (selectedApproval.approver_id === immediateSuperior.code) {
      immSign = immediateSuperior.signature
    } else if (selectedApproval.approver_id === projectManager.code) {
      projSign = projectManager.signature
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
          headers: { 'Content-Type': 'application/json', 'LAS': 'LAS', 'raihan': 'raihan' },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: JSON.parse(sessionStorage.name),
            updatedAt: moment(new Date()).format("YYYY-MM-DD"),
            status: "APPROVED"
          })
        })
          .then(res => res.json())
          .then(data => {
            fetch(`http://localhost:3000/application?id=${selectedLeave.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                application_form_code: selectedLeave.application_form_code,
                employee_id: selectedLeave.employee_id,
                application_data: {
                  name: selectedLeave.application_data.name,
                  employee_code: selectedLeave.application_data.employee_code,
                  project: selectedLeave.application_data.project,
                  position: selectedLeave.application_data.position,
                  project_manager: selectedLeave.application_data.project_manager,
                  immediate_supervisor: selectedLeave.application_data.immediate_supervisor,
                  departure_date: selectedLeave.application_data.departure_date,
                  return_date: selectedLeave.application_data.return_date,
                  leave_type: selectedLeave.application_data.leave_type,
                  contact_number: selectedLeave.application_data.contact_number,
                  handover_briefing_to_successor: selectedLeave.application_data.handover_briefing_to_successor,
                  handover_briefing_to_successor_employee_name: selectedLeave.application_data.handover_briefing_to_successor_employee_name,
                  handover_briefing_to_successor_employee_code: "",
                  handover_documents: selectedLeave.application_data.handover_documents,
                  handover_documents_employee_name: selectedLeave.application_data.handover_documents_employee_name,
                  handover_documents_employee_code: selectedLeave.application_data.handover_documents_employee_code,
                  items_issued: selectedLeave.application_data.items_issued,
                  remarks: selectedLeave.application_data.remarks,
                  logistics_officer_signature_and_date: (selectedLeave.application_data.logistics_officer_signature_and_date ? selectedLeave.application_data.logistics_officer_signature_and_date : logisticsSign),
                  immidiate_supervisor_manager_signature_and_date: (selectedLeave.application_data.immidiate_supervisor_manager_signature_and_date ? selectedLeave.application_data.immidiate_supervisor_manager_signature_and_date : immSign),
                  project_manager_signature_and_date: (selectedLeave.application_data.project_manager_signature_and_date ? selectedLeave.application_data.project_manager_signature_and_date : projSign),
                  accounting_department_signature_and_date: (selectedLeave.application_data.accounting_department_signature_and_date ? selectedLeave.application_data.accounting_department_signature_and_date : acctSign),
                  receive_ticket: selectedLeave.application_data.receive_ticket,
                  receive_settlement: selectedLeave.application_data.receive_settlement,
                  receive_others: selectedLeave.application_data.receive_others,
                  receive_others_remarks: selectedLeave.application_data.receive_others_remarks,
                  leave_from: selectedLeave.application_data.leave_from,
                  leave_to: selectedLeave.application_data.leave_to,
                  be_back_on: selectedLeave.application_data.be_back_on,
                  employee_signature: selectedLeave.application_data.employee_signature,
                  employee_signature_date: selectedLeave.application_data.employee_signature_date,
                  airport_transportation_departure_date: selectedLeave.airport_transportation_departure_date,
                  airport_transportation_arrival_date: selectedLeave.application_data.airport_transportation_arrival_date,
                  airport_transportation_accommodation: selectedLeave.application_data.airport_transportation_accommodation,
                  airport_transportation_mobile_number: selectedLeave.application_data.airport_transportation_mobile_number,
                  hr_manager_signature_and_date: (selectedLeave.application_data.hr_manager_signature_and_date ? selectedLeave.application_data.hr_manager_signature_and_date : hraSign),
                  coo_signature_and_date: (selectedLeave.application_data.coo_signature_and_date ? selectedLeave.application_data.coo_signature_and_date : cooSign),
                  ceo_signature_and_date: (selectedLeave.application_data.ceo_signature_and_date ? selectedLeave.application_data.ceo_signature_and_date : ceoSign),
                  createdby: selectedLeave.application_data.createdby,
                  createdat: selectedLeave.application_data.createdat,
                  updatedby: selectedLeave.application_data.updatedBy,
                  updatedat: selectedLeave.application_data.updatedAt
                },
                status: "ACTIVE",
                createdBy: selectedLeave.createdBy,
                createdAt: selectedLeave.createdAt,
                updatedBy: JSON.parse(sessionStorage.name),
                updatedAt: moment(new Date()).format("MM-DD-YYYY")
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
          headers: { 'Content-Type': 'application/json', 'LAS': 'LAS', 'raihan': 'raihan' },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: JSON.parse(sessionStorage.name),
            updatedAt: moment(new Date()).format("YYYY-MM-DD"),
            status: "DENIED"
          })
        })
          .then(res => res.json())
          .then(data => {
            refetch()
            handleRefresh()
          })
      }
    })
  }

  const handleReview = () => {
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
          headers: { 'Content-Type': 'application/json', 'LAS': 'LAS', 'raihan': JSON.parse(sessionStorage.name) },
          body: JSON.stringify({
            approver_id: selectedApproval.approver_id,
            collateid: selectedApproval.collateid,
            createdBy: selectedApproval.createdBy,
            createdAt: selectedApproval.createdAt,
            updatedBy: JSON.parse(sessionStorage.name),
            updatedAt: moment(new Date()).format("YYYY-MM-DD"),
            status: "REVIEW"
          })
        })
          .then(res => res.json())
          .then(data => {
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
          <ApprovalForm
            showForm={showForm}
            handleShowForm={handleShowForm}
            selectedLeave={selectedLeave}
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
                <Col sm="4">
                  <Card body className="text-center" style={{ borderLeft: "5px solid yellow", borderBottom: "5px solid yellow" }}>
                    <CardTitle><h1>Pending</h1></CardTitle>
                    <CardText><h5>{forApproval}</h5></CardText>
                  </Card>
                </Col>
                <Col sm="4">
                  <Card body className="text-center" style={{ borderLeft: "5px solid green", borderBottom: "5px solid green" }}>
                    <CardTitle><h1>Approved</h1></CardTitle>
                    <CardText><h5>{approved}</h5></CardText>
                  </Card>
                </Col>
                <Col sm="4">
                  <Card body className="text-center" style={{ borderLeft: "5px solid red", borderBottom: "5px solid red" }}>
                    <CardTitle><h1>Denied</h1></CardTitle>
                    <CardText><h5>{denied}</h5></CardText>
                  </Card>
                </Col>
              </Row>
              <Row>
                <div className="col-md-4 offset-4">
                  <Card body className="text-center" style={{ borderLeft: "5px solid blue", borderBottom: "5px solid blue" }}>
                    <CardTitle><h1>For Review</h1></CardTitle>
                    <CardText><h5>{review}</h5></CardText>
                  </Card>
                </div>
              </Row>
              <div className='col-lg-12 justify-content-center'>
                <Card>
                  <CardBody>
                    <ApprovalTable
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


export default Approvals;