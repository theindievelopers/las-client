import React from 'react'
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  // FormText
} from 'reactstrap';

const LeaveWorker = React.memo(({isEdit, selectedLeave, ...props}) => {
  return (
    <React.Fragment>
      <Row className="pt-3">
        <Col md={4}>
          <FormGroup>
            <Label for="departureDate">Departure Date: *</Label>
            <Input bsSize="sm" type="date" name="departureDate" id="departureDate" placeholder="" onBlur={props.handleDepartureDate} 
              defaultValue={isEdit ? selectedLeave.application_data.departure_date : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="returnDate">Return Date: *</Label>
            <Input bsSize="sm" type="date" name="returnDate" id="returnDate" placeholder="" onBlur={props.handleReturnDate} 
              defaultValue={isEdit ? selectedLeave.application_data.return_date : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="contact">Contact No.:</Label>
            <Input bsSize="sm" type="text" name="contact" id="contact" placeholder="Contact No." onBlur={props.handleContactChange}
              defaultValue={isEdit ? selectedLeave.application_data.contact_number : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveType">Leave Type: *</Label>
            <Input bsSize="sm"
              type="select"
              name="leaveType"
              id="leaveType"
              onBlur={props.handleLeaveTypeChange}
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
        <Col md={4}>
          <FormGroup>
            <Label for="itemsIssued">Items Issued:</Label>
            <Input bsSize="sm"
              type="select"
              name="itemsIssued"
              id="itemsIssued"
              onBlur={props.handleItemsIssuedChange}
              defaultValue={isEdit ? selectedLeave.application_data.items_issued_type : ""}
            >
              <option>-</option>
              <option>Tools</option>
              <option>Equipment</option>
              <option>Others</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="specify">Specify Items Issued:</Label>
            <Input bsSize="sm" type="text" name="specify" id="specify" placeholder="Specify" onBlur={props.handleSpecifyChange}
              defaultValue={isEdit ? selectedLeave.application_data.items_issued_others_remarks : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h6>Employee Affidavit:</h6>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="passport" id="passport" onClick={props.handlePassport}
              defaultChecked={isEdit && selectedLeave.application_data.receive_passport ? true : false}
            />
            <Label for="passport" check>Passport</Label>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="ticket" id="ticket" onClick={props.handleTicket}
              defaultChecked={isEdit && selectedLeave.application_data.receive_ticket ? true : false}
            />
            <Label for="ticket" check>Ticket</Label>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="settlement" id="settlement" onClick={props.handleSettlement}
              defaultChecked={isEdit && selectedLeave.application_data.receive_settlement ? true : false}
            />
            <Label for="settlement" check>Settlement</Label>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="recievedOthers" id="settlement" onClick={props.handleRecievedOthers}
              defaultChecked={isEdit && selectedLeave.application_data.receive_others ? true : false}
            />
            <Label for="recievedOthers" check>Others</Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="specifyItems">Others (Specify):</Label>
            <Input bsSize="sm" type="text" name="specifyItems" id="specifyItems" placeholder="Specify" onBlur={props.handleSpecifyRecievedOthers}
              defaultValue={isEdit ? selectedLeave.application_data.receive_others_remarks : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveFrom">Leave From: *</Label>
            <Input bsSize="sm" type="date" name="leaveFrom" id="leaveFrom" placeholder="" onBlur={props.handleLeaveFrom} 
              defaultValue={isEdit ? selectedLeave.application_data.leave_from : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveTo">Leave To: *</Label>
            <Input bsSize="sm" type="date" name="leaveTo" id="leaveTo" placeholder="" onBlur={props.handleLeaveTo}
              defaultValue={isEdit ? selectedLeave.application_data.leave_to : ""}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="backOn">Back On: *</Label>
            <Input bsSize="sm" type="date" name="backOn" id="backOn" placeholder="" onBlur={props.handleBackOn} 
              defaultValue={isEdit ? selectedLeave.application_data.be_back_on : ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="button" className="mr-auto"
        // disabled={props.isLoading ? true : false}
        onClick={props.handleSubmitWorker}>
        {isEdit ? "Update" : "Submit" }
      </Button>
    </React.Fragment>
  )
})

export default LeaveWorker;