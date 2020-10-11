import React from 'react';
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
import moment from 'moment';

const IncrementRequestForm = React.memo(({
    showForm, handleShowForm, handleRefresh, isEdit, selectedIncrementRequest, handleFilterEmployee, handleHideListEmployees,
    hideListEmployees, selectEmployeeForIncrementRequest, isLoading, handleSubmit, handleGradeChange, selectedChangeProfessionRequest,
    designation, employeeCode, department, nationality, handleDateChange,
  ...props}) => {
  return(
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
          {isEdit ? "Update Increment Request" : "Apply Increment Request"}
          {isEdit ? "" :
            <FormText color="muted">
              All fields marked with <span style={{ color: "red" }}>*</span> are required
            </FormText>
          }
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employee">Apply Increment Request For:</Label>
            {isEdit ?
                <Input bsSize="sm" type="text" readOnly={true} value={selectedIncrementRequest.application_data.name}/>
              :
                <React.Fragment>
                  <Input bsSize="sm" type="text" onChange={handleFilterEmployee} onClick={handleHideListEmployees} id="selectedEmployee" />
                  <Input bsSize="sm"
                    type="select"
                    multiple
                    hidden={hideListEmployees}
                  >
                    {selectEmployeeForIncrementRequest}
                  </Input>
                </React.Fragment>
            }
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Designation:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedIncrementRequest.application_data.designation : designation}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Employee No.:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedIncrementRequest.application_data.employee_code : employeeCode}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Department/Project:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedIncrementRequest.application_data.department : department}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Nationality:</Label>
                <Input bsSize="sm" type="text" readOnly={true} defaultValue={isEdit ? selectedIncrementRequest.application_data.nationality : nationality}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="employee">Grade (if applicable):</Label>
                <Input bsSize="sm" type="number" defaultValue={isEdit ? selectedIncrementRequest.application_data.grade : ""} onChange={handleGradeChange}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="employee">Date:</Label>
                <Input bsSize="sm" type="date" 
                  defaultValue={isEdit ? selectedIncrementRequest.application_data.date : moment(new Date()).format("YYYY-MM-DD")} onChange={handleDateChange}
                />
              </FormGroup>
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
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default IncrementRequestForm;