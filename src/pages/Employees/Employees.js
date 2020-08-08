import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Topbar from '../../Layout/Topbar'
import EmployeesTable from './EmployeesTable'
import EmployeeForm from './EmployeeForm'
import Axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Card,CardBody } from 'reactstrap'

const Employees = () => {
  const [signatureUpload, setSignatureUpload] = useState({})
  const [employess, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsedit] = useState(false)
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
  const [createdBy, setCreatedBy] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [empSign, setEmpSign] = useState()
  const [selectedEmployee, setSelectedEmployee] = useState([])

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

  const handleShowForm = (employee) => {
    setShowFrom(!showForm)
    setIsedit(false)
  }

  const handleEdit = (employee) => {
    setShowFrom(!showForm)
    setIsedit(true)
    setSelectedEmployee(employee)
    setEmployeeCode(employee.code)
    setFname(employee.fname)
    setMname(employee.mname)
    setLname(employee.lname)
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
    console.log(employee)
  }

  const handleEmployeeCodeChange = (e) => {
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
    console.log(e.target.value)
    setAccommodation(e.target.value)
  }
  const handleEmployeeTypeChange = e => {
    setEmployeeType(e.target.value)
  }
  const handleEmployementStatusChange = e => {
    setEmployementStatus(e.target.value)
  }
  const handleSignature = e => {
    e.preventDefault();
    setSignature(e.target.files[0])
    if(e.target.files[0] && e.target.files[0].size > 48999) {
      e.target.value = ""
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File is too big! Please upload 48kb or less.',
      })
    } else if(e.target.files[0] && e.target.files[0].type !== "image/png") {
      e.target.value = ""
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload PNG file!',
      })
    } else {
      const formData = new FormData()
      formData.append('upload_image', e.target.files[0])
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      Axios.post(`http://localhost:3000/upload/signature?id=${selectedEmployee.id}`, formData, config)
        .then(res => setSignature(res.data.data.signature))

    }
  }

  const handleSubmit = () => {
    let calc = [basic, generalAllowance, hra, transportationAllowance, telAllowance, ticketAllowance, foodAllowance, medicalAllowance]
    const total = calc.reduce((accumulator, currentValue) => accumulator + currentValue);
    if(fname === "" || lname === "" || employeeCode === "" || dob === "" || nationality === "" || passportNum === "" || residencePermit === "" || healthCardNum === "") {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to input all required fields!',
      })
    }
    if (isEdit) {
      fetch(`http://localhost:3000/employees?id=${selectedEmployee.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: employeeCode,
          fname: fname,
          mname: mname,
          lname: lname,
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
          employment_status: employmentStatus,
          createdBy: createdBy,
          createdAt: createdAt,
          updatedBy: sessionStorage.user,
          updatedAt: moment(new Date()).format("YYYY-MM-DD")
        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.success){
            setIsedit(false)
            handleRefresh()
            refetch()
            setShowFrom(false)
            Swal.fire(
              'Success!',
              'Employee has been updated successfully!',
              'success'
            )
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      fetch('http://localhost:3000/employees', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: employeeCode,
          fname: fname,
          mname: mname,
          lname: lname,
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
          employment_status: employmentStatus,
          createdBy: sessionStorage.user,
          createdAt: moment(new Date()).format("YYYY-MM-DD"),
          updatedBy: sessionStorage.user,
          updatedAt: moment(new Date()).format("YYYY-MM-DD")
        })
      })
        .then(res => res.json())
        .then(data => {
          setIsLoading(true)
          console.log(data)
          if(data.error){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please make sure to input all required fields!',
            })
            setIsLoading(false)
          } else {
            setIsLoading(true)
            let newEmployees = [...employess]
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
            isLoading={isLoading}
            isEdit={isEdit}
            selectedEmployee={selectedEmployee}
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
            handleSubmit={handleSubmit}
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
                        data={employess}
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
}

export default Employees;