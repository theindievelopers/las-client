import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Spinner, Input, FormGroup, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,CustomInput
} from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import LeaveApplicationWorkerPDF from '../../../components/PDForms/LeaveApplicationWorkerPDF';
import LeaveApplicationStaffPDF from '../../../components/PDForms/LeaveApplicationStaffPDF';

const LeaveApplicationApprovalForm = React.memo(props => {
  const {
    showForm, handleShowForm, selectedApplication, selectedApplicationData, isReady, handleRefresh, hraManager, empCode,
    handleApproved, handleDeny, handleReview, projectManager, immediateSuperior, selectedApproval, accessLevel, handleEditSupervisorComments, handleShowSupervisorComments, hideSupervisorComments, handleSupervisorCommentsChange, isEdit,
    supervisorComments, handleSaveSupervisorComments, handleEditProjectManagerComments, handleShowProjectManagerComments,
    hideProjectManagerComments, handleProjectManagerCommentsChange, projectManagerComments, handleSaveProjectManagerComments,
    handleEditHraRemarks, handleShowHraRemarks, hideHraRemarks, handleSaveHraRemarks,
    handlePreviousLeaveDateChange, handlePreviousLeaveTypeChange, handlePreviousAnnualLeave, handleHraRemarksChange, hraRemarks, ceo, coo,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAction = () => setDropdownOpen(prevState => !prevState);

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
              <div>
                {accessLevel === 1 ?
                  <div className="float-right mb-3 ml-2">
                    <Dropdown isOpen={dropdownOpen} toggle={toggleAction}>
                      <DropdownToggle>
                        ACTIONS
                          </DropdownToggle>
                      <DropdownMenu>
                        {selectedApplicationData.supervisor_commentL1 || selectedApplicationData.supervisor_commentL2 ?
                          <DropdownItem onClick={handleEditSupervisorComments}>EDIT SUPERVISOR COMMENTS</DropdownItem>
                          :
                          <DropdownItem onClick={handleShowSupervisorComments}>ADD SUPERVISOR COMMENTS</DropdownItem>
                        }
                        {selectedApplicationData.project_manager_comment ?
                          <DropdownItem onClick={handleEditProjectManagerComments}>EDIT PROJECT MANAGER COMMENT</DropdownItem>
                          :
                          <DropdownItem onClick={handleShowProjectManagerComments}>ADD PROJECT MANAGER COMMENT</DropdownItem>
                        }
                        {selectedApplicationData.hra_remarksL1 || selectedApplicationData.hra_remarksL2 || selectedApplicationData.hra_remarksL3 ?
                          <DropdownItem onClick={handleEditHraRemarks}>EDIT HR REMARKS</DropdownItem>
                          :
                          <DropdownItem onClick={handleShowHraRemarks}>ADD HR REMARKS</DropdownItem>
                        }
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  : ""
                }
                {selectedApplicationData.immediate_supervisor === empCode ?
                  <React.Fragment>
                    <div className="float-right mb-3 ml-2">
                      {selectedApplicationData.supervisor_commentL1 || selectedApplicationData.supervisor_commentL2 || selectedApplicationData.immediate_supervisor_commentL1 || selectedApplicationData.immediate_supervisor_commentL2 ?
                        <Button color="secondary" onClick={handleEditSupervisorComments}
                          disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >
                          EDIT SUPERVISOR COMMENTS
                              </Button>
                        :
                        <Button color="secondary" onClick={handleShowSupervisorComments}
                          disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
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
                        rows="1"
                        maxLength={selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ? 200 : 110}
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
                      {selectedApplicationData.project_manager_comment || selectedApplicationData.project_manager_commentL1 || selectedApplicationData.project_manager_commentL2 ?
                        <Button color="secondary" onClick={handleEditProjectManagerComments}
                          disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >
                          EDIT PROJECT MANAGER COMMENTS
                              </Button>
                        :
                        <Button color="secondary" onClick={handleShowProjectManagerComments}
                          disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >ADD PROJECT MANAGER COMMENTS</Button>
                      }
                    </div>
                  </React.Fragment>
                  : ""
                }
                {accessLevel === 1 || empCode === selectedApplicationData.project_manager ?
                  <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideProjectManagerComments}>
                    {selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ?
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
                      :
                      <FormGroup>
                        <Label>
                          Project Manager Comments: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          bsSize="sm"
                          type="textarea"
                          onBlur={handleProjectManagerCommentsChange}
                          rows="1"
                          maxLength={110}
                          defaultValue={isEdit ? projectManagerComments : ""}
                        />
                      </FormGroup>
                    }
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
                      {selectedApplicationData.hra_remarksL1 || selectedApplicationData.hra_remarksL2 || selectedApplicationData.hra_remarksL3 || selectedApplicationData.hra_remarks || selectedApplicationData.accrued_leave_days ?
                        <Button color="secondary" onClick={handleEditHraRemarks}
                          disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >
                          EDIT HR REMARKS
                              </Button>
                        :
                        <Button color="secondary" onClick={handleShowHraRemarks}
                          disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
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
                            onChange={handlePreviousLeaveTypeChange}
                            value={props.previousLeaveType}
                            // defaultValue={isEdit ? props.previousLeaveType : ""}
                          >
                            <option value="-">-</option>
                            <option value="Annual" >Annual</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Sick">Sick</option>
                            <option value="Emergency">Emergency</option>
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
                      {selectedApplication.application_form_code === "LEAVE_STAFF_APPLICATION" ?
                        <React.Fragment>
                          <Col md={4}>
                            <FormGroup>
                              <Label>Accrued Leave Days:</Label>
                              <Input bsSize="sm" type="text" placeholder="Accrued Leave Days" onBlur={props.handleAccruedLeaveDays}
                                defaultValue={isEdit ? selectedApplication.application_data.accrued_leave_days : ""}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label>
                                Family Ticket Entitlement: <span style={{ color: "red" }}>*</span>
                              </Label>
                              <Input bsSize="sm"
                                type="select"
                                name="familyTicketEntitlement"
                                id="familyTicketEntitlement"
                                onChange={props.handleFamilyTicketEntitlement}
                                value={props.familyTitcketEntitlement}
                                defaultValue={isEdit ? selectedApplication.application_data.family_ticket_entitlement : ""}
                              >
                                <option>-</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <FormGroup>
                              <div style={{ paddingLeft: 5, paddingTop: 30 }}>
                                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Wife" onClick={props.handleWife} disabled={props.disableFamilyTicket}
                                  defaultChecked={isEdit && selectedApplication.application_data.ticket_wife ? true : false }
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <FormGroup>
                              <div style={{ paddingLeft: 5, paddingTop: 30 }} >
                                <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Children" onClick={props.handleChildren} disabled={props.disableFamilyTicket}
                                  defaultChecked={isEdit && selectedApplication.application_data.ticket_children ? true : false }
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label>Ticket Entitlement/Route:</Label>
                              <Input bsSize="sm" type="text" placeholder="Ticket Entitlement/Route" onBlur={props.handleTicketEntitlementRoute}
                                defaultValue={isEdit ? selectedApplication.application_data.ticket_entitlement_route : ""}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label>
                                Released: <span style={{ color: "red" }}>*</span>
                              </Label>
                              <Input bsSize="sm"
                                type="select"
                                name="released"
                                id="released"
                                onChange={props.handleReleased}
                                value={props.released}
                                defaultValue={isEdit ? selectedApplicationData.released : ""}
                              >
                                <option>-</option>
                                <option>Yes</option> 
                                <option>No</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label>Remarks:</Label>
                              <Input bsSize="sm" type="text" placeholder="Remarks" onBlur={props.handleHraRemarksChange} maxLength="25"
                                defaultValue={isEdit ? selectedApplication.application_data.hra_remarks : ""}
                              />
                            </FormGroup>
                          </Col>
                        </React.Fragment>
                        :
                        <Col md={12}>
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
                        </Col>
                      }
                    </Row>
                    <div style={{ marginTop: 4 }}>
                      <Button color="primary" onClick={handleSaveHraRemarks} style={{ marginRight: "4px" }}>SUBMIT</Button>
                      <Button color="secondary" onClick={handleShowHraRemarks}>CANCEL</Button>
                    </div>
                  </div>

                  : ""
                }
                {ceo.code === empCode ?
                  <React.Fragment>
                    <div className="float-right mb-3 ml-2">
                      {selectedApplicationData.ceo_remarks ?
                        <Button color="secondary" onClick={props.handleEditCEORemarks}
                          disabled={ !isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >
                          EDIT REMARKS
                          </Button>
                        :
                        <Button color="secondary" onClick={props.handleShowCEORemarks}
                          disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >ADD REMARKS</Button>
                      }
                    </div>
                  </React.Fragment>
                  : ""
                }
                {accessLevel === 1 || empCode === ceo.code ?
                  <div  style={{ paddingBottom: 10, paddingTop: 10 }} hidden={props.hideCEORemarks}>
                    <Row>
                      <Col md={4}>
                          <FormGroup>
                            <Label>
                              CEO Remarks: <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input bsSize="sm" type="text" maxLength="25"
                              onBlur={props.handleCEORemarksChange} defaultValue={isEdit ? selectedApplicationData.ceo_remarks : ""} 
                              />
                          </FormGroup>
                        </Col>
                    </Row>
                    <div style={{ marginTop: 4, marginLeft: 15 }}>
                      <Button color="primary" onClick={props.handleSaveCEORemarks} style={{ marginRight: "4px" }}>SUBMIT</Button>
                      <Button color="secondary" onClick={props.handleShowCEORemarks}>CANCEL</Button>
                    </div>
                  </div>
                  : ""
                }
                {coo.code === empCode ?
                  <React.Fragment>
                    <div className="float-right mb-3 ml-2">
                      {selectedApplicationData.coo_remarks ?
                        <Button color="secondary" onClick={props.handleEditCOORemarks}
                          disabled={ !isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >
                          EDIT REMARKS
                          </Button>
                        :
                        <Button color="secondary" onClick={props.handleShowCOORemarks}
                          disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                        >ADD REMARKS</Button>
                      }
                    </div>
                  </React.Fragment>
                  : ""
                }
                {accessLevel === 1 || empCode === coo.code ?
                  <div  style={{ paddingBottom: 10, paddingTop: 10 }} hidden={props.hideCOORemarks}>
                    <Row>
                      <Col md={4}>
                          <FormGroup>
                            <Label>
                              COO Remarks: <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input bsSize="sm" type="text" maxLength="25"
                              onBlur={props.handleCOORemarksChange} defaultValue={isEdit ? selectedApplicationData.coo_remarks : ""} 
                              />
                          </FormGroup>
                        </Col>
                    </Row>
                    <div style={{ marginTop: 4, marginLeft: 15 }}>
                      <Button color="primary" onClick={props.handleSaveCOORemarks} style={{ marginRight: "4px" }}>SUBMIT</Button>
                      <Button color="secondary" onClick={props.handleShowCOORemarks}>CANCEL</Button>
                    </div>
                  </div>
                  : ""
                }
              </div>
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
                    <LeaveApplicationStaffPDF
                      applicationData={selectedApplicationData}
                      selectedApplication={selectedApplication}
                      hraManagerCode={hraManager.code}
                      projectManagerCode={projectManager.code}
                      immediateSuperiorCode={immediateSuperior.code}
                      ceoCode={ceo.code}
                      cooCode={coo.code}
                    />
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
            <Button color="secondary" onClick={handleRefresh} style={{ marginRight: "4px" }}>CANCEL</Button>
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