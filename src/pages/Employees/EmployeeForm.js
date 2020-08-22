import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText, Card, CardImg,
  Spinner
} from 'reactstrap';

const EmployeeForm = ({ showForm, handleShowForm, handleFnameChange, isEdit, selectedEmployee, ...props }) => {
  return (
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"xl"}
        scrollable={true}
        keyboard={false}
        backdrop="static"
      >
        <ModalHeader
          toggle={handleShowForm}
        >
          {isEdit ? "Update" : "Add"} Employee
          {isEdit ? "" :
            <FormText color="muted">
              All fields marked with * are required
            </FormText>
          }
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="employeeCode">Employee Code: *</Label>
                  <Input bsSize="sm" type="text" name="employeeCode" id="employeeCode" placeholder="Employee Code" onBlur={props.handleEmployeeCodeChange}
                    defaultValue={isEdit ? selectedEmployee.code : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="employeeType">Employee Type: *</Label>
                  <Input bsSize="sm"
                    type="select"
                    name="employeeType"
                    id="employeeType"
                    onBlur={props.handleEmployeeTypeChange}
                    defaultValue={isEdit ? selectedEmployee.employee_type : ""}
                  >
                    <option>-</option>
                    <option>worker</option>
                    <option>staff</option>

                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="employmentStatus">Employment Status: *</Label>
                  <Input bsSize="sm" type="text" name="employmentStatus" id="employmentStatus" placeholder="Employment Status" onBlur={props.handleEmployementStatusChange}
                    defaultValue={isEdit ? selectedEmployee.employment_status : ""}
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="fullname">Full Name: *</Label>
                  <Input bsSize="sm" type="text" name="fullname" id="fullname" placeholder="Full Name" onBlur={props.handleFullnameChange}
                    defaultValue={isEdit ? selectedEmployee.fullname : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="nationality">Nationality: *</Label>
                  <Input bsSize="sm" type="text" name="nationality" id="nationality" placeholder="Nationality" onBlur={props.handleNationalityChange}
                    defaultValue={isEdit ? selectedEmployee.nationality : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="dob">Date of Birth: *</Label>
                  <Input bsSize="sm" type="date" name="dob" id="dob" placeholder="" onBlur={props.handleDOBSiteChange}
                    defaultValue={isEdit ? selectedEmployee.dob : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="costAllocationSite">Cost Allocation Site:</Label>
                  <Input bsSize="sm" type="text" name="costAllocationSite" id="costAllocationSite" placeholder="Cost Allocation Site" onBlur={props.handleCostAllocationSiteChange}
                    defaultValue={isEdit ? selectedEmployee.cost_allocation_site : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="costAllocationJobTitle">Cost Allocation Job Title:</Label>
                  <Input bsSize="sm" type="text" name="costAllocationJobTitle" id="costAllocationJobTitle" placeholder="Cost Allocation Job Title" onBlur={props.handleCostAllocationJTChange}
                    defaultValue={isEdit ? selectedEmployee.cost_allocation_actual_job_title : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="sponsorship">Sponsorship:</Label>
                  <Input bsSize="sm" type="text" name="sponsorship" id="sponsorship" placeholder="Sponsorship" onBlur={props.handleSponsorshipChange}
                    defaultValue={isEdit ? selectedEmployee.sponsorship : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="passportNumber">Passport No.: *</Label>
                  <Input bsSize="sm" type="text" name="passportNumber" id="passportNumber" placeholder="Passport Number" onBlur={props.handlePassportNumChange}
                    defaultValue={isEdit ? selectedEmployee.passport_number : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="passportDateIssued">Passport Date Issued: *</Label>
                  <Input bsSize="sm" type="date" name="passportDateIssued" id="passportDateIssued" placeholder="" onBlur={props.handlePassportDateIssuedChange}
                    defaultValue={isEdit ? selectedEmployee.passport_date_of_issue : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="passportExpiryDate">Passport Expiry Date: *</Label>
                  <Input bsSize="sm" type="date" name="passportExpiryDate" id="passportExpiryDate" placeholder="" onBlur={props.handlePassportExpiryChange}
                    defaultValue={isEdit ? selectedEmployee.passport_expiry_date : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="residencePermitNumber">Residence Permit No.: *</Label>
                  <Input bsSize="sm" type="text" name="residencePermitNumber" id="residencePermitNumber" placeholder="Residence Permit No." onBlur={props.handleResidencePermitChange}
                    defaultValue={isEdit ? selectedEmployee.residence_permit_number : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="residencePermitExpiryDate">Residence Permit Expiry Date: *</Label>
                  <Input bsSize="sm" type="date" name="residencePermitExpiryDate" id="residencePermitExpiryDate" placeholder="" onBlur={props.handleResidenceExpiryDateChange}
                    defaultValue={isEdit ? selectedEmployee.residence_permit_expiry_date : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="residencePermitBloodGroup">Residence Permit Blood Group:</Label>
                  <Input bsSize="sm" type="text" name="residencePermitBloodGroup" id="residencePermitBloodGroup" placeholder="Residence Permit Blood Group" onBlur={props.handleResidencePermitBloodGroupChange}
                    defaultValue={isEdit ? selectedEmployee.residence_permit_blood_group : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="jobOfferDohaEntry">Job Offer Doha Entry:</Label>
                  <Input bsSize="sm" type="text" name="jobOfferDohaEntry" id="jobOfferDohaEntry" placeholder="Job Offer Doha Entry" onBlur={props.handleJobOfferDohaEntryChange}
                    defaultValue={isEdit ? selectedEmployee.job_offer_doha_entry : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="joiningDate">Joining Date: *</Label>
                  <Input bsSize="sm" type="date" name="joiningDate" id="joiningDate" placeholder="Joining Date" onBlur={props.handleJoiningDateChange}
                    defaultValue={isEdit ? selectedEmployee.joining_date : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="incermentMonth">Increment Month:</Label>
                  <Input bsSize="sm" type="number" name="incermentMount" id="incermentMount" placeholder="Increment Month" onBlur={props.handleIncrementMonthChange}
                    defaultValue={isEdit ? selectedEmployee.increment_month : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="incrementAmount">Increment Amount:</Label>
                  <Input bsSize="sm" type="number" name="incrementAmount" id="incrementAmount" placeholder="Increment Amount" onBlur={props.handleIncrementAmountChange}
                    defaultValue={isEdit ? selectedEmployee.increment_amount : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="basic">Basic:</Label>
                  <Input bsSize="sm" type="number" name="basic" id="basic" placeholder="Basic" onBlur={props.handleBasicChange}
                    defaultValue={isEdit ? selectedEmployee.basic : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="generalAllowance">General Allowance:</Label>
                  <Input bsSize="sm" type="number" name="generalAllowance" id="generalAllowance" placeholder="General Amount" onBlur={props.handleGeneralAllowanceChange}
                    defaultValue={isEdit ? selectedEmployee.general_allowance : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="hra">HRA:</Label>
                  <Input bsSize="sm" type="number" name="hra" id="hra" placeholder="HRA" onBlur={props.handleHRAChange}
                    defaultValue={isEdit ? selectedEmployee.hra : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="transportationAllowance">Transportation Allowance:</Label>
                  <Input bsSize="sm" type="number" name="transportationAllowance" id="transportationAllowance" placeholder="Transportation Allowance" onBlur={props.handleTransportationAllowanceChange}
                    defaultValue={isEdit ? selectedEmployee.transportation_allowance : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="telAllowance">Tel Allowance:</Label>
                  <Input bsSize="sm" type="number" name="telAllowance" id="telAllowance" placeholder="Tel Allowance" onBlur={props.handleTelAllowanceChange}
                    defaultValue={isEdit ? selectedEmployee.tel_allow : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="ticketAllowance">Ticket Allowance:</Label>
                  <Input bsSize="sm" type="number" name="ticketAllowance" id="ticketAllowance" placeholder="Ticker Allowance" onBlur={props.handleTicketAllowanceChange}
                    defaultValue={isEdit ? selectedEmployee.ticket_allowance : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="foodAllowance">Food Allowance:</Label>
                  <Input bsSize="sm" type="number" name="foodAllowance" id="foodAllowance" placeholder="Food Allowance" onBlur={props.handleFoodAllowanceChange}
                    defaultValue={isEdit ? selectedEmployee.food_allowance : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="medicalAllowance">Medical Allowance:</Label>
                  <Input bsSize="sm" type="number" name="medicalAllowance" id="medicalAllowance" placeholder="Medical Allowance" onBlur={props.handleMedicalAllowanceChange}
                    defaultValue={isEdit ? selectedEmployee.medical_allowance : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="leaveTicketEntitlement">Leave Ticket Entitlement:</Label>
                  <Input bsSize="sm" type="number" name="leaveTicketEntitlement" id="leaveTicketEntitlement" placeholder="Leave Ticket Entitlement" onBlur={props.handleLeaveTicketEntitlementChange}
                    defaultValue={isEdit ? selectedEmployee.leave_ticket_entitlement : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="leaveTicketDaysPerYear">Ticket Days Per Year:</Label>
                  <Input bsSize="sm" type="number" name="leaveTicketDaysPerYear" id="leaveTicketDaysPerYear" placeholder="" onBlur={props.handleLeaveTicketDaysPerYearChange}
                    defaultValue={isEdit ? selectedEmployee.leave_ticket_days_per_year : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="drivingLicenseIssueDate">Driving License Issue Date: *</Label>
                  <Input bsSize="sm" type="date" name="drivingLicenseIssueDate" id="drivingLicenseIssueDate" placeholder="" onBlur={props.handleDrivingLicenseIssueDateChange}
                    defaultValue={isEdit ? selectedEmployee.driving_license_issue_date : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="drivingLicenseExpiryDate">Driving License Expiry Date: *</Label>
                  <Input bsSize="sm" type="date" name="drivingLicenseExpiryDate" id="drivingLicenseExpiryDate" placeholder="Driving License Expiry Date" onBlur={props.handleDriverLicenseExpiryChange}
                    defaultValue={isEdit ? selectedEmployee.driving_license_expiry_date : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="healthCardNumber">Helath Card No.: *</Label>
                  <Input bsSize="sm" type="text" name="healthCardNumber" id="healthCardNumber" placeholder="Leave Ticket Entitlement" onBlur={props.handleHealthCardNumChange}
                    defaultValue={isEdit ? selectedEmployee.health_card_number : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="healthCardIssueDate">Healt Card Issue Date: *</Label>
                  <Input bsSize="sm" type="date" name="healthCardIssueDate" id="healthCardIssueDate" placeholder="Healt Card Issue Date" onBlur={props.handleHealthCardIssueDateChange}
                    defaultValue={isEdit ? selectedEmployee.health_card_issue_date : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="healthCardExpiryDate">Health Card Expiry Date: *</Label>
                  <Input bsSize="sm" type="date" name="healthCardExpiryDate" id="healthCardExpiryDate" placeholder="Health Card Expiry Date" onBlur={props.handleHealthCardExpiryChange}
                    defaultValue={isEdit ? selectedEmployee.health_card_expiry_date : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="bankName">Bank Name:</Label>
                  <Input bsSize="sm" type="text" name="bankName" id="bankName" placeholder="Bank Name" onBlur={props.handleBankNameChange}
                    defaultValue={isEdit ? selectedEmployee.bank_name : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="cardNumber">Card No.:</Label>
                  <Input bsSize="sm" type="text" name="cardNumber" id="cardNumber" placeholder="Card No." onBlur={props.handleCardNumberChange}
                    defaultValue={isEdit ? selectedEmployee.card_number : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="recruitedBy">Recruited By:</Label>
                  <Input bsSize="sm" type="text" name="recruitedBy" id="recruitedBy" placeholder="Recruited By" onBlur={props.handleRecruitedByChange}
                    defaultValue={isEdit ? selectedEmployee.recruited_by : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="projectManager">Prject Manager:</Label>
                  <Input bsSize="sm" type="text" name="projectManager" id="projectManager" placeholder="Prject Manager" onBlur={props.handleProjectManagerChange}
                    defaultValue={isEdit ? selectedEmployee.recruited_by : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="immediateSuperior">Immediate Superior:</Label>
                  <Input bsSize="sm" type="text" name="immediateSuperior" id="immediateSuperior" placeholder="Immediate Superior" onBlur={props.handleImmediateSuperior}
                    defaultValue={isEdit ? selectedEmployee.recruited_by : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="accommodation">Accommodation:</Label>
                  <Input bsSize="sm" type="text" name="accommodation" id="accommodation" placeholder="Accommodation" onBlur={props.handleAccommodationChange}
                    defaultValue={isEdit ? selectedEmployee.accommodation : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            {isEdit ? 
              <Row>
                <Col md={6}>
                  {props.signatureUpload || selectedEmployee.signature ?
                    <img className="signature" width="100px" src={`http://localhost:3000/fetch/signature?id=${selectedEmployee.id}`} />
                    :
                    ""
                  }
                  <FormGroup>
                    <Label for="signature">Signature</Label>
                    <Input type="file" name="file" id="signature" onChange={props.handleSignature}/>
                  </FormGroup>
                </Col>
              </Row>
              : ""
            }
            <div className="pt-3">
              <Button type="button" className="mr-auto"
                disabled={props.isLoading ? true : false}
                onClick={props.handleSubmit}>
                {isEdit ? "Update" : "Submit"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default EmployeeForm;