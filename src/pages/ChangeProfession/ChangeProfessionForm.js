import React, { useState, } from 'react'
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

const ChangeProfessionForm = React.memo(({ showForm, handleShowForm, handleRefresh, isEdit,
  handleFilterEmployee, selectEmployeeForChangeProfession, hideListEmployees, handleHideListEmployees,
  handleSubmit, isLoading, handleNewDesinationChange, selectedChangeProfessionRequest, selectedEmployee,
  designation, employeeCode, department, nationality,
  ...props }) => {
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
        <ModalHeader
          toggle={handleShowForm}
        >
          {isEdit ? "Update Change Profession" : "Apply Change Profession"}
          {isEdit ? "" :
            <FormText color="muted">
              All fields marked with <span style={{ color: "red" }}>*</span> are required
            </FormText>
          }
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employee">Apply Change Profession For:</Label>
            {isEdit ?
                <Input bsSize="sm" type="text" readOnly={true} value={selectedChangeProfessionRequest.application_data.name}/>
              :
                <React.Fragment>
                  <Input bsSize="sm" type="text" onChange={handleFilterEmployee} onClick={handleHideListEmployees} id="selectedEmployee" />
                  <Input bsSize="sm"
                    type="select"
                    multiple
                    hidden={hideListEmployees}
                  >
                    {selectEmployeeForChangeProfession}
                  </Input>
                </React.Fragment>
            }
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Designation:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedChangeProfessionRequest.application_data.designation : designation}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Employee No.:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedChangeProfessionRequest.application_data.employee_code : employeeCode}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Department/Project:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedChangeProfessionRequest.application_data.department : department}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Nationality:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedChangeProfessionRequest.application_data.nationality : nationality}/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <h6>SUGGESTED PROFESSION:</h6>
            <Label for="employee">New Designation:</Label>
            <Input bsSize="sm" type="text" defaultValue={isEdit ? selectedChangeProfessionRequest.application_data.new_designation : ""} onChange={handleNewDesinationChange}/>
          </FormGroup>
          <div className="pt-3">
            <Button type="button" className="mr-auto"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              {isLoading ? <div className="px-3"><Spinner size="sm" color="light" /></div> : "Submit"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default ChangeProfessionForm