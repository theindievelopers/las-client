/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../Layout/Sidebar';
import Topbar from '../../Layout/Topbar';
import { Card, CardBody } from 'reactstrap';
import { CredsContext } from '../../context/Context'
import LeaveApplicationTable from './LeaveApplicationTable';
import LeaveApplicationForm from './LeaveApplicationForm';
import moment from 'moment';
import Swal from 'sweetalert2';
import { config } from '../../config/config';

const LeaveApplications = React.memo(() => {
  const { empCode, accessLevel, isLoggedIn, employees, name, username } = useContext(CredsContext)

  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [applications, setApplications] = useState([])
  const [hideListEmployees, setHideListEmployees] = useState(true)
  const [searchField, setSearchField] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState({})
  const [countryDestination, setCountryDestination] = useState("")
  const [contactCountryDestination, setContactCountryDesitnation] = useState("")
  const [leaveType, setLeaveType] = useState("")
  const [leaveStartDate, setLeaveStartDate] = useState("")
  const [leaveEndDate, setLeaveEndDate] = useState("")
  const [actualTravelDate, setActualTravelDate] = useState("")
  const [destination, setDestination] = useState("")
  const [noOfDaysApplied, setNoOfDaysApplied] = useState(0)
  const [leaveDateValid, setLeaveDateValid] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState({})
  const [hraManager, setHraManager] = useState({})
  const [disableOtherLeave, setDisableOtherLeave] = useState(true)
  const [otherLeave, setOtherLeave] = useState("")
  const [noOfDaysToEncashed, setNoOfDaysToEncashed] = useState(0)
  const [preferredAirlines, setPreferredAirlines] = useState("")
  const [wife, setWife] = useState(false)
  const [children, setChildren] = useState(false)
  const [datesFrom, setDatesFrom] = useState("")
  const [datesTo, setDatesTo] = useState("")
  const [familyPreferredAirlines, setFamilyPreferredAirlines] = useState("")
  const [mobileNoQatar, setMobileNoQatar] = useState("")

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }

    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refetch = () => {
    setIsLoading(true)
    //Applications
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
              if(indivData.application_form_code === "LEAVE_WORKER_APPLICATION" || indivData.application_form_code === "LEAVE_STAFF_APPLICATION")
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
            setApplications([...pending, ...review, ...processing, ...denied, ...approved])
            setIsLoading(false)
          }
        })

    // Approvers Data
    fetch(`${config.baseURL}/applicationform`)
    .then(res => res.json())
    .then(data => {
      let approverCode = data[0].data.approvers
      let hraManager = [] 
      fetch(`${config.baseURL}/employee`)
        .then(res => res.json())
        .then(data => {
          data.map(indivData => {
            if(indivData.code === approverCode.hra_manager){
              return hraManager.push(indivData)
            }
          })
        })
        .then(() => {
          setHraManager(hraManager[0])
        })
    })
  }

  const handleRefresh = () => {
    setShowForm(false)
    setHideListEmployees(true)
    setIsEdit(false)
    setSearchField("")
    setSelectedEmployee({})
    refetch()
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleEdit = (application) => {
    setIsEdit(true)
    setShowForm(!showForm)
    setSelectedApplication(application)
    setNoOfDaysApplied(application.application_data.no_of_days_applied)
    setLeaveStartDate(application.application_data.leave_starting_date)
    setLeaveEndDate(application.application_data.leave_ending_date)
    setCountryDestination(application.application_data.country_of_destination)
    setContactCountryDesitnation(application.application_data.contact_country_destination)
    setLeaveType(application.application_data.leave_type)
    setActualTravelDate(application.application_data.actual_travel_date)
    setDestination(application.application_data.destination)
    setMobileNoQatar(application.application_data.mobile_no_qatar)
    setNoOfDaysToEncashed(application.application_data.no_of_days_to_encashed)
    setPreferredAirlines(application.application_data.preferred_airlines)
    setWife(application.application_data.with_wife)
    setChildren(application.application_data.with_children)
    setDatesFrom(application.application_data.dates_from)
    setDatesTo(application.application_data.dates_to)
    setFamilyPreferredAirlines(application.application_data.family_preferred_airlines)
    setOtherLeave(application.application_data.other_leave)
    setLeaveDateValid(true)
    if(application.application_data.leave_type === "Others") {
      setDisableOtherLeave(false)
    } else {
      setDisableOtherLeave(true)
    }
  }

  const handleHideListEmployees = () => {
    setHideListEmployees(!hideListEmployees)
  }

  const filteredEmployees = employees.filter(employee => {
    return employee.fullname.toLowerCase().includes(searchField.toLowerCase());
  })

  const handleFilterEmployee = (e) => {
    setSearchField(e.target.value)
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
    setSelectedEmployee(selected[0])
    setHideListEmployees(true)
    setSearchField("")
  }

  const selectEmployeeForLeaveApplication = filteredEmployees.map((employee, i) => {
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

  const handleCountryDestinationChange = e => {
    setCountryDestination(e.target.value)
  }

  const handleContactCountryDestinationChange = e => {
    setContactCountryDesitnation(e.target.value)
  }

  const handleLeaveTypeChange = e => {
    setLeaveType(e.target.value)
    if(e.target.value === "Others") {
      setDisableOtherLeave(false)
    } else {
      setDisableOtherLeave(true)
      setOtherLeave("")
    }
  }

  const handleOtherLeaveChange = (e) => {
    setOtherLeave(e.target.value)
  }

  const handleLeaveStartDate = e => {
    setLeaveStartDate(e.target.value)
    if(leaveEndDate !== "" || leaveEndDate !== null){
      handleNoOfDaysApplied(e.target.value, leaveEndDate)
    }
  }

  const handleLeaveEndDate = e => {
    setLeaveEndDate(e.target.value)
    if(leaveStartDate === "" || leaveStartDate === null || e.target.value === "" || e.target.value === null) {
      return
    }

    if(e.target.value) {
      handleNoOfDaysApplied(leaveStartDate, e.target.value)
    }
  }

  const handleActualTravelDate = e => {
    setActualTravelDate(e.target.value)
  }

  const handleNoOfDaysApplied = (leaveStartDate, leaveEndDate) => {
    let noOfDaysInput = document.getElementById("noOfDaysApplied")
    let diffInDays = moment(leaveEndDate).diff(moment(leaveStartDate), 'days');
    if(diffInDays < 0){
      setLeaveDateValid(false)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure the date is valid!",
      });
    }
    noOfDaysInput.value = diffInDays
    setLeaveDateValid(true)
    setNoOfDaysApplied(diffInDays + 1)
  }

  const handleDestination = e => {
    setDestination(e.target.value)
  }

  const handleMobileNoQatarChange = e => {
    setMobileNoQatar(e.target.value)
  }

  const handleNoOfDaysToEncashed = e => {
    setNoOfDaysToEncashed(parseInt(e.target.value, 10))
  }

  const handlePreferredAirlines = e => {
    setPreferredAirlines(e.target.value)
  }

  const handleWife = (e) => {
    setWife(e.target.checked)
  }
  
  const handleChildren = (e) => {
    setChildren(e.target.checked)
  }
  
  const handleDatesFrom = (e) => {
    setDatesFrom(e.target.value)
  }

  const handleDatesTo = (e) => {
    setDatesTo(e.target.value)
  }

  const handleFamilyPrferredAirlines = (e) => {
    setFamilyPreferredAirlines(e.target.value)
  }

  const submitStaff = () => {
    if(!leaveDateValid){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure the leave start date and end date is valid!",
      });
    }
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if(isEdit){
      fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
        body: JSON.stringify({
          application_form_code: selectedApplication.application_form_code,
          employee_code: selectedApplication.code,
          application_data: {
            name: selectedApplication.application_data.name,
            employee_code: selectedApplication.application_data.employee_code,
            nationality: selectedApplication.application_data.nationality,
            department: selectedApplication.application_data.department,
            designation: selectedApplication.application_data.designation,
            joining_date: selectedApplication.application_data.joining_date,
            country_of_destination: countryDestination,
            contact_country_destination: contactCountryDestination,
            mobile_no_qatar: mobileNoQatar,
            leave_type: leaveType,
            other_leave: otherLeave,
            leave_starting_date: leaveStartDate,
            leave_ending_date: leaveEndDate,
            actual_travel_date: actualTravelDate,
            no_of_days_applied: noOfDaysApplied,
            no_of_days_to_encashed: noOfDaysToEncashed,
            preferred_airlines: preferredAirlines,
            with_wife: wife,
            with_children: children,
            dates_from: datesFrom,
            dates_to: datesTo,
            family_preferred_airlines: familyPreferredAirlines,
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
          },
          status: "PENDING",
          createdBy: selectedApplication.createdBy,
          createdAt: selectedApplication.createdAt,
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
            let newApplications = [...applications]
            newApplications.push(data)
            setApplications(newApplications)
            handleRefresh()
          }
        })
    } else {
      fetch(`${config.baseURL}/application`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: "LEAVE_STAFF_APPLICATION",
            employee_code: selectedEmployee.code,
            application_data: {
              name: selectedEmployee.fullname,
              employee_code: selectedEmployee.code,
              nationality: selectedEmployee.nationality,
              department: selectedEmployee.cost_allocation_site,
              designation: selectedEmployee.cost_allocation_actual_job_title,
              joining_date: selectedEmployee.joining_date,
              country_of_destination: countryDestination,
              contact_country_destination: contactCountryDestination,
              mobile_no_qatar: mobileNoQatar,
              leave_type: leaveType,
              other_leave: otherLeave,
              leave_starting_date: leaveStartDate,
              leave_ending_date: leaveEndDate,
              actual_travel_date: actualTravelDate,
              no_of_days_applied: noOfDaysApplied,
              no_of_days_to_encashed: noOfDaysToEncashed,
              preferred_airlines: preferredAirlines,
              with_wife: wife,
              with_children: children,
              dates_from: datesFrom,
              dates_to: datesTo,
              family_preferred_airlines: familyPreferredAirlines,
              employee_signature: selectedEmployee.signature,
              employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
              immediate_supervisor: selectedEmployee.immediate_superior,
              immediate_supervisor_commentL1: "",
              immediate_supervisor_commentL2: "",
              immediate_supervisor_signature: "",
              immediate_supervisor_sign_date: "",
              project_manager: selectedEmployee.project_manager,
              project_manager_commentL1: "", 
              project_manager_commentL2: "",
              project_manager_signature: "",
              project_manager_sign_date: "",
              previous_leave_date: "",
              previous_leave_type: "",
              previous_annual_leave: "",
              rp_expiry_date: selectedEmployee.residence_permit_expiry_date,
              passport_expiry_date: selectedEmployee.passport_expiry_date,
              accrued_leave_days: "",
              ticket_entitlement_route: "",
              released: "",
              family_ticket_entitlement: "",
              ticket_wife: "",
              ticket_children: "",
              hra_approved: "",
              hra_remarks: "",
              hra_signature: "",
              hra_sign_date: "",
              coo_approved: "",
              coo_remarks: "",
              coo_signature: "",
              coo_sign_date: "",
              ceo_approved: "",
              ceo_remarks: "",
              ceo_signature: "",
              ceo_sign_date: "",
              createdBy: name,
              createdAt: moment(new Date()).format("MM/DD/YYYY"),
              updatedBy: name,
              updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
              let newApplications = [...applications]
              newApplications.push(data)
              setApplications(newApplications)
              handleRefresh()
            }
          })
    }
  }

  const submitWorker = () => {
    if(!leaveDateValid){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure the leave start date and end date is valid!",
      });
    }
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if(isEdit){
      fetch(`${config.baseURL}/application?id=${selectedApplication.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
        body: JSON.stringify({
          application_form_code: selectedApplication.application_form_code,
          employee_code: selectedApplication.code,
          application_data: {
            name: selectedApplication.application_data.name,
            employee_code: selectedApplication.application_data.employee_code,
            nationality: selectedApplication.nationality,
            department: selectedApplication.application_data.department,
            designation: selectedApplication.application_data.designation,
            joining_date: selectedApplication.application_data.joining_date,
            country_of_destination: countryDestination,
            contact_country_destination: contactCountryDestination,
            sponsor: selectedApplication.sponsorship,
            leave_type: leaveType,
            leave_starting_date: leaveStartDate,
            leave_ending_date: leaveEndDate,
            actual_travel_date: actualTravelDate,
            destination: destination,
            no_of_days_applied: noOfDaysApplied,
            submission_date: selectedApplication.application_data.submission_date,
            employee_signature: selectedApplication.application_data.employee_signature,
            employee_signature_date: selectedApplication.application_data.employee_signature_date,
            immediate_supervisor: selectedApplication.application_data.immediate_superior, 
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
          status: "PENDING",
          createdBy: selectedApplication.createdBy,
          createdAt: selectedApplication.createdAt,
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
            let newApplications = [...applications]
            newApplications.push(data)
            setApplications(newApplications)
            handleRefresh()
          }
        })
    } else {
      fetch(`${config.baseURL}/application`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: "LEAVE_WORKER_APPLICATION",
            employee_code: selectedEmployee.code,
            application_data: {
              name: selectedEmployee.fullname,
              employee_code: selectedEmployee.code,
              nationality: selectedEmployee.nationality,
              department: selectedEmployee.cost_allocation_site,
              designation: selectedEmployee.cost_allocation_actual_job_title,
              joining_date: selectedEmployee.joining_date,
              country_of_destination: countryDestination,
              contact_country_destination: contactCountryDestination,
              sponsor: selectedEmployee.sponsorship,
              leave_type: leaveType,
              leave_starting_date: leaveStartDate,
              leave_ending_date: leaveEndDate,
              actual_travel_date: actualTravelDate,
              destination: destination,
              no_of_days_applied: noOfDaysApplied,
              submission_date: moment(new Date()).format("MM/DD/YYYY"),
              employee_signature: selectedEmployee.signature,
              employee_signature_date: moment(new Date()).format("MM/DD/YYYY"),
              immediate_supervisor: selectedEmployee.immediate_superior, 
              supervisor_commentL1: "",
              supervisor_commentL2: "",
              supervisor_signature: "",
              project_manager: selectedEmployee.project_manager,
              project_manager_comment: "",
              project_manager_signature: "",
              previous_leave_date: "",
              previous_leave_type: "",
              previous_annual_leave: "",
              rp_expiry_date: selectedEmployee.residence_permit_expiry_date,
              passport_expiry_date: selectedEmployee.passport_expiry_date,
              hra_approved: "",
              hra_remarksL1: "",
              hra_remarksL2: "",
              hra_remarksL3: "",
              hra_manager_signature: "",
              hra_manager_signature_date: "",
              createdBy: name,
              createdAt: moment(new Date()).format("MM/DD/YYYY"),
              updatedBy: name,
              updatedAt: moment(new Date()).format("MM/DD/YYYY")
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
              let newApplications = [...applications]
              newApplications.push(data)
              setApplications(newApplications)
              handleRefresh()
            }
          })
    }
  }

  return(
    <React.Fragment>
       <div className="row">
        <div className="col-4 offset-8 text-right">
          <LeaveApplicationForm 
            showForm={showForm}
            handleShowForm={handleShowForm}
            isEdit={isEdit}
            handleHideListEmployees={handleHideListEmployees}
            hideListEmployees={hideListEmployees}
            handleRefresh={handleRefresh}
            handleFilterEmployee={handleFilterEmployee}
            selectEmployeeForLeaveApplication={selectEmployeeForLeaveApplication}
            selectedEmployee={selectedEmployee}
            handleCountryDestinationChange={handleCountryDestinationChange}
            handleContactCountryDestinationChange={handleContactCountryDestinationChange}
            handleLeaveTypeChange={handleLeaveTypeChange}
            handleLeaveStartDate={handleLeaveStartDate}
            handleLeaveEndDate={handleLeaveEndDate}
            handleActualTravelDate={handleActualTravelDate}
            handleNoOfDaysApplied={handleNoOfDaysApplied}
            handleDestination={handleDestination}
            submitWorker={submitWorker}
            noOfDaysApplied={noOfDaysApplied}
            selectedApplication={selectedApplication}
            countryDestination={countryDestination}
            contactCountryDestination={contactCountryDestination}
            leaveType={leaveType}
            leaveStartDate={leaveStartDate}
            leaveEndDate={leaveEndDate}
            actualTravelDate={actualTravelDate}
            destination={destination}
            disableOtherLeave={disableOtherLeave}
            handleOtherLeaveChange={handleOtherLeaveChange}
            submitStaff={submitStaff}
            handleNoOfDaysToEncashed={handleNoOfDaysToEncashed}
            handlePreferredAirlines={handlePreferredAirlines}
            handleWife={handleWife}
            handleChildren={handleChildren}
            handleDatesFrom={handleDatesFrom}
            handleDatesTo={handleDatesTo}
            handleFamilyPrferredAirlines={handleFamilyPrferredAirlines}
            handleMobileNoQatarChange={handleMobileNoQatarChange}
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
                <div className="text-center">
                  <h1 className='pt-5 pb-3'>Leave Applications</h1>
                </div>
                <div className='col-lg-12 justify-content-center'>
                  <Card>
                    <CardBody>
                      <LeaveApplicationTable 
                        showForm={showForm}
                        handleShowForm={handleShowForm}
                        isEdit={isEdit}
                        data={applications}
                        refetch={refetch}
                        handleEdit={handleEdit}
                        hraManager={hraManager}
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

export default LeaveApplications;