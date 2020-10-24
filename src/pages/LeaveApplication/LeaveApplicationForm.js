/* eslint-disable array-callback-return */
import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import LeaveApplicationWorker from './LeaveApplicationWorker';

const LeaveApplicationForm = React.memo(({
  showForm, handleShowForm, isEdit, handleFilterEmployee, handleHideListEmployees, hideListEmployees, selectEmployeeForLeaveApplication,
  selectedEmployee, handleCountryDestinationChange, handleContactCountryDestinationChange, handleLeaveTypeChange,
  handleLeaveStartDate, handleLeaveEndDate, handleActualTravelDate, handleNoOfDaysApplied, handleDestination, submitWorker, noOfDaysApplied,
  selectedApplication,
  ...props
}) => {
  return(
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
          <Label for="employee">{isEdit ? "Update Leave For:" : "Apply Leave For:"}</Label>
          {isEdit ?
              <FormGroup>
                <Input bsSize="sm" type="text" readOnly={true} value={selectedApplication.application_data.name}/>
              </FormGroup>
            :
              <React.Fragment>
                <FormGroup>
                  <Input bsSize="sm" type="text" onChange={handleFilterEmployee} onClick={handleHideListEmployees} id="selectedEmployee" />
                  <Input bsSize="sm"
                    type="select"
                    multiple
                    hidden={hideListEmployees}
                  >
                    {selectEmployeeForLeaveApplication}
                  </Input>
                </FormGroup>
              </React.Fragment>
          }
          {isEdit && selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
            <LeaveApplicationWorker 
            selectedEmployee={selectedEmployee}
            handleCountryDestinationChange={handleCountryDestinationChange}
            handleContactCountryDestinationChange={handleContactCountryDestinationChange}
            handleLeaveTypeChange={handleLeaveTypeChange}
            handleLeaveStartDate={handleLeaveStartDate}
            handleLeaveEndDate={handleLeaveEndDate}
            handleActualTravelDate={handleActualTravelDate}
            handleNoOfDaysApplied={handleNoOfDaysApplied}
            handleDestination={handleDestination}
            submitWorker={submitWorker}
            isEdit={isEdit}
            noOfDaysApplied={noOfDaysApplied}
            selectedApplication={selectedApplication}
            />
            :
            isEdit && selectedApplication.application_form_code === "LEAVE_STAFF_APPLICATION" ?
            ""
            :
            selectedEmployee && selectedEmployee.employee_type === "worker" ?
            <LeaveApplicationWorker 
              selectedEmployee={selectedEmployee}
              handleCountryDestinationChange={handleCountryDestinationChange}
              handleContactCountryDestinationChange={handleContactCountryDestinationChange}
              handleLeaveTypeChange={handleLeaveTypeChange}
              handleLeaveStartDate={handleLeaveStartDate}
              handleLeaveEndDate={handleLeaveEndDate}
              handleActualTravelDate={handleActualTravelDate}
              handleNoOfDaysApplied={handleNoOfDaysApplied}
              handleDestination={handleDestination}
              submitWorker={submitWorker}
              isEdit={isEdit}
              noOfDaysApplied={noOfDaysApplied}
            />
            :
            selectedEmployee && selectedEmployee.employee_type === "staff" ?
            "Staff"
            : ""
          }
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default LeaveApplicationForm;