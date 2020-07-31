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
  FormText
} from 'reactstrap';

const EmployeeForm = ({ showForm, handleShowForm,handleFnameChange, ...props }) => {
  return (
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"xl"}
        scrollable={true}
      >
        <ModalHeader
          toggle={handleShowForm}
        // style={{"backgroundColor": "black", "color": "white"}}
        >
          Add Employee
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="fName">First Name:</Label>
                  <Input bsSize="sm" type="text" name="fName" id="fName" placeholder="First Name" onBlur={handleFnameChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="mName">Middle Name:</Label>
                  <Input bsSize="sm" type="text" name="mName" id="mName" placeholder="Middle Name" onBlur={props.handleMnameChange} 
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="lName">Last Name:</Label>
                  <Input bsSize="sm" type="text" name="lName" id="lName" placeholder="Last Name" onBlur={props.handleLnameChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="costAllocationSite">Cost Allocation Site:</Label>
                  <Input bsSize="sm" type="text" name="costAllocationSite" id="costAllocationSite" placeholder="Cost Allocation Site"  onBlur={props.handleCostAllocationSiteChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="costAllocationJobTitle">Cost Allocation Job Title:</Label>
                  <Input bsSize="sm" type="text" name="costAllocationJobTitle" id="costAllocationJobTitle" placeholder="Cost Allocation Job Title"  onBlur={props.handleCostAllocationJTChange} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="nationality">Nationality:</Label>
                  <Input bsSize="sm" type="text" name="nationality" id="nationality" placeholder="Nationality" onBlur={props.handleNationalityChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="employeeCode">Employee Code:</Label>
                  <Input bsSize="sm" type="text" name="employeeCode" id="employeeCode" placeholder="Employee Code"  onBlur={props.handleEmployeeCodeChange} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="sponsorship">Sponsorship:</Label>
                  <Input bsSize="sm" type="text" name="sponsorship" id="sponsorship" placeholder="Sponsorship"  onBlur={props.handleSponsorshipChange} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="dob">Date of Birth:</Label>
                  <Input bsSize="sm" type="date" name="dob" id="dob" placeholder=""  onBlur={props.handleDOBSiteChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="passportNumber">Passport No.:</Label>
                  <Input bsSize="sm" type="text" name="passportNumber" id="passportNumber" placeholder="Passport Number"  onBlur={props.handlePassportNumChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="passportDateIssued">Passport Date Issued:</Label>
                  <Input bsSize="sm" type="date" name="passportDateIssued" id="passportDateIssued" placeholder="" onBlur={props.handlePassportDateIssuedChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="passportExpiryDate">Passport Expiry Date:</Label>
                  <Input bsSize="sm" type="date" name="passportExpiryDate" id="passportExpiryDate" placeholder=""  onBlur={props.handlePassportExpiryChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="residencePermitNumber">Residence Permit No.:</Label>
                  <Input bsSize="sm" type="text" name="residencePermitNumber" id="residencePermitNumber" placeholder="Residence Permit No." onBlur={props.handleResidencePermitChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="residencePermitExpiryDate">Residence Permit Expiry Date:</Label>
                  <Input bsSize="sm" type="date" name="residencePermitExpiryDate" id="residencePermitExpiryDate" placeholder=""  onBlur={props.handleResidenceExpiryDateChange} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="residencePermitBloodGroup">Residence Permit Blood Group:</Label>
                  <Input bsSize="sm" type="text" name="residencePermitBloodGroup" id="residencePermitBloodGroup" placeholder="Passport Expiry Date"  onBlur={props.handleResidencePermitBloodGroupChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="jobOfferDohaEntry">Job Offer Doha Entry:</Label>
                  <Input bsSize="sm" type="text" name="jobOfferDohaEntry" id="jobOfferDohaEntry" placeholder="Job Offer Doha Entry"  onBlur={props.handleJobOfferDohaEntryChange} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="joiningDate">Joining Date:</Label>
                  <Input bsSize="sm" type="date" name="joiningDate" id="joiningDate" placeholder="Joining Date"  onBlur={props.handleJoiningDateChange} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="incermentMonth">Increment Month:</Label>
                  <Input bsSize="sm" type="number" name="incermentMount" id="incermentMount" placeholder="Increment Month" onBlur={props.handleIncrementMonthChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="incrementAmount">Increment Amount:</Label>
                  <Input bsSize="sm" type="number" name="incrementAmount" id="incrementAmount" placeholder="Increment Amount" onBlur={props.handleIncrementAmountChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="basic">Basic:</Label>
                  <Input bsSize="sm" type="number" name="basic" id="basic" placeholder="Basic" onBlur={props.handleBasicChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="generalAllowance">General Amount:</Label>
                  <Input bsSize="sm" type="number" name="generalAllowance" id="generalAllowance" placeholder="General Amount" onBlur={props.handleGeneralAllowanceChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="hra">HRA:</Label>
                  <Input bsSize="sm" type="number" name="hra" id="hra" placeholder="HRA" onBlur={props.handleHRAChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="transportationAllowance">Transportation Allowance:</Label>
                  <Input bsSize="sm" type="number" name="transportationAllowance" id="transportationAllowance" placeholder="Transportation Allowance" onBlur={props.handleTransportationAllowanceChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="telAllowance">Tel Allowance:</Label>
                  <Input bsSize="sm" type="number" name="telAllowance" id="telAllowance" placeholder="Tel Allowance" onBlur={props.handleTelAllowanceChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="ticketAllowance">Ticket Allowance:</Label>
                  <Input bsSize="sm" type="number" name="ticketAllowance" id="ticketAllowance" placeholder="Ticker Allowance" onBlur={props.handleTicketAllowanceChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="foodAllowance">Food Allowance:</Label>
                  <Input bsSize="sm" type="number" name="foodAllowance" id="foodAllowance" placeholder="Food Allowance" onBlur={props.handleFoodAllowanceChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="medicalAllowance">Medical Allowance:</Label>
                  <Input bsSize="sm" type="number" name="medicalAllowance" id="medicalAllowance" placeholder="Medical Allowance" onBlur={props.handleMedicalAllowanceChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="leaveTicketEntitlement">Leave Ticket Entitlement:</Label>
                  <Input bsSize="sm" type="number" name="leaveTicketEntitlement" id="leaveTicketEntitlement" placeholder="Leave Ticket Entitlement" onBlur={props.handleLeaveTicketEntitlementChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="leaveTicketDaysPerYear">Ticket Days Per Year:</Label>
                  <Input bsSize="sm" type="number" name="leaveTicketDaysPerYear" id="leaveTicketDaysPerYear" placeholder="" onBlur={props.handleLeaveTicketDaysPerYearChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="drivingLicenseIssueDate">Driving License Issue Date:</Label>
                  <Input bsSize="sm" type="date" name="drivingLicenseIssueDate" id="drivingLicenseIssueDate" placeholder="" onBlur={props.handleDrivingLicenseIssueDateChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="drivingLicenseExpiryDate">Driving License Expiry Date:</Label>
                  <Input bsSize="sm" type="date" name="drivingLicenseExpiryDate" id="drivingLicenseExpiryDate" placeholder="Driving License Expiry Date" onBlur={props.handleDriverLicenseExpiryChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="healthCardNumber">Helath Card No.:</Label>
                  <Input bsSize="sm" type="text" name="healthCardNumber" id="healthCardNumber" placeholder="Leave Ticket Entitlement" onBlur={props.handleHealthCardNumChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="healthCardIssueDate">Healt Card Issue Date:</Label>
                  <Input bsSize="sm" type="date" name="healthCardIssueDate" id="healthCardIssueDate" placeholder="Healt Card Issue Date" onBlur={props.handleHealthCardIssueDateChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="healthCardExpiryDate">Health Card Expiry Date:</Label>
                  <Input bsSize="sm" type="date" name="healthCardExpiryDate" id="healthCardExpiryDate" placeholder="Health Card Expiry Date" onBlur={props.handleHealthCardExpiryChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="bankName">Bank Name:</Label>
                  <Input bsSize="sm" type="text" name="bankName" id="bankName" placeholder="Bank Name" onBlur={props.handleBankNameChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="cardNumber">Card No.:</Label>
                  <Input bsSize="sm" type="text" name="cardNumber" id="cardNumber" placeholder="Card No." onBlur={props.handleCardNumberChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="recruitedBy">Recruited By:</Label>
                  <Input bsSize="sm" type="text" name="recruitedBy" id="recruitedBy" placeholder="Recruited By" onBlur={props.handleRecruitedByChange}/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="accommodation">Accommodation:</Label>
                  <Input bsSize="sm" type="text" name="accommodation" id="accommodation" placeholder="Accommodation" onBlur={props.handleAccommodationChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="employeeType">Employee Type:</Label>
                  <Input bsSize="sm"
                    type="select"
                    name="employeeType"
                    id="employeeType"
                    onBlur={props.handleEmployeeTypeChange}
                  >
                    <option>-</option>
                    <option>worker</option>
                    <option>staff</option>
                    
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="employmentStatus">Employment Status:</Label>
                  <Input bsSize="sm" type="text" name="employmentStatus" id="employmentStatus" placeholder="Employment Status" onBlur={props.handleEmployementStatusChange}/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="signature">Signature</Label>
              <Input type="file" name="signature" id="signature" accept="image/*" onChange={props.handleSignature}/>
              <FormText color="muted">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
              </FormText>
            </FormGroup>
            <Button type="button" className="mr-auto" 
            disabled={props.isLoading ? true : false}
            onClick={props.handleSubmit}>
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default EmployeeForm;