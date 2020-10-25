/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import moment from 'moment';
import LeavesTable from './LeavesTable';
import LeaveForm from './LeaveForm';
import Swal from 'sweetalert2'
import { Card, CardBody } from 'reactstrap';
import { CredsContext } from '../../context/Context';
import { config } from '../../config/config';

const Leaves = React.memo(props => {
  const { empCode, accessLevel, isLoggedIn, name, username } = useContext(CredsContext)

  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [employees, setEmployees] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [contact, setContact] = useState("")
  const [leaveType, setLeaveType] = useState("")
  const [itemsIssued, setItemsIssued] = useState("")
  const [specify, setSpecify] = useState("")
  const [passport, setPassport] = useState(false)
  const [ticket, setTicket] = useState(false)
  const [settlement, setSettlement] = useState(false)
  const [recievedOthers, setRecievedOthers] = useState(false)
  const [specifyRecievedOthers, setSpecifyRecievedOthers] = useState("")
  const [leaveFrom, setLeaveFrom] = useState("")
  const [leaveTo, setLeaveTo] = useState("")
  const [backOn, setBackOn] = useState("")
  const [staffDepartureDate, setStaffDepartureDate] = useState("")
  const [staffReturnDate, setStaffReturnDate] = useState("")
  const [staffContactChange, setStaffContactChange] = useState("")
  const [staffLeaveTypeChange, setStaffLeaveTypeChange] = useState("")
  const [handoverSuccessor, setHandoverSuccessor] = useState(false)
  const [handoverSuccessorName, setHandoverSuccessorName] = useState("")
  const [handoverDocs, setHandoverDocs] = useState(false)
  const [handoverDocsName, setHandoverDocsName] = useState("")
  const [staffItemsIssued1, setStaffItemsIssued1] = useState("")
  const [staffItemsIssued2, setStaffItemsIssued2] = useState("")
  const [staffItemsIssued3, setStaffItemsIssued3] = useState("")
  const [staffItemsIssued4, setStaffItemsIssued4] = useState("")
  const [staffRemarks1, setStaffRemarks1] = useState("")
  const [staffRemarks2, setStaffRemarks2] = useState("")
  const [staffRemarks3, setStaffRemarks3] = useState("")
  const [staffRemarks4, setStaffRemarks4] = useState("")
  const [staffTicket, setStaffTicket] = useState(false)
  const [staffSettlement, setStaffSettlement] = useState(false)
  const [staffOthers, setStaffOthers] = useState(false)
  const [specifyStaffOthers, setSpecifyStaffOthers] = useState("")
  const [staffLeaveFrom, setStaffLeaveFrom] = useState("")
  const [staffLeaveTo, setStaffLeaveTo] = useState("")
  const [staffBackOn, setStaffBackOn] = useState("")
  const [staffDepartureCheck, setStaffDepartureCheck] = useState(false)
  const [staffDepartureDateAirport, setStaffDepartureDateAirport] = useState("")
  const [staffArrivalCheck, setStaffArrivalCheck] = useState(false)
  const [staffArrivalDateAirport, setStaffArrivalDateAirport] = useState("")
  const [staffAccommodation, setStaffAccommodation] = useState("")
  const [staffMobile, setStaffMobile] = useState("")
  const [selectedLeave, setSelectedLeave] = useState({})
  const [selectedEmployee, setSelectedEmployee] = useState([
    {
      employee_type: ""
    }
  ])
  const [searchField, setSearchField] = useState("")
  const [hideListEmployees, setHideListEmployees] = useState(true)
  const [accounting, setAccounting] = useState({})
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [logisticsOfficer, setLogisticsOfficer] = useState({})
  const [hraManager, setHraManager] = useState({})
  const [hideListHandoverName, setHideListHandoverName] = useState(true)
  const [hideListHandoverDocsName, setHideListHandoverDocsName] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }

      // Applications
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
              if(indivData.application_form_code === "LEAVE_STAFF" || indivData.application_form_code === "LEAVE_WORKER")
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
            setLeaves([...pending, ...review, ...processing, ...denied, ...approved])
            setIsLoading(false)
          }
        })
        
    // Employees
    fetch(`${config.baseURL}/employee`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setEmployees(data)
        }
      })


    // Approvers Data
    fetch(`${config.baseURL}/applicationform`)
      .then(res => res.json())
      .then(data => {
        let approverCode = data[0].data.approvers
        let accounting = []
        let ceo = []
        let coo = []
        let hraManager = [] 
        let logisticsOfficer = []
        fetch(`${config.baseURL}/employee`)
          .then(res => res.json())
          .then(data => {
            data.map(indivData => {
              if(indivData.code === approverCode.accounting){
                 return accounting.push(indivData)
              } 
              if(indivData.code === approverCode.ceo){
                return ceo.push(indivData)
              } 
              if(indivData.code === approverCode.coo){
                return coo.push(indivData)
              }
              if(indivData.code === approverCode.hra_manager){
                return hraManager.push(indivData)
              }
              if(indivData.code === approverCode.logistics_officer){
                return logisticsOfficer.push(indivData)
              }
            })
          })
          .then(() => {
            setAccounting(accounting[0])
            setCeo(ceo[0])
            setCoo(coo[0])
            setLogisticsOfficer(logisticsOfficer[0])
            setHraManager(hraManager[0])
          })
      })
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetch(`${config.baseURL}/application`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          let allData = []
          data.map(indivData => {
            if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.employee_code) {
              if(indivData.application_form_code === "LEAVE_STAFF" || indivData.application_form_code === "LEAVE_WORKER")
                return allData.push(indivData)
            }
          })
          setLeaves(allData)
          setIsLoading(false)
        }
      })

    fetch(`${config.baseURL}/employee`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setIsLoading(false)
          setEmployees(data)
        }
      })
  }

  const handleRefresh = () => {
    setShowForm(false)
    setIsLoading(false)
    setSelectedEmployee([{
      employee_type: ""
    }])
    setDepartureDate("")
    setReturnDate("")
    setContact("")
    setLeaveType("")
    setItemsIssued("")
    setSpecify("")
    setPassport(false)
    setTicket(false)
    setSettlement(false)
    setRecievedOthers(false)
    setSpecifyRecievedOthers("")
    setLeaveFrom("")
    setLeaveTo()
    setBackOn("")
    refetch()
    setSearchField("")
    setIsEdit(false)
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
    setIsEdit(false)
    setSearchField("")
    setHideListHandoverDocsName(true)
    setHideListHandoverName(true)
  }

  const handleEdit = (leave) => {
    let data = leave.application_data
    setShowForm(!showForm)
    setIsEdit(true)
    // setSelectedEmployee(employee)
    setSelectedLeave(leave)
    setDepartureDate(data.departure_date)
    setReturnDate(data.return_date)
    setContact(data.contact_number)
    setLeaveType(data.leave_type)
    setItemsIssued(data.items_issued_type)
    setSpecify(data.items_issued_others_remarks)
    setPassport(data.receive_passport)
    setTicket(data.receive_ticket)
    setSettlement(data.receive_settlement)
    setRecievedOthers(data.receive_others)
    setSpecifyRecievedOthers(data.receive_others_remarks)
    setLeaveFrom(data.leave_from)
    setLeaveTo(data.leave_to)
    setBackOn(data.be_back_on)
    setStaffDepartureDate(data.departure_date)
    setStaffReturnDate(data.return_date)
    setStaffContactChange(data.contact_number)
    setStaffLeaveTypeChange(data.leave_type)
    setHandoverSuccessor(data.handover_briefing_to_successor)
    setHandoverSuccessorName(data.handover_briefing_to_successor_employee_name)
    setHandoverDocs(data.handover_documents)
    setHandoverDocsName(data.handover_documents_employee_name)
    setStaffItemsIssued1(data.items_issued)
    setStaffItemsIssued2(data.items_issued2)
    setStaffItemsIssued3(data.items_issued3)
    setStaffItemsIssued4(data.items_issued4)
    setStaffRemarks1(data.remarks)
    setStaffRemarks2(data.remarks2)
    setStaffRemarks3(data.remarks3)
    setStaffRemarks4(data.remarks4)
    setStaffTicket(data.receive_ticket)
    setStaffSettlement(data.receive_settlement)
    setStaffOthers(data.receive_others)
    setSpecifyStaffOthers(data.receive_others_remarks)
    setStaffLeaveFrom(data.leave_from)
    setStaffLeaveTo(data.leave_to)
    setStaffBackOn(data.be_back_on)
    // setStaffDepartureCheck()
    setStaffDepartureDateAirport(data.airport_transportation_departure_date)
    // setStaffArrivalCheck
    setStaffArrivalDateAirport(data.airport_transportation_arrival_date)
    setStaffAccommodation(data.airport_transportation_accommodation)
    setStaffMobile(data.airport_transportation_mobile_number)
  }

  const handleEmployeeSelect = (e) => {
    if (e.target.value === "") {
      return setSelectedEmployee(e.target.value)
    }
    let selected = employees.filter(employee => {
      return employee.id == e.target.value
    })
    setSelectedEmployee(selected)
    setHideListEmployees(true)
    setSearchField("")
  }

  const handleDepartureDate = (e) => {
    setDepartureDate(e.target.value)
  }
  const handleReturnDate = (e) => {
    setReturnDate(e.target.value)
  }
  const handleContactChange = (e) => {
    setContact(e.target.value)
  }
  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value)
  }
  const handleItemsIssuedChange = (e) => {
    setItemsIssued(e.target.value)
  }
  const handleSpecifyChange = (e) => {
    setSpecify(e.target.value)
  }
  const handlePassport = (e) => {
    setPassport(e.target.checked)
  }
  const handleTicket = (e) => {
    setTicket(e.target.checked)
  }
  const handleSettlement = (e) => {
    setSettlement(e.target.checked)
  }
  const handleRecievedOthers = (e) => {
    setRecievedOthers(e.target.checked)
  }
  const handleSpecifyRecievedOthers = (e) => {
    setSpecifyRecievedOthers(e.target.value)
  }
  const handleLeaveFrom = (e) => {
    setLeaveFrom(e.target.value)
  }
  const handleLeaveTo = (e) => {
    setLeaveTo(e.target.value)
  }
  const handleBackOn = (e) => {
    setBackOn(e.target.value)
  }

  const handleStaffDepartureDate = (e) => {
    setStaffDepartureDate(e.target.value)
  }

  const handleStaffReturnDate = (e) => {
    setStaffReturnDate(e.target.value)
  }

  const handleStaffContactChange = (e) => {
    setStaffContactChange(e.target.value)
  }

  const handleStaffLeaveTypeChange = (e) => {
    setStaffLeaveTypeChange(e.target.value)
  }

  const handleHandoverSuccessor = (e) => {
    setHandoverSuccessor(e.target.checked)
  }

  const handleHandoverSuccessorName = (e) => {
    setHandoverSuccessorName(e.target.value)
    setHideListHandoverName(true)
    setSearchField(e.target.value)
    let handoverSuccessorName = document.getElementById("handoverSuccessorName")
    handoverSuccessorName.value = e.target.value
  }

  const handleHandoverDocs = (e) => {
    setHandoverDocs(e.target.checked)
  }

  const handleHandoverDocsName = (e) => {
    setHandoverDocsName(e.target.value)
    setHideListHandoverDocsName(true)
    setSearchField(e.target.value)
    let handoverDocsName = document.getElementById("handoverDocsName")
    handoverDocsName.value = e.target.value
  }

  const handleStaffItemsIssued1 = (e) => {
    setStaffItemsIssued1(e.target.value)
  }

  const handleStaffItemsIssued2 = (e) => {
    setStaffItemsIssued2(e.target.value)
  }

  const handleStaffItemsIssued3 = (e) => {
    setStaffItemsIssued3(e.target.value)
  }

  const handleStaffItemsIssued4 = (e) => {
    setStaffItemsIssued4(e.target.value)
  }

  const handleStaffRemarks1 = (e) => {
    setStaffRemarks1(e.target.value)
  }

  const handleStaffRemarks2 = (e) => {
    setStaffRemarks2(e.target.value)
  }
  const handleStaffRemarks3 = (e) => {
    setStaffRemarks3(e.target.value)
  }
  const handleStaffRemarks4 = (e) => {
    setStaffRemarks4(e.target.value)
  }

  const handleStaffTicket = (e) => {
    setStaffTicket(e.target.checked)
  }

  const handleStaffSettlement = (e) => {
    setStaffSettlement(e.target.checked)
  }

  const handleStaffOthers = (e) => {
    setStaffOthers(e.target.checked)
  }

  const handleSpecifyStaffOthers = (e) => {
    setSpecifyStaffOthers(e.target.value)
  }

  const handleStaffLeaveFrom = (e) => {
    setStaffLeaveFrom(e.target.value)
  }

  const handleStaffLeaveTo = (e) => {
    setStaffLeaveTo(e.target.value)
  }

  const handleStaffBackOn = (e) => {
    setStaffBackOn(e.target.value)
  }

  const handleStaffDepartureCheck = (e) => {
    setStaffDepartureCheck(e.target.checked)
  }

  const handleStaffDepartureDateAirport = (e) => {
    setStaffDepartureDateAirport(e.target.value)
  }

  const handleStaffArrivalCheck = (e) => {
    setStaffArrivalCheck(e.target.checked)
  }

  const handleStaffArrivalDateAirport = (e) => {
    setStaffArrivalDateAirport(e.target.value)
  }

  const handleStaffAccommodation = (e) => {
    setStaffAccommodation(e.target.value)
  }

  const handleStaffMobile = (e) => {
    setStaffMobile(e.target.value)
  }

  const handleFilterEmployee = (e) => {
    setSearchField(e.target.value)
  }

  const handleHideListEmployees = () => {
    setHideListEmployees(false)
    setSelectedEmployee([
      {
        employee_type: ""
      }
    ])
  }

  const handleHideListHandoverSuccessorName = () => {
    setHideListHandoverName(false)
  }

  const filterHandoverSuccessorName = (e) => {
    setSearchField(e.target.value)
  }

  const handleHideListHandoverDocsName = () => {
    setHideListHandoverDocsName(false)
  }

  const filterHandoverDocsName = (e) => {
    setSearchField(e.target.value)
  }

  const handleSubmitWorker = () => {
    setIsLoading(true)
    if(departureDate === "" || returnDate === "" || leaveType === "") {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input all required fields!',
      })
    }

    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    if (isEdit) {
      fetch(`${config.baseURL}/application?id=${selectedLeave.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
        body: JSON.stringify({
          application_form_code: selectedLeave.application_form_code,
          employee_code: selectedLeave.employee_code,
          application_data: {
            name: selectedLeave.application_data.name,
            employee_code: selectedLeave.application_data.employee_code,
            project: selectedLeave.application_data.project,
            position: selectedLeave.application_data.position,
            immediate_supervisor: selectedLeave.application_data.immediate_supervisor,
            departure_date: departureDate,
            return_date: returnDate,
            leave_type: leaveType,
            contact_number: contact,
            items_issued_type: itemsIssued,
            items_issued_others_remarks: specify,
            signature_and_date: selectedLeave.application_data.employee_signature_date,
            immidiate_supervisor_manager_signature: "",
            immidiate_supervisor_sign_date: "",
            accounting_department_signature: "",
            accounting_dept_sign_date: "",
            hr_manager_signature: "",
            hr_manager_sign_date: "",
            receive_passport: passport,
            receive_ticket: ticket,
            receive_settlement: settlement,
            receive_others: recievedOthers,
            receive_others_remarks: specifyRecievedOthers,
            leave_from: leaveFrom,
            leave_to: leaveTo,
            be_back_on: backOn,
            employee_signature: selectedLeave.application_data.employee_signature,
            employee_signature_date: selectedLeave.application_data.employee_signature_date,
            createdby: selectedLeave.application_data.createdby,
            createdat: selectedLeave.application_data.createdat,
            updatedby: name,
            updatedat: moment(new Date()).format("MM/DD/YYYY")
          },
          status: "PENDING",
          createdBy: selectedLeave.application_data.createdBy,
          createdAt: selectedLeave.application_data.createdAt,
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
          } else {
          if (data.success) {
            setIsEdit(false)
            refetch()
            setShowForm(false)
            Swal.fire(
              'Success!',
              'Leave Application has been updated successfully!',
              'success'
            )
          }
        }
        })
        .catch(err => {
        })
    } else {
      fetch(`${config.baseURL}/application`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
        body: JSON.stringify({
          application_form_code: "LEAVE_WORKER",
          employee_code: selectedEmployee[0].code,
          application_data: {
            name: selectedEmployee[0].fullname,
            employee_code: selectedEmployee[0].code,
            project: selectedEmployee[0].cost_allocation_site,
            position: selectedEmployee[0].cost_allocation_actual_job_title,
            departure_date: departureDate,
            immediate_supervisor: selectedEmployee[0].immediate_superior,
            return_date: returnDate,
            leave_type: leaveType,
            contact_number: contact,
            items_issued_type: itemsIssued,
            items_issued_others_remarks: specify,
            signature_and_date: moment(new Date()).format("MM/DD/YYYY"),
            immidiate_supervisor_manager_signature: "",
            immidiate_supervisor_sign_date: "",
            accounting_department_signature: "",
            accounting_dept_sign_date: "",
            hr_manager_signature: "",
            hr_manager_sign_date: "",
            receive_passport: passport,
            receive_ticket: ticket,
            receive_settlement: settlement,
            receive_others: recievedOthers,
            receive_others_remarks: specifyRecievedOthers,
            leave_from: leaveFrom,
            leave_to: leaveTo,
            be_back_on: backOn,
            employee_signature: selectedEmployee[0].signature,
            employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
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
          } else {
            let newLeaves = [...leaves]
            newLeaves.push(data)
            setLeaves(newLeaves)
            handleRefresh()
          }
        })
    }
  }

  const handleSubmitStaff = () => {
    setIsLoading(true)
    if(staffDepartureDate === "" || staffReturnDate === "" || staffLeaveTypeChange === "") {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input all required fields!',
      })
    }

    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    if (isEdit) {
      fetch(`${config.baseURL}/application?id=${selectedLeave.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
        body: JSON.stringify({
          application_form_code: selectedLeave.application_form_code,
          employee_code: selectedLeave.employee_code,
          application_data: {
            name: selectedLeave.application_data.name,
            employee_code: selectedLeave.application_data.employee_code,
            project: selectedLeave.application_data.project,
            position: selectedLeave.application_data.position,
            project_manager: selectedLeave.application_data.project_manager,
            immediate_supervisor: selectedLeave.application_data.immediate_supervisor,
            departure_date: staffDepartureDate,
            return_date: staffReturnDate,
            leave_type: staffLeaveTypeChange,
            contact_number: staffContactChange,
            handover_briefing_to_successor: handoverSuccessor,
            handover_briefing_to_successor_employee_name: handoverSuccessorName,
            handover_briefing_to_successor_employee_code: "",
            handover_documents: handoverDocs,
            handover_documents_employee_name: handoverDocsName,
            handover_documents_employee_code: "",
            items_issued: staffItemsIssued1,
            items_issued2: staffItemsIssued2,
            items_issued3: staffItemsIssued3,
            items_issued4: staffItemsIssued4,
            remarks: staffRemarks1,
            remarks2: staffRemarks2,
            remarks3: staffRemarks3,
            remarks4: staffRemarks4,
            logistics_officer_signature_and_date: selectedLeave.logistics_officer_signature_and_date,
            logistics_officer_sign_date: selectedLeave.logistics_officer_sign_date,
            immidiate_supervisor_manager_signature_and_date: selectedLeave.immidiate_supervisor_manager_signature_and_date,
            immidiate_supervisor_sign_date: selectedLeave.immidiate_supervisor_sign_date,
            project_manager_signature_and_date: selectedLeave.project_manager_signature_and_date,
            project_manager_sign_date: selectedLeave.project_manager_sign_date,
            accounting_department_signature_and_date: selectedLeave.accounting_department_signature_and_date,
            accounting_dept_sign_date: selectedLeave.accounting_dept_sign_date,
            receive_ticket: staffTicket,
            receive_settlement: staffSettlement,
            receive_others: staffOthers,
            receive_others_remarks: specifyStaffOthers,
            leave_from: staffLeaveFrom,
            leave_to: staffLeaveTo,
            be_back_on: staffBackOn,
            employee_signature: selectedLeave.application_data.employee_signature,
            employee_signature_date: selectedLeave.application_data.employee_signature_date,
            airport_transportation_departure_date: staffDepartureDateAirport,
            airport_transportation_arrival_date: staffArrivalDateAirport,
            airport_transportation_accommodation: staffAccommodation,
            airport_transportation_mobile_number: staffMobile,
            hr_manager_signature_and_date: selectedLeave.hr_manager_signature_and_date,
            hr_manager_sign_date: selectedLeave.hr_manager_sign_date,
            coo_signature_and_date: selectedLeave.coo_signature_and_date,
            coo_sign_date: selectedLeave.coo_sign_date,
            ceo_signature_and_date: selectedLeave.ceo_signature_and_date,
            ceo_sign_date: selectedLeave.ceo_sign_date,
            createdby: selectedLeave.application_data.createdby,
            createdat: selectedLeave.application_data.createdat,
            updatedby: name,
            updatedat: moment(new Date()).format("MM/DD/YYYY")
          },
          status: "PENDING",
          createdBy: selectedLeave.createdBy,
          createdAt: selectedLeave.createdAt,
          updatedBy: name,
          updatedAt: moment(new Date()).format("MM/DD/YYYY")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsEdit(false)
            setShowForm(false)
            Swal.fire(
              'Success!',
              'Leave Application has been updated successfully!',
              'success'
            )
          }
            handleRefresh()
        })
        .catch(err => {
        })
    } else {
      fetch(`${config.baseURL}/application`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
        body: JSON.stringify({
          application_form_code: "LEAVE_STAFF",
          employee_code: selectedEmployee[0].code,
          application_data: {
            name: selectedEmployee[0].fullname,
            employee_code: selectedEmployee[0].code,
            project: selectedEmployee[0].cost_allocation_site,
            position: selectedEmployee[0].cost_allocation_actual_job_title,
            project_manager: selectedEmployee[0].project_manager,
            immediate_supervisor: selectedEmployee[0].immediate_superior,
            departure_date: staffDepartureDate,
            return_date: staffReturnDate,
            leave_type: staffLeaveTypeChange,
            contact_number: staffContactChange,
            handover_briefing_to_successor: handoverSuccessor,
            handover_briefing_to_successor_employee_name: handoverSuccessorName,
            handover_briefing_to_successor_employee_code: "",
            handover_documents: handoverDocs,
            handover_documents_employee_name: handoverDocsName,
            handover_documents_employee_code: "",
            items_issued: staffItemsIssued1,
            items_issued2: staffItemsIssued2,
            items_issued3: staffItemsIssued3,
            items_issued4: staffItemsIssued4,
            remarks: staffRemarks1,
            remarks2: staffRemarks2,
            remarks3: staffRemarks3,
            remarks4: staffRemarks4,
            logistics_officer_signature_and_date: "",
            logistics_officer_sign_date: "",
            immidiate_supervisor_manager_signature_and_date: "",
            immidiate_supervisor_sign_date: "",
            project_manager_signature_and_date: "",
            project_manager_sign_date: "",
            accounting_department_signature_and_date: "",
            accounting_dept_sign_date: "",
            receive_ticket: staffTicket,
            receive_settlement: staffSettlement,
            receive_others: staffOthers,
            receive_others_remarks: specifyStaffOthers,
            leave_from: staffLeaveFrom,
            leave_to: staffLeaveTo,
            be_back_on: staffBackOn,
            employee_signature: selectedEmployee[0].signature,
            employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
            airport_transportation_departure_date: staffDepartureDateAirport,
            airport_transportation_arrival_date: staffArrivalDateAirport,
            airport_transportation_accommodation: staffAccommodation,
            airport_transportation_mobile_number: staffMobile,
            hr_manager_signature_and_date: "",
            hr_manager_sign_date: "",
            coo_signature_and_date: "",
            coo_sign_date: "",
            ceo_signature_and_date: "",
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
          } else {
            let newLeaves = [...leaves]
            newLeaves.push(data)
            setLeaves(newLeaves)
            setShowForm(false)
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
      <div className="row">
        <div className="col-4 offset-8 text-right">
          <LeaveForm
            empCode={empCode}
            accessLevel={accessLevel}
            employees={employees}
            showForm={showForm}
            handleShowForm={handleShowForm}
            selectedEmployee={selectedEmployee}
            handleEmployeeSelect={handleEmployeeSelect}
            handleDepartureDate={handleDepartureDate}
            handleReturnDate={handleReturnDate}
            handleContactChange={handleContactChange}
            handleLeaveTypeChange={handleLeaveTypeChange}
            handleItemsIssuedChange={handleItemsIssuedChange}
            handleSpecifyChange={handleSpecifyChange}
            handlePassport={handlePassport}
            handleTicket={handleTicket}
            handleSettlement={handleSettlement}
            handleSpecifyRecievedOthers={handleSpecifyRecievedOthers}
            handleLeaveFrom={handleLeaveFrom}
            handleLeaveTo={handleLeaveTo}
            handleBackOn={handleBackOn}
            handleSubmitWorker={handleSubmitWorker}
            handleRecievedOthers={handleRecievedOthers}
            handleRefresh={handleRefresh}
            handleStaffDepartureDate={handleStaffDepartureDate}
            handleStaffReturnDate={handleStaffReturnDate}
            handleStaffContactChange={handleStaffContactChange}
            handleStaffLeaveTypeChange={handleStaffLeaveTypeChange}
            handleHandoverSuccessor={handleHandoverSuccessor}
            handleHandoverSuccessorName={handleHandoverSuccessorName}
            handleHandoverDocs={handleHandoverDocs}
            handleHandoverDocsName={handleHandoverDocsName}
            handleStaffItemsIssued1={handleStaffItemsIssued1}
            handleStaffItemsIssued2={handleStaffItemsIssued2}
            handleStaffItemsIssued3={handleStaffItemsIssued3}
            handleStaffItemsIssued4={handleStaffItemsIssued4}
            handleStaffRemarks1={handleStaffRemarks1}
            handleStaffRemarks2={handleStaffRemarks2}
            handleStaffRemarks3={handleStaffRemarks3}
            handleStaffRemarks4={handleStaffRemarks4}
            handleStaffTicket={handleStaffTicket}
            handleStaffSettlement={handleStaffSettlement}
            handleStaffOthers={handleStaffOthers}
            handleSpecifyStaffOthers={handleSpecifyStaffOthers}
            handleStaffLeaveFrom={handleStaffLeaveFrom}
            handleStaffLeaveTo={handleStaffLeaveTo}
            handleStaffBackOn={handleStaffBackOn}
            handleStaffDepartureCheck={handleStaffDepartureCheck}
            handleStaffDepartureDateAirport={handleStaffDepartureDateAirport}
            handleStaffArrivalCheck={handleStaffArrivalCheck}
            handleStaffArrivalDateAirport={handleStaffArrivalDateAirport}
            handleStaffAccommodation={handleStaffAccommodation}
            handleStaffMobile={handleStaffMobile}
            handleSubmitStaff={handleSubmitStaff}
            isEdit={isEdit}
            selectedLeave={selectedLeave}
            handleFilterEmployee={handleFilterEmployee}
            searchField={searchField}
            handleHideListEmployees={handleHideListEmployees}
            hideListEmployees={hideListEmployees}
            hideListHandoverName={hideListHandoverName}
            handleHideListHandoverSuccessorName={handleHideListHandoverSuccessorName}
            filterHandoverSuccessorName={filterHandoverSuccessorName}
            hideListHandoverDocsName={hideListHandoverDocsName}
            handleHideListHandoverDocsName={handleHideListHandoverDocsName}
            filterHandoverDocsName={filterHandoverDocsName}
            isLoading={isLoading}
          />
        </div>
      </div>
        <Sidebar />
        <div className="main-panel">
          <Topbar />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 ">
                <div className="text-center">
                  <h1 className='pt-5 pb-3'>Leave Clearance</h1>
                </div>
                <div className='col-lg-12 justify-content-center'>
                  <Card>
                    <CardBody>
                      <LeavesTable
                        leaves={leaves}
                        handleShowForm={handleShowForm}
                        handleEmployeeSelect={handleEmployeeSelect}
                        isLoading={isLoading}
                        refetch={refetch}
                        handleEdit={handleEdit}
                        accounting={accounting}
                        ceo={ceo}
                        coo={coo}
                        hraManager={hraManager}
                        logisticsOfficer={logisticsOfficer}
                        accessLevel={accessLevel}
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </React.Fragment>
  )
})

export default Leaves;