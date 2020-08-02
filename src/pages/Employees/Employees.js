import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Topbar from '../../Layout/Topbar'
import EmployeesTable from './EmployeesTable'
import EmployeeForm from './EmployeeForm'
import Axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const Employees = () => {
  const [employess, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowFrom] = useState(false)
  const [employeeCode, setEmployeeCode] = useState("")
  const [fname, setFname] = useState("")
  const [mname, setMname] = useState("")
  const [lname, setLname] = useState("")
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
  const [signature, setSignature] = useState("")

  useEffect(() => {
    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
          setIsLoading(false)
          setEmployees(data)
        }
      })
  }, [])
  
  const refetch = () => {
    setIsLoading(true)
    fetch('http://localhost:3000/employee')
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
          setIsLoading(false)
          setEmployees(data)
        }
      })
  }

  const handleRefresh = () => {
    setShowFrom(!showForm)
    setIsLoading(false)
    setEmployeeCode("")
    setFname("")
    setMname("")
    setLname("")
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
  }

  const handleShowForm = () => {
    setShowFrom(!showForm)
  }

  const handleEmployeeCodeChange = e => {
    setEmployeeCode(e.target.value)
  }

  const handleFnameChange = (e) => {
    setFname(e.target.value)
  }

  const handleMnameChange = (e) => {
    setMname(e.target.value)
  }

  const handleLnameChange = (e) => {
    setLname(e.target.value)
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
    setPassportDateIssued(e.target.value)
  }
  const handlePassportExpiryChange = e => {
    setPassportExpiry(e.target.value)
  }
  const handleResidencePermitChange = e => {
    setResidencePermit(e.target.value)
  }
  const handleResidenceExpiryDateChange = e => {
    setResidenceExpiryDate(e.target.value)
  }
  const handleResidencePermitBloodGroupChange = e => {
    setResidencePermitBloodGroup(e.target.value)
  }
  const handleJobOfferDohaEntryChange = e => {
    setJobOfferDohaEntry(e.target.value)
  }
  const handleJoiningDateChange = e => {
    setJoiningDate(e.target.value)
  }
  const handleIncrementMonthChange = e => {
    setIncrementMonth(e.target.value)
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
  const handleLeaveTicketEntitlementChange = e => {
    setLeaveTicketEntitlement(e.target.value)
  }
  const handleLeaveTicketDaysPerYearChange = e => {
    setLeaveTicketDaysPerYear(e.target.value)
  }
  const handleDrivingLicenseIssueDateChange = e => {
    setDrivingLicenseIssueDate(e.target.value)
  }
  const handleDriverLicenseExpiryChange = e => {
    setDriverLicenseExpiry(e.target.value)
  }
  const handleHealthCardNumChange = e => {
    setHealthCardNum(e.target.value)
  }
  const handleHealthCardIssueDateChange = e => {
    setHealthCardIssueDate(e.target.value)
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
  const handleSignature = e => {
    // let file = e.target.files[0];
    // if (file.type !== "image/png") {
    //   alert("Please Upload PNG file!")
    //   e.target.value = ""
    // } else if (file.size > 48999) {
    //   alert("File too large")
    //   e.target.value = ""
    // } else {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = function (e) {
    //     // The file's text will be printed here
    //     let imgBase64 = e.target.result
    //     console.log(imgBase64)
    //     setSignature(imgBase64)
    //   }
    // };
    setSignature(e.target.files[0])
  }

  const handleSubmit = () => {
    console.log(isLoading)
    let calc = [basic, generalAllowance, hra, transportationAllowance, telAllowance, ticketAllowance, foodAllowance, medicalAllowance]
    const total = calc.reduce((accumulator, currentValue) => accumulator + currentValue);

    const formData = new FormData();
    formData.append('code', employeeCode)
    formData.append('fname', fname)
    formData.append('mname', mname)
    formData.append('lname', lname)
    formData.append('cost_allocation_site', costAllocationSite)
    formData.append('cost_allocation_actual_job_title', costAllocationJT)
    formData.append('nationality', nationality)
    formData.append('sponsorship', sponsorship)
    formData.append('dob', dob)
    formData.append('passport_number', passportNum)
    formData.append('passport_date_of_issue', passportDateIssued)
    formData.append('passport_expiry_date', passportExpiry)
    formData.append('residence_permit_number', residencePermit)
    formData.append('residence_permit_expiry_date', residenceExpiryDate)
    formData.append('residence_permit_blood_group', residencePermitBloodGroup)
    formData.append('job_offer_doha_entry', jobOfferDohaEntry)
    formData.append('joining_date', joiningDate)
    formData.append('increment_month', incrementMonth)
    formData.append('increment_amount', incrementAmount)
    formData.append('basic', basic)
    formData.append('general_allowance', generalAllowance)
    formData.append('hra', hra)
    formData.append('transportation_allowance', transportationAllowance)
    formData.append('tel_allow', telAllowance)
    formData.append('ticket_allowance', ticketAllowance)
    formData.append('food_allowance', foodAllowance)
    formData.append('medical_allowance', medicalAllowance)
    formData.append('total', total)
    formData.append('leave_ticket_entitlement', leaveTicketEntitlement)
    formData.append('leave_ticket_days_per_year', leaveTicketDaysPerYear)
    formData.append('driving_license_issue_date', drivingLicenseIssueDate)
    formData.append('driving_license_expiry_date', driverLicenseExpiry)
    formData.append('health_card_number', healthCardNum)
    formData.append('health_card_issue_date', healthCardIssueDate)
    formData.append('health_card_expiry_date', healthCardExpiry)
    formData.append('bank_name', bankName)
    formData.append('card_number', cardNum)
    formData.append('recruited_by', recruitedBy)
    formData.append('accommodation', accommodation)
    formData.append('employee_type', employeeType)
    formData.append('employment_status', employmentStatus)
    formData.append('signature', signature, signature.name)
    formData.append('createdBy', sessionStorage.user)
    formData.append('createdAt', moment(new Date()).format("YYYY-MM-DD"))
    formData.append('updatedBy', sessionStorage.user)
    formData.append('updatedAt', moment(new Date()).format("YYYY-MM-DD"))
    const config = {
      headers: {
        // 'Access-Control-Allow-Origin-type': 'true',
        'content-type': 'multipart/form-data'
      }
    }
    if(employeeCode === "" || fname === "" || lname === "" || nationality === "" || dob === "" || employeeType === "" || employmentStatus === "") {
      return console.log("Please Input Required Feild")
    } else {
      Axios.post('http://localhost:3000/employees',formData, config)
        .then(res => {
          console.log(res)
          setIsLoading(true)
          if(res.data.error) {
            alert(res.data.error)
            setIsLoading(false)
          }else {
            let newEmployees = [...employess]
            newEmployees.push(res.data.data)
            setEmployees(newEmployees)
            // setShowFrom(false)
            handleRefresh()
            Swal.fire(
              'Success!',
              'Employee added successfully',
              'success'
            )
          }
        })
    }

  }

  return (
    <React.Fragment>
      <div className='d-flex'>
        <Sidebar />
        <div className='d-flex flex-column w-100'>
          <Topbar />
          <div className='content'>
            <div className="row">
              <div className="col-4 offset-8 text-right">
                <EmployeeForm
                  isLoading={isLoading}
                  showForm={showForm}
                  handleShowForm={handleShowForm}
                  handleEmployeeCodeChange={handleEmployeeCodeChange}
                  handleFnameChange={handleFnameChange}
                  handleMnameChange={handleMnameChange}
                  handleLnameChange={handleLnameChange}
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
                  handleSignature={handleSignature}
                  handleSignature={handleSignature}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className='col-lg-12 text-primary mt-5 py-3 ml-5'>Employees</h1>
            </div>
            <div className='col-lg-12 justify-content-center mb-3 ml-5 w-75'>
              <EmployeesTable
                data={employess}
                handleShowForm={handleShowForm}
                isLoading={isLoading}
                refetch={refetch}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Employees;