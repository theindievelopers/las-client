import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Spinner, Input, FormGroup, Label
} from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import LeaveApplicationWorkerPDF from '../../../components/PDForms/LeaveApplicationWorkerPDF'

const LeaveApplicationApprovalForm = React.memo(props => {
  const {
    showForm, handleShowForm, selectedApplication, selectedApplicationData, isReady, handleRefresh, hraManager, empCode,
    handleApproved, handleDeny, handleReview, projectManager, immediateSuperior, selectedApproval, accessLevel, handleEditSupervisorComments, handleShowSupervisorComments, hideSupervisorComments, handleSupervisorCommentsChange, isEdit,
    supervisorComments, handleSaveSupervisorComments, handleEditProjectManagerComments, handleShowProjectManagerComments,
    hideProjectManagerComments, handleProjectManagerCommentsChange, projectManagerComments, handleSaveProjectManagerComments,
    handleEditHraRemarks, handleShowHraRemarks, hideHraRemarks, handleSaveHraRemarks,
    handlePreviousLeaveDateChange, handlePreviousLeaveTypeChange, handlePreviousAnnualLeave, handleHraRemarksChange, hraRemarks,
  } = props
  return (
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"lg"}
        scrollable={true}
        onClosed={handleRefresh}
        keyboard={false}
        backdrop={"static"}
      >
        <ModalHeader
          toggle={handleRefresh}
        >
          Leave Details
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <h4>Employee No.: {selectedApplicationData.employee_code}</h4>
            </Col>
            <Col md={6}>
              <h4>Fullname: {selectedApplicationData.name}</h4>
            </Col>
            <Col md={6}>
              <h4>Department: {selectedApplicationData.project || selectedApplicationData.department}</h4>
            </Col>
            <Col md={6}>
              <h4>Position: {selectedApplicationData.designation}</h4>
            </Col>
            <Col md={12}>
              <hr />
              {selectedApplicationData.immediate_supervisor === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.supervisor_commentL1 || selectedApplicationData.supervisor_commentL2 ?
                      <Button color="secondary" onClick={handleEditSupervisorComments}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT SUPERVISOR COMMENTS
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowSupervisorComments}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD SUPERVISOR COMMENTS</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === selectedApplicationData.immediate_supervisor ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideSupervisorComments}>
                  <FormGroup>
                    <Label>
                      Supervisor Comments: <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      bsSize="sm"
                      type="textarea"
                      onBlur={handleSupervisorCommentsChange}
                      rows="4"
                      maxLength="200"
                      defaultValue={isEdit ? supervisorComments : ""}
                    />
                  </FormGroup>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveSupervisorComments} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowSupervisorComments}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {selectedApplicationData.project_manager === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.project_manager_comment ?
                      <Button color="secondary" onClick={handleEditProjectManagerComments}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT PROJECT MANAGER COMMENTS
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowProjectManagerComments}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD PROJECT MANAGER COMMENTS</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === selectedApplicationData.project_manager ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideProjectManagerComments}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Project Manager Comments: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          onBlur={handleProjectManagerCommentsChange}
                          maxLength="30"
                          defaultValue={isEdit ? projectManagerComments : ""}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ marginTop: 4, marginLeft: 15 }}>
                    <Button color="primary" onClick={handleSaveProjectManagerComments} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowProjectManagerComments}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {hraManager.code === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.hra_remarksL1 || selectedApplicationData.hra_remarksL2 || selectedApplicationData.hra_remarksL3 ?
                      <Button color="secondary" onClick={handleEditHraRemarks}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT HR REMARKS
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowHraRemarks}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD HR REMARKS</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === hraManager.code ?
                <div style={{ paddingBottom: 10, paddingTop: 52 }} hidden={hideHraRemarks}>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>
                          Previous Leave Date: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="date" onChange={handlePreviousLeaveDateChange} 
                          defaultValue={isEdit ? selectedApplication.application_data.previous_leave_date : ""}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>
                          Previous Leave Type: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm"
                          type="select"
                          name="leaveType"
                          id="leaveType"
                          onBlur={handlePreviousLeaveTypeChange}
                          defaultValue={isEdit ? selectedApplication.application_data.previous_leave_type : ""}
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
                        <Label>
                          Previous Annual Leave: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="date" onChange={handlePreviousAnnualLeave} 
                          defaultValue={isEdit ? selectedApplication.application_data.previous_annual_leave : ""}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                    <FormGroup>
                      <Label>
                        Remarks: <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        bsSize="sm"
                        type="textarea"
                        onBlur={handleHraRemarksChange}
                        rows="4"
                        maxLength="300"
                        defaultValue={isEdit ? hraRemarks : ""}
                      />
                    </FormGroup>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveHraRemarks} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowHraRemarks}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {isReady ?
                  <PDFViewer
                    width="763px" height="570px"
                  >
                    {selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
                      <LeaveApplicationWorkerPDF
                        applicationData={selectedApplicationData}
                        selectedApplication={selectedApplication}
                        hraManagerCode={hraManager.code}
                        projectManagerCode={projectManager.code}
                        immediateSuperiorCode={immediateSuperior.code}
                      /> 
                      :
                      ""
                    }
                  </PDFViewer>
                :
                <div style={{ paddingTop: "275px", paddingBottom: "275px" }}>
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner color="secondary" />
                  </div>
                </div>
              }
            </Col>
          </Row>
          <div className="float-right">
            <Button color="secondary" onClick={handleRefresh} style={{marginRight: "4px"}}>CANCEL</Button>
            {accessLevel !== 3 ?
              <React.Fragment>
                <Button color="primary" onClick={handleReview} style={{ marginRight: "4px" }}
                  disabled={selectedApplication.status === "DENIED" || selectedApplication.status === "APPROVED" || selectedApproval.status === "REVIEW" || selectedApproval.status === "APPROVED" || selectedApproval.status === "DENIED"}
                >REVIEW</Button>
                <Button color="danger" onClick={handleDeny} style={{ marginRight: "4px" }}
                  disabled={selectedApplication.status === "APPROVED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                >DENY</Button>
                <Button color="success" onClick={handleApproved}
                  disabled={selectedApplication.status === "DENIED" || selectedApplication.status === "APPROVED" || selectedApproval.status === "APPROVED"}
                >APPROVE</Button>
              </React.Fragment>
              : ""
            }
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default LeaveApplicationApprovalForm;