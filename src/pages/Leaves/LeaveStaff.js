import React from 'react'
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Spinner
} from 'reactstrap';

const LeaveStaff = React.memo(({isEdit,selectedLeave, filteredEmployees, isLoading, ...props}) => {

  const selectedHandOverEmp = filteredEmployees.map((employee, i) => {
      return (
        <option key={i} value={`${employee.fullname} / ${employee.code}`} onClick={props.handleHandoverSuccessorName}>{employee.fullname}</option>
      )
  })

  const selectedDocsEmp = filteredEmployees.map((employee, i) => {
    return (
      <option key={i} value={`${employee.fullname} / ${employee.code}`} onClick={props.handleHandoverDocsName}>{employee.fullname}</option>
    )
})
  return (
    <React.Fragment>
      <Row className="pt-3">
        <Col md={4}>
          <FormGroup>
            <Label for="departureDate">Departure Date: <span style={{color: "red"}}>*</span></Label>
            <Input bsSize="sm" type="date" name="departureDate" id="departureDate" placeholder="" onBlur={props.handleStaffDepartureDate} 
              defaultValue={isEdit ? selectedLeave.application_data.departure_date : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="returnDate">Return Date: <span style={{color: "red"}}>*</span></Label>
            <Input bsSize="sm" type="date" name="returnDate" id="returnDate" placeholder="" onBlur={props.handleStaffReturnDate} 
              defaultValue={isEdit ? selectedLeave.application_data.return_date : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="contact">Contact No.:</Label>
            <Input bsSize="sm" type="text" name="contact" id="contact" placeholder="Contact No." onBlur={props.handleStaffContactChange}
              defaultValue={isEdit ? selectedLeave.application_data.contact_number : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="leaveType">Leave Type: <span style={{color: "red"}}>*</span></Label>
            <Input bsSize="sm"
              type="select"
              name="leaveType"
              id="leaveType"
              onBlur={props.handleStaffLeaveTypeChange}
              defaultValue={isEdit ? selectedLeave.application_data.leave_type : ""}
            >
              <option>-</option>
              <option>Annual</option>
              <option>Unpaid</option>
              <option>Sick</option>
              <option>Emergency</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup check>
            <Input type="checkbox" name="handoverSuccessor" id="handoverSuccessor" onClick={props.handleHandoverSuccessor}
              defaultChecked={isEdit && selectedLeave.application_data.handover_briefing_to_successor ? true : false}
            />
            <Label for="handoverSuccessor" check>Handover briefing to successor</Label>
          </FormGroup>
          <FormGroup>
            <Label for="">Name/Employee No.:</Label>
            <Input bsSize="sm" type="text"
              onChange={props.filterHandoverSuccessorName} onClick={props.handleHideListHandoverSuccessorName} id="handoverSuccessorName"
              defaultValue={isEdit ? selectedLeave.application_data.handover_briefing_to_successor_employee_name : props.searchField}
            />
            <Input bsSize="sm"
                type="select"
                multiple
                hidden={props.hideListHandoverName}
              >
                {selectedHandOverEmp}
              </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup check>
            <Input type="checkbox" name="handoverDocs" id="handoverDocs" onClick={props.handleHandoverDocs} 
              defaultChecked={isEdit && selectedLeave.application_data.handover_documents ? true : false}
            />
            <Label for="handoverDocs" check>Handover Documents</Label>
          </FormGroup>
          <FormGroup>
            <Label for="handoverDocsName">Name/Employee No.:</Label>
            <Input bsSize="sm" type="text"
              onChange={props.filterHandoverDocsName} onClick={props.handleHideListHandoverDocsName} id="handoverDocsName"
              defaultValue={isEdit ? selectedLeave.application_data.handover_documents_employee_name : props.searchField}
            />
            <Input bsSize="sm"
                type="select"
                multiple
                hidden={props.hideListHandoverDocsName}
              >
                {selectedDocsEmp}
              </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="staffItemIssued">Items Issued:</Label>
            <Input bsSize="sm" type="text" name="staffItemIssued1" id="staffItemIssued1" placeholder="Item" onBlur={props.handleStaffItemsIssued1} 
              defaultValue={isEdit ? selectedLeave.application_data.items_issued : ""}
            />
            <Input bsSize="sm" type="text" name="staffItemIssued2" id="staffItemIssued2" placeholder="Item" onBlur={props.handleStaffItemsIssued2} 
              defaultValue={isEdit ? selectedLeave.application_data.items_issued2: ""}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="staffItemIssued" style={{color: 'white'}}>_</Label>
            <Input bsSize="sm" type="text" name="staffItemIssued3" id="staffItemIssued3" placeholder="Item" onBlur={props.handleStaffItemsIssued3} 
              defaultValue={isEdit ? selectedLeave.application_data.items_issued3 : ""}
            />
            <Input bsSize="sm" type="text" name="staffItemIssued4" id="staffItemIssued4" placeholder="Item" onBlur={props.handleStaffItemsIssued4} 
              defaultValue={isEdit ? selectedLeave.application_data.items_issued4 : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="staffRemarks">Remarks:</Label>
            <Input bsSize="sm" type="text" name="staffRemarks1" id="staffRemarks1" placeholder="Remarks" onBlur={props.handleStaffRemarks1} 
              defaultValue={isEdit ? selectedLeave.application_data.remarks : ""}
            />
            <Input bsSize="sm" type="text" name="staffRemarks2" id="staffRemarks2" placeholder="Remarks" onBlur={props.handleStaffRemarks2} 
              defaultValue={isEdit ? selectedLeave.application_data.remarks2 : ""}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="staffRemarks" style={{color: 'white'}}>_</Label>
            <Input bsSize="sm" type="text" name="staffRemarks3" id="staffRemarks3" placeholder="Remarks" onBlur={props.handleStaffRemarks3} 
              defaultValue={isEdit ? selectedLeave.application_data.remarks3 : ""}
            />
            <Input bsSize="sm" type="text" name="staffRemarks4" id="staffRemarks4" placeholder="Remarks" onBlur={props.handleStaffRemarks4} 
              defaultValue={isEdit ? selectedLeave.application_data.remarks4 : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h6>Employee Affidavit:</h6>
        </Col>
        <Col md={4}>
          <FormGroup check>
            <Input type="checkbox" name="ticket" id="ticket" onClick={props.handleStaffTicket} 
              defaultChecked={isEdit && selectedLeave.application_data.receive_ticket ? true : ""}
            />
            <Label for="ticket" check>Ticket</Label>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup check>
            <Input type="checkbox" name="settlement" id="settlement" onClick={props.handleStaffSettlement} 
              defaultChecked={isEdit && selectedLeave.application_data.receive_settlement ? true : ""}
            />
            <Label for="settlement" check>Settlement</Label>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup check>
            <Input type="checkbox" name="recievedOthers" id="settlement" onClick={props.handleStaffOthers} 
              defaultChecked={isEdit && selectedLeave.application_data.receive_others ? true : ""}
            />
            <Label for="recievedOthers" check>Others</Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label>Others (Specify):</Label>
            <Input bsSize="sm" type="text" placeholder="Specify" onBlur={props.handleSpecifyStaffOthers}
              defaultValue={isEdit ? selectedLeave.application_data.receive_others_remarks : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveFrom">Leave From:</Label>
            <Input bsSize="sm" type="date" name="leaveFrom" id="leaveFrom" placeholder="" onBlur={props.handleStaffLeaveFrom} 
              defaultValue={isEdit ? selectedLeave.application_data.leave_from : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveTo">Leave To:</Label>
            <Input bsSize="sm" type="date" name="leaveTo" id="leaveTo" placeholder="" onBlur={props.handleStaffLeaveTo} 
              defaultValue={isEdit ? selectedLeave.application_data.leave_to : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="backOn">Back On:</Label>
            <Input bsSize="sm" type="date" name="backOn" id="backOn" placeholder="" onBlur={props.handleStaffBackOn} 
              defaultValue={isEdit ? selectedLeave.application_data.be_back_on : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h6>Request for Airport Transportation:</h6>
        </Col>
        <Col md={6}>
          <FormGroup check>
            <Input type="checkbox" name="ticket" id="ticket2" onClick={props.handleStaffDepartureCheck} 
              defaultChecked={isEdit && selectedLeave.application_data.airport_transportation_departure_date !== "" ? true : ""}
            />
            <Label for="backOn">Departure Date:</Label>
            <Input bsSize="sm" type="date" name="backOn" id="backOn" placeholder="" onBlur={props.handleStaffDepartureDateAirport} 
              defaultValue={isEdit ? selectedLeave.application_data.airport_transportation_departure_date : ""}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup check>
            <Input type="checkbox" name="settlement" id="staffSettlement2" onClick={props.handleStaffArrivalCheck} 
              defaultChecked={isEdit && selectedLeave.application_data.airport_transportation_arrival_date !== "" ? true : ""}
            />
            <Label for="backOn">Arrival Date:</Label>
            <Input bsSize="sm" type="date" name="backOn" id="backOn" placeholder="" onBlur={props.handleStaffArrivalDateAirport} 
              defaultValue={isEdit ? selectedLeave.application_data.airport_transportation_arrival_date : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Accommodation:</Label>
            <Input bsSize="sm" type="text" placeholder="Specify" onBlur={props.handleStaffAccommodation}
              defaultValue={isEdit ? selectedLeave.application_data.airport_transportation_accommodation : ""}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Mobile No.:</Label>
            <Input bsSize="sm" type="text" placeholder="Specify" onBlur={props.handleStaffMobile}
              defaultValue={isEdit ? selectedLeave.application_data.airport_transportation_mobile_number : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="button" className="mr-auto"
        disabled={props.isLoading ? true : false}
        onClick={props.handleSubmitStaff}>
        {isEdit ? 
          isLoading ? <div className="px-3"><Spinner size="sm" color="light" /></div> 
          : "Update" 
          : isLoading ? <div className="px-3"><Spinner size="sm" color="light" /></div> 
          : "Submit" }
      </Button>
    </React.Fragment>
  )
})

export default LeaveStaff;