import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Topbar from '../../Layout/Topbar'
import EmployeesTable from './EmployeesTable'
import EmployeeForm from './EmployeeForm'
import Axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Card,CardBody } from 'reactstrap'
import { CredsContext } from '../../context/Context'

const Employees = React.memo( props => {
  const { saveCreds, empCode, accessLevel, isLoggedIn, name, username } = useContext(CredsContext)

  const [signatureUpload, setSignatureUpload] = useState(false)
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsedit] = useState(false)
  const [showForm, setShowFrom] = useState(false)
  const [employeeCode, setEmployeeCode] = useState("")
  const [fullname, setFullname] = useState("")
  const [costAllocationSite, setCostAllocationSite] = useState("")
  const [costAllocationJT, setCostAllocationJT] = useState("")
  const [nationality, setNationality] = useState("")
  const [sponsorship, setSponsorship] = useState("")
  const [dob, setDOB] = useState("")
  const [passportNum, setPassportNum] = useState("")
  const [passportDateIssued, setPassportDateIssued] = useState("")
  const [passportExpiry, setPassportExpiry] = useState("")
  const [residencePermit, setResidencePermit] = useState("")
  const [residenceExpiryDate, setResidenceExpiryDate] = useState("")
  const [residencePermitBloodGroup, setResidencePermitBloodGroup] = useState("")
  const [jobOfferDohaEntry, setJobOfferDohaEntry] = useState("")
  const [joiningDate, setJoiningDate] = useState("")
  const [incrementMonth, setIncrementMonth] = useState(0)
  const [basic, setBasic] = useState(0)
  const [incrementAmount, setIncrementAmount] = useState(0)
  const [generalAllowance, setGeneralAllowance] = useState(0)
  const [hra, setHRA] = useState(0)
  const [transportationAllowance, setTransportationAllowance] = useState(0)
  const [telAllowance, setTelAllowance] = useState(0)
  const [ticketAllowance, setTicketAllowance] = useState(0)
  const [foodAllowance, setFoodAllowance] = useState(0)
  const [medicalAllowance, setMedicalAllowance] = useState(0)
  const [housingAllowance, setHousingAllowance] = useState(0)
  const [leaveTicketEntitlement, setLeaveTicketEntitlement] = useState(0)
  const [leaveTicketDaysPerYear, setLeaveTicketDaysPerYear] = useState(0)
  const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState("")
  const [driverLicenseExpiry, setDriverLicenseExpiry] = useState("")
  const [healthCardNum, setHealthCardNum] = useState("")
  const [healthCardIssueDate, setHealthCardIssueDate] = useState("")
  const [healthCardExpiry, setHealthCardExpiry] = useState("")
  const [bankName, setBankName] = useState("")
  const [cardNum, setCardNumber] = useState("")
  const [recruitedBy, setRecruitedBy] = useState("")
  const [accommodation, setAccommodation] = useState("")
  const [employeeType, setEmployeeType] = useState("")
  const [employmentStatus, setEmployementStatus] = useState("")
  const [projectManager, setProjectManager] = useState([])
  const [immediateSuperior, setImmediateSuperior] = useState([])
  const [signature, setSignature] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [hideListEmployees, setHideListEmployees] = useState(true)
  const [hideListImmediateSuperior, setHideListImmediateSuperior] = useState(true)
  const [searchField, setSearchField] = useState("")
  const [searchSupervisor, setSearchSupervisor] = useState("")

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.replace('#/login')
    }
    // } else if(accessLevel !== 1 || accessLevel !== 3) {
    //   window.location.replace('#/leaves')
    // }

    // const abortController = new AbortController()
    // const signal = abortController.signal

    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setIsLoading(false)
          setEmployees(data)
        }
      })

    // return function cleanUp() {
    //   abortController.abort()
    // }
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setIsLoading(false)
          setEmployees(data)
        }
      })
  }

  const handleRefresh = () => {
    setShowFrom(!showForm)
    setIsLoading(false)
    setEmployeeCode("")
    setFullname("")
    setCostAllocationSite("")
    setCostAllocationJT("")
    setNationality("")
    setSponsorship("")
    setDOB("")
    setPassportNum("")
    setPassportDateIssued("")
    setPassportExpiry("")
    setResidencePermit("")
    setResidenceExpiryDate("")
    setResidencePermitBloodGroup("")
    setJobOfferDohaEntry("")
    setJoiningDate("")
    setIncrementMonth("")
    setBasic(0)
    setIncrementAmount(0)
    setGeneralAllowance(0)
    setHRA(0)
    setTransportationAllowance(0)
    setTelAllowance(0)
    setTicketAllowance(0)
    setFoodAllowance(0)
    setMedicalAllowance(0)
    setHousingAllowance(0)
    setLeaveTicketEntitlement("")
    setLeaveTicketDaysPerYear("")
    setDrivingLicenseIssueDate("")
    setDriverLicenseExpiry("")
    setHealthCardNum("")
    setHealthCardIssueDate("")
    setHealthCardExpiry("")
    setBankName("")
    setCardNumber("")
    setRecruitedBy("")
    setAccommodation("")
    setEmployeeType("")
    setEmployementStatus("")
    setSignature("")
    setSignatureUpload(false)
    setSelectedEmployee([])
    refetch()
    setProjectManager([])
    setImmediateSuperior([])
  }

  const handleShowForm = (employee) => {
    setShowFrom(!showForm)
    setIsedit(false)
    setSelectedEmployee([])
    setImmediateSuperior([])
    setProjectManager([])
    setHideListEmployees(true)
    setSearchField("")
    setSearchSupervisor("")
    setHideListEmployees(true)
    setHideListImmediateSuperior(true)
  }

  const handleEdit = (employee) => {
    console.log(employee)
    setShowFrom(!showForm)
    setIsedit(true)
    setSelectedEmployee(employee)
    setEmployeeCode(employee.code)
    setFullname(employee.fullname)
    setCostAllocationSite(employee.cost_allocation_site)
    setCostAllocationJT(employee.cost_allocation_actual_job_title)
    setNationality(employee.nationality)
    setSponsorship(employee.sponsorship)
    setDOB(employee.dob)
    setPassportNum(employee.passport_number)
    setPassportDateIssued(employee.passport_date_of_issue)
    setPassportExpiry(employee.passport_expiry_date)
    setResidencePermit(employee.residence_permit_number)
    setResidenceExpiryDate(employee.residence_permit_expiry_date)
    setResidencePermitBloodGroup(employee.residence_permit_blood_group)
    setJobOfferDohaEntry(employee.job_offer_doha_entry)
    setJoiningDate(employee.joining_date)
    setIncrementMonth(employee.increment_month)
    setBasic(employee.basic)
    setIncrementAmount(employee.increment_amount)
    setGeneralAllowance(employee.general_allowance)
    setHRA(employee.hra)
    setTransportationAllowance(employee.transportation_allowance)
    setTelAllowance(employee.tel_allow)
    setTicketAllowance(employee.ticket_allowance)
    setFoodAllowance(employee.food_allowance)
    setMedicalAllowance(employee.medical_allowance)
    setHousingAllowance(employee.housing_allowance)
    setLeaveTicketEntitlement(employee.leave_ticket_entitlement)
    setLeaveTicketDaysPerYear(employee.leave_ticket_days_per_year)
    setDrivingLicenseIssueDate(employee.driving_license_issue_date)
    setDriverLicenseExpiry(employee.driving_license_expiry_date)
    setHealthCardNum(employee.health_card_number)
    setHealthCardIssueDate(employee.health_card_issue_date)
    setHealthCardExpiry(employee.health_card_expiry_date)
    setBankName(employee.bank_name)
    setCardNumber(employee.card_number)
    setRecruitedBy(employee.recruited_by)
    setAccommodation(employee.accommodation)
    setEmployeeType(employee.employee_type)
    setEmployementStatus(employee.employment_status)
    setSignature(employee.signature)
    setCreatedBy(employee.createdBy)
    setCreatedAt(employee.createdAt)
    employees.map(indivEmpoyee => {
      if(indivEmpoyee.code === employee.project_manager){
        setProjectManager(indivEmpoyee)
      }
      if(indivEmpoyee.code === employee.immediate_superior){
        setImmediateSuperior(indivEmpoyee)
      }
    })
  }

  const handleEmployeeCodeChange = (e) => {
    setEmployeeCode(e.target.value)
  }
  
  const handleFullnameChange = (e) => {
    setFullname(e.target.value)
  }

  const handleCostAllocationSiteChange = (e) => {
    setCostAllocationSite(e.target.value)
  }
  const handleCostAllocationJTChange = (e) => {
    setCostAllocationJT(e.target.value)
  }
  const handleNationalityChange = e => {
    setNationality(e.target.value)
  }
  const handleSponsorshipChange = e => {
    setSponsorship(e.target.value)
  }
  const handleDOBSiteChange = e => {
    setDOB(e.target.value)
  }
  const handlePassportNumChange = e => {
    setPassportNum(e.target.value)
  }
  const handlePassportDateIssuedChange = e => {
    setPassportDateIssued(moment(e.target.value).format("MM/DD/YYYY"))
  }
  const handlePassportExpiryChange = e => {
    setPassportExpiry(e.target.value)
  }
  const handleResidencePermitChange = e => {
    setResidencePermit(e.target.value)
  }
  const handleResidenceExpiryDateChange = e => {
    setResidenceExpiryDate(moment(e.target.value).format("MM/DD/YYYY"))
  }
  const handleResidencePermitBloodGroupChange = e => {
    setResidencePermitBloodGroup(e.target.value)
  }
  const handleJobOfferDohaEntryChange = e => {
    setJobOfferDohaEntry(e.target.value)
  }
  const handleJoiningDateChange = e => {
    setJoiningDate(moment(e.target.value).format("MM/DD/YYYY"))
  }
  const handleIncrementMonthChange = e => {
    setIncrementMonth(parseInt(e.target.value, 10))
  }
  const handleBasicChange = e => {
    setBasic(parseInt(e.target.value, 10))
  }
  const handleIncrementAmountChange = e => {
    setIncrementAmount(parseInt(e.target.value, 10))
  }
  const handleGeneralAllowanceChange = e => {
    setGeneralAllowance(parseInt(e.target.value, 10))
  }
  const handleHRAChange = e => {
    setHRA(parseInt(e.target.value, 10))
  }
  const handleTransportationAllowanceChange = e => {
    setTransportationAllowance(parseInt(e.target.value, 10))
  }
  const handleTelAllowanceChange = e => {
    setTelAllowance(parseInt(e.target.value, 10))
  }
  const handleTicketAllowanceChange = e => {
    setTicketAllowance(parseInt(e.target.value, 10))
  }
  const handleFoodAllowanceChange = e => {
    setFoodAllowance(parseInt(e.target.value, 10))
  }
  const handleMedicalAllowanceChange = e => {
    setMedicalAllowance(parseInt(e.target.value, 10))
  }

  const handleHousingAllowanceChange = e => {
    console.log(e.target.value)
    setHousingAllowance(parseInt(e.target.value, 10))
  }

  const handleLeaveTicketEntitlementChange = e => {
    setLeaveTicketEntitlement(e.target.value)
  }
  const handleLeaveTicketDaysPerYearChange = e => {
    setLeaveTicketDaysPerYear(e.target.value)
  }
  const handleDrivingLicenseIssueDateChange = e => {
    setDrivingLicenseIssueDate(moment(e.target.value).format("MM/DD/YYYY"))
  }
  const handleDriverLicenseExpiryChange = e => {
    setDriverLicenseExpiry(e.target.value)
  }
  const handleHealthCardNumChange = e => {
    setHealthCardNum(e.target.value)
  }
  const handleHealthCardIssueDateChange = e => {
    setHealthCardIssueDate(moment(e.target.value).format("MM/DD/YYYY"))
  }
  const handleHealthCardExpiryChange = e => {
    setHealthCardExpiry(e.target.value)
  }
  const handleBankNameChange = e => {
    setBankName(e.target.value)
  }
  const handleCardNumberChange = e => {
    setCardNumber(e.target.value)
  }
  const handleRecruitedByChange = e => {
    setRecruitedBy(e.target.value)
  }
  const handleAccommodationChange = e => {
    setAccommodation(e.target.value)
  }
  const handleEmployeeTypeChange = e => {
    setEmployeeType(e.target.value)
  }
  const handleEmployementStatusChange = e => {
    setEmployementStatus(e.target.value)
  }

  const handleProjectManagerChange = e => {
    let value = e.target.value
    let projectManager = employees.filter(employee => {
      return employee.code === value
    })
    setProjectManager(projectManager[0])
    setHideListEmployees(true)
    // setSearchField(`${projectManager[0].code}-${projectManager[0].fullname}`)
    setSearchField("")
    let projectManagerInput = document.getElementById("projectManager")
    projectManagerInput.value = `${projectManager[0].fullname}`
  }

  const handleImmediateSuperior = e => {
    let value = e.target.value
    let immediateSuperior = employees.filter(employee => {
      return employee.code === value
    })
    setImmediateSuperior(immediateSuperior[0])
    setHideListImmediateSuperior(true)
    // setSearchField(`${immediateSuperior[0].code}-${immediateSuperior[0].fullname}`)
    setSearchSupervisor("")
    let immediateSuperiorInput = document.getElementById("immediateSuperior")
    immediateSuperiorInput.value = `${immediateSuperior[0].fullname}`
  }

  const handleSignature = e => {
    e.preventDefault();
    setSignature(e.target.files[0])
    if(e.target.files[0] && e.target.files[0].type !== "image/png") {
      e.target.value = ""
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload PNG file!',
      })
    } else if(e.target.files[0] && e.target.files[0].size > 48999) {
      e.target.value = ""
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File is too big! Please upload 48kb or less.',
      })
    } else {
      const formData = new FormData()
      formData.append('upload_image', e.target.files[0])
      const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'authorization': `Basic ${creds}`
        }
      }
      Axios.post(`http://localhost:3000/upload/signature?id=${selectedEmployee.id}`, formData, config)
        .then(res => {
          setSignature(res.data.data.signature)
          setSignatureUpload(true)
        })

    }
  }

  const handleHideListEmployees = () => {
    setHideListEmployees(!hideListEmployees)
    setProjectManager("")
  }

  const handleHideLisImmdiateSuperior = () => {
    setHideListImmediateSuperior(!hideListImmediateSuperior)
    setImmediateSuperior("")
  }

  const handleFilterEmployee = (e) => {
    setSearchField(e.target.value)
  }

  const handleFilterImmdiateSuperior = (e) => {
    setSearchSupervisor(e.target.value)
  }

  const handleSubmit = () => {
    console.log(housingAllowance)
    let calc = [basic, generalAllowance, hra, transportationAllowance, telAllowance, ticketAllowance, foodAllowance, medicalAllowance, housingAllowance]
    const total = calc.reduce((accumulator, currentValue) => accumulator + currentValue);
    if(fullname === "" || employeeCode === "" || dob === "" || nationality === "" || passportNum === "" || residencePermit === "" || healthCardNum === "") {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input all required fields!',
      })
    }
    setIsLoading(true)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
    if (isEdit) {
      fetch(`http://localhost:3000/employees?id=${selectedEmployee.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json',  'authorization': `Basic ${creds}`},
        body: JSON.stringify({
          code: employeeCode,
          fullname: fullname,
          cost_allocation_site:costAllocationSite,
          cost_allocation_actual_job_title: costAllocationJT,
          nationality:nationality,
          sponsorship: sponsorship,
          dob: dob,
          passport_number: passportNum,
          passport_date_of_issue: passportDateIssued,
          passport_expiry_date: passportExpiry,
          residence_permit_number: residencePermit,
          residence_permit_expiry_date: residenceExpiryDate,
          residence_permit_blood_group: residencePermitBloodGroup,
          job_offer_doha_entry: jobOfferDohaEntry,
          joining_date: joiningDate,
          increment_month: incrementMonth,
          increment_amount: incrementAmount,
          basic: basic,
          general_allowance: generalAllowance,
          hra: hra,
          transportation_allowance: transportationAllowance,
          tel_allow: telAllowance,
          ticket_allowance: ticketAllowance,
          food_allowance: foodAllowance,
          medical_allowance: medicalAllowance,
          housing_allowance: housingAllowance,
          total: total,
          leave_ticket_entitlement: leaveTicketEntitlement,
          leave_ticket_days_per_year: leaveTicketDaysPerYear,
          driving_license_issue_date: drivingLicenseIssueDate,
          driving_license_expiry_date: driverLicenseExpiry,
          health_card_number: healthCardNum,
          health_card_issue_date: healthCardIssueDate,
          health_card_expiry_date: healthCardExpiry,
          bank_name: bankName,
          card_number: cardNum,
          recruited_by: recruitedBy,
          accommodation: accommodation,
          employee_type: employeeType,
          signature: signature,
          project_manager: projectManager.code,
          immediate_superior: immediateSuperior.code,
          employment_status: employmentStatus,
          createdBy: createdBy,
          createdAt: createdAt,
          updatedBy: name,
          updatedAt: moment(new Date()).format("MM/DD/YYYY")
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("EDITED", data)
          if(data.success){
            setIsedit(false)
            handleRefresh()
            refetch()
            setShowFrom(false)
            setIsLoading(false)
            Swal.fire(
              'Success!',
              'Employee has been updated successfully!',
              'success'
            )
          }
        })
        .catch(err => {
        })
    } else {
      fetch('http://localhost:3000/employees', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${creds}` },
        body: JSON.stringify({
          code: employeeCode,
          fullname: fullname,
          cost_allocation_site: costAllocationSite,
          cost_allocation_actual_job_title: costAllocationJT,
          nationality:nationality,
          sponsorship: sponsorship,
          dob: dob,
          passport_number: passportNum,
          passport_date_of_issue: passportDateIssued,
          passport_expiry_date: passportExpiry,
          residence_permit_number: residencePermit,
          residence_permit_expiry_date: residenceExpiryDate,
          residence_permit_blood_group: residencePermitBloodGroup,
          job_offer_doha_entry: jobOfferDohaEntry,
          joining_date: joiningDate,
          increment_month: incrementMonth,
          increment_amount: incrementAmount,
          basic: basic,
          general_allowance: generalAllowance,
          hra: hra,
          transportation_allowance: transportationAllowance,
          tel_allow: telAllowance,
          ticket_allowance: ticketAllowance,
          food_allowance: foodAllowance,
          medical_allowance: medicalAllowance,
          housing_allowance: housingAllowance,
          total: total,
          leave_ticket_entitlement: leaveTicketEntitlement,
          leave_ticket_days_per_year: leaveTicketDaysPerYear,
          driving_license_issue_date: drivingLicenseIssueDate,
          driving_license_expiry_date: driverLicenseExpiry,
          health_card_number: healthCardNum,
          health_card_issue_date: healthCardIssueDate,
          health_card_expiry_date: healthCardExpiry,
          bank_name: bankName,
          card_number: cardNum,
          recruited_by: recruitedBy,
          accommodation: accommodation,
          employee_type: employeeType,
          signature: "",
          project_manager: projectManager.code,
          immediate_superior: immediateSuperior.code,
          employment_status: employmentStatus,
          createdBy: name,
          createdAt: moment(new Date()).format("MM/DD/YYYY"),
          updatedBy: name,
          updatedAt: moment(new Date()).format("MM/DD/YYYY")
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("NEW",data)
          setIsLoading(true)
          if(data.error){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please make sure to input all required fields!',
            })
            setIsLoading(false)
          } else {
            let newEmployees = [...employees]
            newEmployees.push(data.data)
            setEmployees(newEmployees)
            handleRefresh()
            refetch()
            Swal.fire(
              'Success!',
              'Employee added successfully',
              'success'
            )
            setIsLoading(false)
          }
        })
    }

  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-4 offset-8 text-right">
          <EmployeeForm
            employees={employees}
            isLoading={isLoading}
            isEdit={isEdit}
            selectedEmployee={selectedEmployee}
            showForm={showForm}
            handleShowForm={handleShowForm}
            handleEmployeeCodeChange={handleEmployeeCodeChange}
            handleFullnameChange={handleFullnameChange}
            handleCostAllocationSiteChange={handleCostAllocationSiteChange}
            handleCostAllocationJTChange={handleCostAllocationJTChange}
            handleNationalityChange={handleNationalityChange}
            handleSponsorshipChange={handleSponsorshipChange}
            handleDOBSiteChange={handleDOBSiteChange}
            handlePassportNumChange={handlePassportNumChange}
            handlePassportDateIssuedChange={handlePassportDateIssuedChange}
            handlePassportExpiryChange={handlePassportExpiryChange}
            handleResidencePermitChange={handleResidencePermitChange}
            handleResidenceExpiryDateChange={handleResidenceExpiryDateChange}
            handleResidencePermitBloodGroupChange={handleResidencePermitBloodGroupChange}
            handleJobOfferDohaEntryChange={handleJobOfferDohaEntryChange}
            handleJoiningDateChange={handleJoiningDateChange}
            handleIncrementMonthChange={handleIncrementMonthChange}
            handleBasicChange={handleBasicChange}
            handleIncrementAmountChange={handleIncrementAmountChange}
            handleGeneralAllowanceChange={handleGeneralAllowanceChange}
            handleHRAChange={handleHRAChange}
            handleTransportationAllowanceChange={handleTransportationAllowanceChange}
            handleTelAllowanceChange={handleTelAllowanceChange}
            handleTicketAllowanceChange={handleTicketAllowanceChange}
            handleFoodAllowanceChange={handleFoodAllowanceChange}
            handleMedicalAllowanceChange={handleMedicalAllowanceChange}
            handleHousingAllowanceChange={handleHousingAllowanceChange}
            handleLeaveTicketEntitlementChange={handleLeaveTicketEntitlementChange}
            handleLeaveTicketDaysPerYearChange={handleLeaveTicketDaysPerYearChange}
            handleDrivingLicenseIssueDateChange={handleDrivingLicenseIssueDateChange}
            handleDriverLicenseExpiryChange={handleDriverLicenseExpiryChange}
            handleHealthCardNumChange={handleHealthCardNumChange}
            handleHealthCardIssueDateChange={handleHealthCardIssueDateChange}
            handleHealthCardExpiryChange={handleHealthCardExpiryChange}
            handleBankNameChange={handleBankNameChange}
            handleCardNumberChange={handleCardNumberChange}
            handleRecruitedByChange={handleRecruitedByChange}
            handleAccommodationChange={handleAccommodationChange}
            handleEmployeeTypeChange={handleEmployeeTypeChange}
            handleEmployementStatusChange={handleEmployementStatusChange}
            handleProjectManagerChange={handleProjectManagerChange}
            handleImmediateSuperior={handleImmediateSuperior}
            handleSignature={handleSignature}
            signatureUpload={signatureUpload}
            handleSubmit={handleSubmit}
            hideListEmployees={hideListEmployees}
            handleHideListEmployees={handleHideListEmployees}
            handleFilterEmployee={handleFilterEmployee}
            searchField={searchField}
            searchSupervisor={searchSupervisor}
            projectManager={projectManager}
            immediateSuperior={immediateSuperior}
            handleFilterImmdiateSuperior={handleFilterImmdiateSuperior}
            handleHideLisImmdiateSuperior={handleHideLisImmdiateSuperior}
            hideListImmediateSuperior={hideListImmediateSuperior}
          />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-1">
        </div> */}
        <Sidebar />
        <div className="main-panel">
          <Topbar />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 ">
                <div className="text-center">
                  <h1 className='pt-5 pb-3'>Employees</h1>
                </div>
                <div className='col-lg-12 justify-content-center'>
                  <Card>
                    <CardBody>
                      <EmployeesTable
                        data={employees}
                        handleShowForm={handleShowForm}
                        handleEdit={handleEdit}
                        isLoading={isLoading}
                        refetch={refetch}
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

export default Employees;