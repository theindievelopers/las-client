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
  // FormText
} from 'reactstrap';
import LeaveWorker from './LeaveWorker';
import LeaveStaff from './LeaveStaff';

const LeaveForm = ({ showForm, handleShowForm, handleFnameChange, employees, selectedEmployee, ...props }) => {
  const handleSelectedEmployee = (e) => {
    console.log(e)
  }



  const employeeList = employees.map((employee, i) => {
    return (
    <option key={i} value={employee.id} onClick={props.handleEmployeeSelect}>{employee.fname} {employee.lname}</option>
    )
  })
  return (
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"lg"}
        scrollable={true}
        onClosed={props.handleRefresh}
      >
        <ModalHeader
          toggle={handleShowForm}
        // style={{"backgroundColor": "black", "color": "white"}}
        >
          Apply Leave
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employee">Apply Leave For:</Label>
            <Input bsSize="sm"
              type="select"
              name="employee"
              id="employee"
              onChange={props.handleEmployeeSelect}
            >
              <option>-</option>
              {employeeList}
            </Input>
            {
              selectedEmployee[0].employee_type == "worker"
                ? <LeaveWorker 
                handleDepartureDate={props.handleDepartureDate}
                handleReturnDate={props.handleReturnDate}
                handleContactChange={props.handleContactChange}
                handleLeaveTypeChange={props.handleLeaveTypeChange}
                handleItemsIssuedChange={props.handleItemsIssuedChange}
                handleSpecifyChange={props.handleSpecifyChange}
                handlePassport={props.handlePassport}
                handleTicket={props.handleTicket}
                handleSettlement={props.handleSettlement}
                handleSpecifyRecievedOthers={props.handleSpecifyRecievedOthers}
                handleLeaveFrom={props.handleLeaveFrom}
                handleLeaveTo={props.handleLeaveTo}
                handleBackOn={props.handleBackOn}
                handleSubmitWorker={props.handleSubmitWorker}
                handleRecievedOthers={props.handleRecievedOthers}
                />
                : selectedEmployee[0].employee_type == "staff"
                  ? <LeaveStaff />
                  : ""
            }
          </FormGroup>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default LeaveForm;