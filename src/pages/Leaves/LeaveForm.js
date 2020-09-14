import React, { useState, } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import LeaveWorker from './LeaveWorker';
import LeaveStaff from './LeaveStaff';

const LeaveForm = React.memo(({ showForm, handleShowForm, handleFnameChange, employees, selectedEmployee, isEdit, isLoading, selectedLeave,empCode,
  accessLevel,handleFilterEmployee,searchField,handleHideListEmployees,hideListEmployees, ...props }) => {

  const filteredEmployees = employees.filter(employee => {
    return employee.fullname.toLowerCase().includes(searchField.toLowerCase());
  })

  const selectEmployeeForLeave = filteredEmployees.map((employee, i) => {
    if((employee.signature !== "" && employee.signature !== null) && (employee.project_manager !== "" && employee.project_manager !== null && employee.immediate_superior !== "" && employee.immediate_superior !== null)){
      if (accessLevel === 1 || accessLevel === 3 || empCode === employee.code) {
        return (
          <option key={i} value={employee.id} onClick={props.handleEmployeeSelect}>{employee.fullname}</option>
        )
      }
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
              All fields marked with <span style={{color: "red"}}></span>* are required
            </FormText>
          }
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employee">{isEdit ? "Update Leave For:" : "Apply Leave For:"}</Label>
            {isEdit ?
              <Input bsSize="sm" type="text" readOnly={true} value={selectedLeave.application_data.name}/>
            :
              <React.Fragment>
                <Input bsSize="sm" type="text" onChange={handleFilterEmployee} onClick={handleHideListEmployees} value={selectedEmployee[0].fullname}/>
                <Input bsSize="sm"
                  type="select"
                  multiple
                  hidden={hideListEmployees}
                >
                  {selectEmployeeForLeave}
                </Input>
              </React.Fragment>
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
                isLoading={isLoading}
              />
              :
              isEdit && selectedLeave.application_form_code == "LEAVE_STAFF" ?
                <LeaveStaff
                  selectedEmployee={selectedEmployee[0]}
                  employees={props.employees}
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
                  isLoading={isLoading}
                  selectedLeave={selectedLeave}
                  hideListHandoverName={props.hideListHandoverName}
                  handleHideListHandoverSuccessorName={props.handleHideListHandoverSuccessorName}
                  searchField={props.searchField}
                  filterHandoverSuccessorName={props.filterHandoverSuccessorName}
                  employees={props.employees}
                  filteredEmployees={filteredEmployees}
                  hideListHandoverDocsName={props.hideListHandoverDocsName}
                  handleHideListHandoverDocsName={props.handleHideListHandoverDocsName}
                  filterHandoverDocsName={props.filterHandoverDocsName}
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
                    isLoading={isLoading}
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
                      hideListHandoverName={props.hideListHandoverName}
                      handleHideListHandoverSuccessorName={props.handleHideListHandoverSuccessorName}
                      searchField={props.searchField}
                      filterHandoverSuccessorName={props.filterHandoverSuccessorName}
                      employees={props.employees}
                      filteredEmployees={filteredEmployees}
                      hideListHandoverDocsName={props.hideListHandoverDocsName}
                      handleHideListHandoverDocsName={props.handleHideListHandoverDocsName}
                      filterHandoverDocsName={props.filterHandoverDocsName}
                      isLoading={isLoading}
                    />
                    : ""
            }
          </FormGroup>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default LeaveForm;