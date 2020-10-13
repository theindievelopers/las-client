import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Spinner, ModalFooter,
  Input, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  FormGroup
} from 'reactstrap';
import IncrementRequestPDF from '../../../components/PDForms/IncrementRequestPDF';

const IncrementRequestApprovalForm = React.memo(({
  showForm, handleShowForm, handleRefresh, selectedApplicationData, isReady, selectedApplication,
  empCode, projectManager, immediateSupervisor, hraManager, coo, ceo, handleEditSupervisorNotes,
  handleShowSupervisorNotes, selectedApproval, accessLevel, hideSupervisorNotes, handleSupervisorNotesChange,
  handleSaveSupervisorNotes, isEdit, supervisorNotes, handleEditProjectManagerNotes, handleShowProjectManagerNotes,
  hideProjectManagerNotes, handleProjectManagerNotesChange, projectManagerNotes, handleSaveProjectManagerNotes,
  handleEditManagementDesicion, handleShowManagementDesicion, hideManagementDesicion, handleNewBasicChange,
  handleNewTransportationChange, handleNewGeneralAllowanceChange, handleNewTelephoneAllowanceChange,
  handleNewHousingAllowance, handleNewFoodAllowanceChange, handleNewSalaryEffectivedateChange,
  handleHRNotesChange, handleSaveMangementDesicion, handleDateOfLastIncrementChange, handleEditCEONotes,
  handleShowCEONotes, hideCEONotes, handleCEONotesChange, handleSaveCEONotes, handleEditCOONotes, handleShowCOONotes,
  hideCOONotes, handleCOONotesChange, handleSaveCOONotes, handleReview, handleDeny, handleApproved,
  ...props}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAction = () => setDropdownOpen(prevState => !prevState);
  return(
    <React.Fragment>
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size={"lg"}
        scrollable={true}
        onClosed={handleRefresh}
        keyboard={false}
        backdrop={"static"}
        returnFocusAfterClose={false}
      >
        <ModalHeader
          toggle={handleRefresh}
        >
          Increment Request Details
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
              {accessLevel === 1 ?
                <div className="float-right mb-3 ml-2">
                  <Dropdown isOpen={dropdownOpen} toggle={toggleAction}>
                    <DropdownToggle>
                      ACTIONS
                    </DropdownToggle>
                    <DropdownMenu>
                      {selectedApplicationData.supervisor_notesL1 || selectedApplicationData.supervisor_notesL2 || selectedApplicationData.supervisor_notesL3 ?
                        <DropdownItem onClick={handleEditSupervisorNotes}>EDIT SUPERVISOR JUSTIFICATION</DropdownItem>
                        :
                        <DropdownItem onClick={handleShowSupervisorNotes}>ADD SUPERVISOR JUSTIFICATION</DropdownItem>
                      }
                      {selectedApplicationData.project_manager_notesL1 || selectedApplicationData.project_manager_notesL2 || selectedApplicationData.project_manager_notesL3 ?
                        <DropdownItem onClick={handleEditProjectManagerNotes}>EDIT PROJECT MANAGER NOTES</DropdownItem>
                        : 
                        <DropdownItem onClick={handleShowProjectManagerNotes}>ADD PROJECT MANAGER NOTES</DropdownItem>
                      }
                      {selectedApplicationData.new_basic || selectedApplicationData.new_food_allowance || selectedApplicationData.new_general_allowance || selectedApplicationData.new_housing_allowance || 
                        selectedApplicationData.new_tel_allowance || selectedApplicationData.new_transportation_allowance ?
                        <DropdownItem onClick={handleEditManagementDesicion}>EDIT MANAGEMENT DESICION</DropdownItem>
                        :
                        <DropdownItem onClick={handleShowManagementDesicion}>ADD MANAGEMENT DESICION</DropdownItem>
                      }
                      {selectedApplicationData.coo_notes ?
                        <DropdownItem onClick={handleEditCOONotes}>EDIT COO NOTES</DropdownItem>
                        :
                        <DropdownItem onClick={handleShowCOONotes}>ADD COO NOTES</DropdownItem>
                      }
                      {selectedApplicationData.ceo_notes ?
                        <DropdownItem onClick={handleEditCEONotes}>EDIT CEO NOTES</DropdownItem>
                        :
                        <DropdownItem onClick={handleShowCEONotes}>ADD CEO NOTES</DropdownItem>
                      }
                    </DropdownMenu>
                  </Dropdown>
                </div>
                : ""
              }
              {selectedApplicationData.immediate_supervisor === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.supervisor_notesL1 || selectedApplicationData.supervisor_notesL2 || selectedApplicationData.supervisor_notesL3 ?
                      <Button color="secondary" onClick={handleEditSupervisorNotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT SUPERVISOR NOTES
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowSupervisorNotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD SUPERVISOR NOTES</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === selectedApplicationData.immediate_supervisor ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideSupervisorNotes}>
                  <FormGroup>
                    <Label>
                      Supervisor Notes: <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      bsSize="sm"
                      type="textarea"
                      onBlur={handleSupervisorNotesChange}
                      rows="4"
                      maxLength="230"
                      defaultValue={isEdit ? supervisorNotes : ""}
                    />
                  </FormGroup>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveSupervisorNotes} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowSupervisorNotes}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {selectedApplicationData.project_manager === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.project_manager_notesL1 || selectedApplicationData.project_manager_notesL2 || selectedApplicationData.project_manager_notesL3 ?
                      <Button color="secondary" onClick={handleEditProjectManagerNotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT NOTES
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowProjectManagerNotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD NOTES</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === selectedApplicationData.project_manager ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideProjectManagerNotes}>
                  <FormGroup>
                    <Label>
                      Project Manger Notes: <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      bsSize="sm"
                      type="textarea"
                      onBlur={handleProjectManagerNotesChange}
                      rows="4"
                      maxLength="230"
                      defaultValue={isEdit ? projectManagerNotes : ""}
                    />
                  </FormGroup>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveProjectManagerNotes} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowProjectManagerNotes}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {hraManager.code === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.new_basic || selectedApplicationData.new_food_allowance || selectedApplicationData.new_general_allowance || selectedApplicationData.new_housing_allowance || 
                      selectedApplicationData.new_tel_allowance || selectedApplicationData.new_transportation_allowance ?
                      <Button color="secondary" onClick={handleEditManagementDesicion}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT MANAGEMENT DESICION
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowManagementDesicion}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >MANAGEMENT DESICION</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === hraManager.code ?
                <div style={{ paddingBottom: 10, paddingTop: 52 }} hidden={hideManagementDesicion}>
                  <Label>
                    CHANGE IN SALARY:
                  </Label>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Basic: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="number" onBlur={handleNewBasicChange} defaultValue={isEdit ? selectedApplicationData.new_basic : selectedApplicationData.basic} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Transportation Allowance: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="number" onBlur={handleNewTransportationChange} defaultValue={isEdit ? selectedApplicationData.new_transportation_allowance : selectedApplicationData.transportation_allowance} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          General Allowance: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="number" onBlur={handleNewGeneralAllowanceChange} defaultValue={isEdit ? selectedApplicationData.new_general_allowance : selectedApplicationData.general_allowance} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Telephone Allowance: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="number" onBlur={handleNewTelephoneAllowanceChange} defaultValue={isEdit ? selectedApplicationData.new_tel_allowance : selectedApplicationData.tel_allowance} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Housing Allowance: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="number" onBlur={handleNewHousingAllowance} defaultValue={isEdit ? selectedApplicationData.new_housing_allowance : selectedApplicationData.housing_allowance} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Food Allowance: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="number" onBlur={handleNewFoodAllowanceChange} defaultValue={isEdit ? selectedApplicationData.new_food_allowance : selectedApplicationData.food_allowance} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Date of Last Increment: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="date" onBlur={handleDateOfLastIncrementChange} defaultValue={isEdit ? selectedApplicationData.date_of_last_increment : ""} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Effective Date: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="date" onBlur={handleNewSalaryEffectivedateChange} defaultValue={isEdit ? selectedApplicationData.effective_date : ""} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Notes: <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input bsSize="sm" type="text"  maxLength="25"
                          onBlur={handleHRNotesChange} defaultValue={isEdit ? selectedApplicationData.hr_manager_notes : ""} 
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveMangementDesicion} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowManagementDesicion}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {ceo.code === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.ceo_notes ?
                      <Button color="secondary" onClick={handleEditCEONotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT NOTES
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowCEONotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD NOTES</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === ceo.code ?
                <div  style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideCEONotes}>
                  <Row>
                    <Col md={4}>
                        <FormGroup>
                          <Label>
                            CEO Notes: <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input bsSize="sm" type="text" maxLength="25"
                            onBlur={handleCEONotesChange} defaultValue={isEdit ? selectedApplicationData.ceo_notes : ""} 
                            />
                        </FormGroup>
                      </Col>
                  </Row>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveCEONotes} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowCEONotes}>CANCEL</Button>
                  </div>
                </div>
                : ""
              }
              {coo.code === empCode ?
                <React.Fragment>
                  <div className="float-right mb-3 ml-2">
                    {selectedApplicationData.coo_notes ?
                      <Button color="secondary" onClick={handleEditCOONotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT NOTES
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowCOONotes}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD NOTES</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === coo.code ?
                <div  style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideCOONotes}>
                  <Row>
                    <Col md={4}>
                        <FormGroup>
                          <Label>
                            COO Notes: <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input bsSize="sm" type="text" maxLength="25"
                            onBlur={handleCOONotesChange} defaultValue={isEdit ? selectedApplicationData.coo_notes : ""} 
                            />
                        </FormGroup>
                      </Col>
                  </Row>
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveCOONotes} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowCOONotes}>CANCEL</Button>
                  </div>
                </div>
                : ""
              }
              {isReady ? 
                <PDFViewer
                  width="763px" height="570px"
                >
                  <IncrementRequestPDF 
                    applicationData={selectedApplicationData}
                    selectedApplication={selectedApplication}
                    ceoCode={ceo.code}
                    cooCode={coo.code}
                    hraManagerCode={hraManager.code}
                    immediateSupervisorCode={immediateSupervisor.code}
                    projectManagerCode={projectManager.code}
                  />
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
        </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
})

export default IncrementRequestApprovalForm;