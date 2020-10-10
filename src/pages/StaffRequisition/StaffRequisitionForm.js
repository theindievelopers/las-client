import React, { useState } from 'react';
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
  FormText,
  Spinner
} from 'reactstrap';

const StaffRequisitionForm = ({showForm, handleRefresh,  handleShowForm,handleDepartmentChange,
  handleDateRequestChange, handleJobTitleChange,handleRequestReasonsChange,handleSubmit,handleFilterEmployee,selectProjSupvsr,hideProjSvsrList,
  handleHideProjSvsrList, handleTypeOfRequestChange, handleResourceAvailable,hideRequesterList, handleHideRequesterList, handleFilterRequester,
  selectRequester, isEdit, selectedStaffRequisition, requestReasons, projectManager, searchField,
  ...props}) => {

    console.log(projectManager)
  return (
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"lg"}
        scrollable={true}
        onClosed={handleRefresh}
        keyboard={false}
        backdrop="static"
      >
        <ModalHeader toggle={handleShowForm}>
          Staff Requisition
          <FormText color="muted">
            All fields marked with <span style={{ color: "red" }}>*</span> are
            required
          </FormText>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>
                  Requester: <span style={{ color: "red" }}>*</span>
                </Label>
                {isEdit ? 
                  <Input bsSize="sm" type="text" readOnly={true} value={selectedStaffRequisition.application_data.name}/>
                  :
                  <React.Fragment>
                    <Input bsSize="sm" type="text" onChange={handleFilterRequester} onClick={handleHideRequesterList} id="selectedRequester"/>
                    <Input bsSize="sm"
                      type="select"
                      multiple
                      hidden={hideRequesterList}
                    >
                      {selectRequester}
                    </Input>
                  </React.Fragment>
                }
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label>
                  Department/Project: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  bsSize="sm"
                  type="text"
                  onBlur={handleDepartmentChange}
                  defaultValue={isEdit ? selectedStaffRequisition.application_data.department : ""} 
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  Job Title: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input bsSize="sm" type="text" onBlur={handleJobTitleChange} defaultValue={isEdit ? selectedStaffRequisition.application_data.job_title : "" }/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  Type of Request: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input bsSize="sm" type="select" onChange={handleTypeOfRequestChange} defaultValue={isEdit ? selectedStaffRequisition.application_data.request_type : ""}>
                  <option>-</option>
                  <option>New</option>
                  <option>Replacement</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label>
                  Reason for Requesting: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  bsSize="sm"
                  type="textarea"
                  onBlur={handleRequestReasonsChange}
                  rows="4"
                  maxLength="325"
                  defaultValue={isEdit ? requestReasons : ""}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  Resource Availability: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input bsSize="sm" type="select" onChange={handleResourceAvailable} defaultValue={isEdit ? selectedStaffRequisition.application_data.resource_availability : ""}>
                  <option>-</option>
                  <option>Non-available</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <Label for="employee">Project Manager/Supervisor of Nominated Staff: <span style={{ color: "red" }}>*</span></Label>
              <Input bsSize="sm" type="text" onChange={handleFilterEmployee} onClick={handleHideProjSvsrList} id="selecdEmployee" 
                defaultValue={projectManager.code === undefined || !projectManager.code ? "" : isEdit ? `${projectManager.fullname}` : searchField}
              />
                <Input bsSize="sm"
                  type="select"
                  multiple
                  hidden={hideProjSvsrList}
                >
                  {selectProjSupvsr}
              </Input>
            </Col>
          </Row>
          <div className="pt-3">
            <Button
              type="button"
              className="mr-auto"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default StaffRequisitionForm;