import React, { useState } from 'react'
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText
} from 'reactstrap';

const LeaveWorker = (props) => {
  return (
    <React.Fragment>
      <Row className="pt-3">
        <Col md={4}>
          <FormGroup>
            <Label for="departureDate">Departure Date:</Label>
            <Input bsSize="sm" type="date" name="departureDate" id="departureDate" placeholder="" onBlur={props.handleDepartureDate} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="returnDate">Return Date:</Label>
            <Input bsSize="sm" type="date" name="returnDate" id="returnDate" placeholder="" onBlur={props.handleReturnDate} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="contact">Contact No.:</Label>
            <Input bsSize="sm" type="text" name="contact" id="contact" placeholder="Contact No." onBlur={props.handleContactChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveType">Leave Type:</Label>
            <Input bsSize="sm"
              type="select"
              name="leaveType"
              id="leaveType"
              onBlur={props.handleLeaveTypeChange}
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
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="passport" id="passport" onClick={props.handlePassport}/>
            <Label for="passport" check>Passport</Label>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="ticket" id="ticket" onClick={props.handleTicket}/>
            <Label for="ticket" check>Ticket</Label>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="settlement" id="settlement" onClick={props.handleSettlement}/>
            <Label for="settlement" check>Settlement</Label>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup check>
            <Input type="checkbox" name="recievedOthers" id="settlement" onClick={props.handleRecievedOthers}/>
            <Label for="recievedOthers" check>Others</Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="specifyItems">Others (Specify):</Label>
            <Input bsSize="sm" type="text" name="specifyItems" id="specifyItems" placeholder="Specify" onBlur={props.handleSpecifyRecievedOthers}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveFrom">Leave From:</Label>
            <Input bsSize="sm" type="date" name="leaveFrom" id="leaveFrom" placeholder="" onBlur={props.handleLeaveFrom} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="leaveTo">Leave To:</Label>
            <Input bsSize="sm" type="date" name="leaveTo" id="leaveTo" placeholder="" onBlur={props.handleLeaveTo} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="backOn">Back On:</Label>
            <Input bsSize="sm" type="date" name="backOn" id="backOn" placeholder="" onBlur={props.handleBackOn} />
          </FormGroup>
        </Col>
      </Row>
      <Button type="button" className="mr-auto"
        // disabled={props.isLoading ? true : false}
        onClick={props.handleSubmitWorker}>
        Submit
      </Button>
    </React.Fragment>
  )
}

export default LeaveWorker;