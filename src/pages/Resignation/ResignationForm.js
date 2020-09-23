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

const ResignationForm = React.memo(({ showForm, handleShowForm, handleRefresh, isEdit, employees, handleFilterEmployee, handleHideListEmployees, hideListEmployees, selectEmployeeForResignation,
  selectedEmployee, handleEffectiveResignationDate, handleResignationReasonL1, handleResignationReasonL2, handleResignationReasonL3, handleResignationReasonL4, handleSubmit, isLoading,
  effectiveResignationDate, resignationReasonL1, resignationReasonL2, resignationReasonL3, resignationReasonL4, selectedResignation,
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
          {isEdit ? "Update Resignation" : "Apply Resignation"}
          {isEdit ? "" :
            <FormText color="muted">
              All fields marked with <span style={{ color: "red" }}></span>* are required
            </FormText>
          }
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employee">Apply Resignation For:</Label>
            {isEdit ?
              <Input bsSize="sm" type="text" readOnly={true} value={selectedResignation.application_data.name}/>
            :
              <React.Fragment>
                <Input bsSize="sm" type="text" onChange={handleFilterEmployee} onClick={handleHideListEmployees} id="selecdEmployee" />
                <Input bsSize="sm"
                  type="select"
                  multiple
                  hidden={hideListEmployees}
                >
                  {selectEmployeeForResignation}
                </Input>
              </React.Fragment>
            }
          </FormGroup>
          {selectedEmployee.length > 0 ?
            <React.Fragment>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Effective Resignation Date: <span style={{ color: "red" }}>*</span></Label>
                    <Input bsSize="sm" type="date" onBlur={handleEffectiveResignationDate}
                      defaultValue={isEdit ? effectiveResignationDate : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Reason For Resignation <span style={{ color: "red" }}>*</span></Label>
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleResignationReasonL1} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} 
                    defaultValue={isEdit ? selectedResignation.application_data.reason_for_resignationL1 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleResignationReasonL2} style={{ borderRadius: 0 }} 
                    defaultValue={isEdit ? selectedResignation.application_data.reason_for_resignationL2 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleResignationReasonL3} style={{ borderRadius: 0 }} 
                    defaultValue={isEdit ? selectedResignation.application_data.reason_for_resignationL3 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleResignationReasonL4} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} 
                    defaultValue={isEdit ? selectedResignation.application_data.reason_for_resignationL4 : ""}
                  />
                </Col>
              </Row>
              <div className="pt-3">
                <Button type="button" className="mr-auto"
                onClick={handleSubmit}
                disabled={isLoading ? true : false}
                >
                  {isLoading ? <div className="px-3"><Spinner size="sm" color="light" /></div> : "Submit"}
              </Button>
              </div>
            </React.Fragment>
            : ""
          }
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default ResignationForm