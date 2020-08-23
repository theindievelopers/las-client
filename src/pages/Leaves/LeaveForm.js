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
import LeaveWorker from './LeaveWorker';
import LeaveStaff from './LeaveStaff';

const LeaveForm = ({ showForm, handleShowForm, handleFnameChange, employees, selectedEmployee, isEdit, selectedLeave, ...props }) => {
  const [selected, setSelected] = useState(selectedEmployee[0])
  const employeeList = employees.map((employee, i) => {
    if(employee.signature !== ""){
      return (
        <option key={i} value={employee.id} onClick={props.handleEmployeeSelect}>{employee.fullname}</option>
      )
    }
  })
  return (
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"lg"}
        scrollable={true}
        onClosed={props.handleRefresh}
        keyboard={false}
        backdrop="static"
      >
        <ModalHeader
          toggle={handleShowForm}
        >
          {isEdit ? "Update Leave" : "Apply Leave"}
          {isEdit ? "" :
            <FormText color="muted">
              All fields marked with * are required
            </FormText>
          }
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employee">{isEdit ? "Update Leave For:" : "Apply Leave For:"}</Label>
            {isEdit ?
              <Input bsSize="sm" type="text" value={selectedLeave.application_data.name}/>
            :
              <Input bsSize="sm"
                type="select"
                name="employee"
                id="employee"
                onChange={props.handleEmployeeSelect}
              >
                <option>-</option>
                {employeeList}
              </Input>
            }
            {isEdit && selectedLeave.application_form_code == "LEAVE_WORKER" ?
              <LeaveWorker
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
                selectedLeave={selectedLeave}
                isEdit={isEdit}
              />
              :
              isEdit && selectedLeave.application_form_code == "LEAVE_STAFF" ?
                <LeaveStaff
                  selectedEmployee={selectedEmployee[0]}
                  handleStaffDepartureDate={props.handleStaffDepartureDate}
                  handleStaffReturnDate={props.handleStaffReturnDate}
                  handleStaffContactChange={props.handleStaffContactChange}
                  handleStaffLeaveTypeChange={props.handleStaffLeaveTypeChange}
                  handleHandoverSuccessor={props.handleHandoverSuccessor}
                  handleHandoverSuccessorName={props.handleHandoverSuccessorName}
                  handleHandoverDocs={props.handleHandoverDocs}
                  handleHandoverDocsName={props.handleHandoverDocsName}
                  handleStaffItemsIssued1={props.handleStaffItemsIssued1}
                  handleStaffItemsIssued2={props.handleStaffItemsIssued2}
                  handleStaffItemsIssued3={props.handleStaffItemsIssued3}
                  handleStaffItemsIssued4={props.handleStaffItemsIssued4}
                  handleStaffRemarks1={props.handleStaffRemarks1}
                  handleStaffRemarks2={props.handleStaffRemarks2}
                  handleStaffRemarks3={props.handleStaffRemarks3}
                  handleStaffRemarks4={props.handleStaffRemarks4}
                  handleStaffTicket={props.handleStaffTicket}
                  handleStaffSettlement={props.handleStaffSettlement}
                  handleStaffOthers={props.handleStaffOthers}
                  handleSpecifyStaffOthers={props.handleSpecifyStaffOthers}
                  handleStaffLeaveFrom={props.handleStaffLeaveFrom}
                  handleStaffLeaveTo={props.handleStaffLeaveTo}
                  handleStaffBackOn={props.handleStaffBackOn}
                  handleStaffDepartureCheck={props.handleStaffDepartureCheck}
                  handleStaffDepartureDateAirport={props.handleStaffDepartureDateAirport}
                  handleStaffArrivalCheck={props.handleStaffArrivalCheck}
                  handleStaffArrivalDateAirport={props.handleStaffArrivalDateAirport}
                  handleStaffAccommodation={props.handleStaffAccommodation}
                  handleStaffMobile={props.handleStaffMobile}
                  handleSubmitStaff={props.handleSubmitStaff}
                  selectedLeave={selectedLeave}
                  isEdit={isEdit}
                  selectedLeave={selectedLeave}
                  isEdit={isEdit}
                />
                :
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
                    ?
                    <LeaveStaff
                      selectedEmployee={selectedEmployee[0]}
                      handleStaffDepartureDate={props.handleStaffDepartureDate}
                      handleStaffReturnDate={props.handleStaffReturnDate}
                      handleStaffContactChange={props.handleStaffContactChange}
                      handleStaffLeaveTypeChange={props.handleStaffLeaveTypeChange}
                      handleHandoverSuccessor={props.handleHandoverSuccessor}
                      handleHandoverSuccessorName={props.handleHandoverSuccessorName}
                      handleHandoverDocs={props.handleHandoverDocs}
                      handleHandoverDocsName={props.handleHandoverDocsName}
                      handleStaffItemsIssued1={props.handleStaffItemsIssued1}
                      handleStaffItemsIssued2={props.handleStaffItemsIssued2}
                      handleStaffItemsIssued3={props.handleStaffItemsIssued3}
                      handleStaffItemsIssued4={props.handleStaffItemsIssued4}
                      handleStaffRemarks1={props.handleStaffRemarks1}
                      handleStaffRemarks2={props.handleStaffRemarks2}
                      handleStaffRemarks3={props.handleStaffRemarks3}
                      handleStaffRemarks4={props.handleStaffRemarks4}
                      handleStaffTicket={props.handleStaffTicket}
                      handleStaffSettlement={props.handleStaffSettlement}
                      handleStaffOthers={props.handleStaffOthers}
                      handleSpecifyStaffOthers={props.handleSpecifyStaffOthers}
                      handleStaffLeaveFrom={props.handleStaffLeaveFrom}
                      handleStaffLeaveTo={props.handleStaffLeaveTo}
                      handleStaffBackOn={props.handleStaffBackOn}
                      handleStaffDepartureCheck={props.handleStaffDepartureCheck}
                      handleStaffDepartureDateAirport={props.handleStaffDepartureDateAirport}
                      handleStaffArrivalCheck={props.handleStaffArrivalCheck}
                      handleStaffArrivalDateAirport={props.handleStaffArrivalDateAirport}
                      handleStaffAccommodation={props.handleStaffAccommodation}
                      handleStaffMobile={props.handleStaffMobile}
                      handleSubmitStaff={props.handleSubmitStaff}
                    />
                    : ""
            }
          </FormGroup>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default LeaveForm;