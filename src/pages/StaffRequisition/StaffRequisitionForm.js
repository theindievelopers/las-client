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
  handleDateRequestChange, handleJobTitleChange,handleRequestReasonsChange,handleSubmit,
  ...props}) => {
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
            <Col md={6}>
              <FormGroup>
                <Label>
                  Department/Project: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  bsSize="sm"
                  type="text"
                  onBlur={handleDepartmentChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  Date Request: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  bsSize="sm"
                  type="date"
                  onBlur={handleDateRequestChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  Job Title: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input bsSize="sm" type="text" onBlur={handleJobTitleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  Type of Request: <span style={{ color: "red" }}>*</span>
                </Label>
                <Input bsSize="sm" type="select">
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
                />
              </FormGroup>
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