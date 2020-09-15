import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Spinner, ModalFooter,
  Input, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import ResignationPDF from '../../../components/PDForms/ResignationPDF'

const ResignationApprovalForm = React.memo(props => {
  const {
    showForm, handleShowForm, selectedApplication, selectedApplicationData, isReady, handleRefresh, accounting, ceo, coo, hraManager, logisticsOfficer,
    handleApprove, handleDeny, handleReview, projectManager, immediateSuperior, selectedApproval, accessLevel, empCode, handleProjectManagerCommentL1,
    handleProjectManagerCommentL2, handleProjectManagerCommentL3, handleProjectManagerCommentL4, handleSuvervisorCommentL1, handleSuvervisorCommentL2,
    handleSuvervisorCommentL3, handleSuvervisorCommentL4, hideProjectManagerComments, hideSupervisorComments, handleShowProjectManagerCommentsInput,
    handleShowSupervisorCommentsInput, handleSaveSupervisorComments, handleEditSupervisorCommentsInput, handleEditProjectManagerCommentsInput,
    isEdit, handleSaveProjectManagerComments, handleEditHRCommentsInput, handleShowHRCommentsInput, hideHRComments, handleHRCommentL1, handleHRCommentL2,
    handleSaveHRComments
  } = props

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
        returnFocusAfterClose={false}
      >
        <ModalHeader
          toggle={handleRefresh}
        >
          Resignation Details
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
              <h4>Position: {selectedApplicationData.position}</h4>
            </Col>
            <Col md={12}>
              <hr />
              {accessLevel === 1 ?
                <div className="float-right mb-3">
                  <Dropdown isOpen={dropdownOpen} toggle={toggleAction}>
                    <DropdownToggle>
                      ACTIONS
                    </DropdownToggle>
                    <DropdownMenu>
                      {selectedApplicationData.supervisor_commentL1 || selectedApplicationData.supervisor_commentL2 || selectedApplicationData.supervisor_commentL3 ?
                        <DropdownItem onClick={handleEditSupervisorCommentsInput}>EDIT SUPERVISOR COMMENT</DropdownItem>
                        :
                        <DropdownItem onClick={handleShowSupervisorCommentsInput}>ADD SUPERVISOR COMMENT</DropdownItem>
                      }
                      {selectedApplicationData.project_manager_commentL1 || selectedApplicationData.project_manager_commentL2 || selectedApplicationData.project_manager_commentL3 ?
                        <DropdownItem onClick={handleEditProjectManagerCommentsInput}>EDIT PROJECT MANAGER COMMENT</DropdownItem>
                        : 
                        <DropdownItem onClick={handleShowProjectManagerCommentsInput}>ADD PROJECT MANAGER COMMENT</DropdownItem>
                      }
                      {selectedApplicationData.hr_manager_commentL1 || selectedApplicationData.hr_manager_commentL2 ?
                        <DropdownItem onClick={handleEditHRCommentsInput}>EDIT HR MANAGER COMMENT</DropdownItem>
                        :
                        <DropdownItem onClick={handleShowHRCommentsInput}>EDIT HR MANAGER COMMENT</DropdownItem>
                      }
                    </DropdownMenu>
                  </Dropdown>
                </div>
                : ""
              }
              {empCode === selectedApplicationData.project_manager ?
                <React.Fragment>
                  <div className="float-right mb-3">
                    {selectedApplicationData.project_manager_commentL1 || selectedApplicationData.project_manager_commentL2 || selectedApplicationData.project_manager_commentL3 ?
                      <Button color="secondary" onClick={handleEditProjectManagerCommentsInput}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >EDIT COMMENTS</Button>
                      :
                      <Button color="secondary" onClick={handleShowProjectManagerCommentsInput}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD COMMENTS</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === selectedApplicationData.project_manager ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideProjectManagerComments}>
                  <Label>Project Manger Comments:</Label>
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleProjectManagerCommentL1} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.project_manager_commentL1 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleProjectManagerCommentL2} style={{ borderRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.project_manager_commentL2 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleProjectManagerCommentL3} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.project_manager_commentL3 : ""}
                  />
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveProjectManagerComments} style={{ marginRight: "4px" }}
                    >SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowProjectManagerCommentsInput}>CANCEL</Button>
                  </div>
                </div>
                : ""}
              {empCode === selectedApplicationData.immediate_supervisor ?
                <React.Fragment>
                  <div className="float-right mb-3">
                    {selectedApplicationData.supervisor_commentL1 || selectedApplicationData.supervisor_commentL2 || selectedApplicationData.supervisor_commentL3 ?
                      <Button color="secondary" onClick={handleEditSupervisorCommentsInput}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT COMMENT
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowSupervisorCommentsInput}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >ADD COMMENT</Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === selectedApplicationData.immediate_supervisor ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideSupervisorComments}>
                  <Label>Supervisor Comments:</Label>
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleSuvervisorCommentL1} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.supervisor_commentL1 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleSuvervisorCommentL2} style={{ borderRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.supervisor_commentL2 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleSuvervisorCommentL3} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.supervisor_commentL3 : ""}
                  />
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveSupervisorComments} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowSupervisorCommentsInput}>CANCEL</Button>
                  </div>
                </div>

                : ""}
              {empCode === hraManager.code ?
                <React.Fragment>
                  <div className="float-right mb-3">
                    {selectedApplicationData.hr_manager_commentL1 || selectedApplicationData.hr_manager_commentL2 ?
                      <Button color="secondary" onClick={handleEditHRCommentsInput}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        EDIT COMMENT
                        </Button>
                      :
                      <Button color="secondary" onClick={handleShowHRCommentsInput}
                        disabled={selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                      >
                        ADD COMMENT
                        </Button>
                    }
                  </div>
                </React.Fragment>
                : ""
              }
              {accessLevel === 1 || empCode === hraManager.code ?
                <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideHRComments}>
                  <Label>HRA Comments:</Label>
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleHRCommentL1} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.hr_manager_commentL1 : ""}
                  />
                  <Input bsSize="sm" maxLength="120" type="text" placeholder="" onBlur={handleHRCommentL2} style={{ borderRadius: 0 }}
                    defaultValue={isEdit ? selectedApplication.application_data.hr_manager_commentL2 : ""}
                  />
                  <div style={{ marginTop: 4 }}>
                    <Button color="primary" onClick={handleSaveHRComments} style={{ marginRight: "4px" }}>SUBMIT</Button>
                    <Button color="secondary" onClick={handleShowHRCommentsInput}>CANCEL</Button>
                  </div>
                </div>

                : ""
              }
              {isReady ?
                <PDFViewer
                  width="763px" height="570px"
                >
                  <ResignationPDF
                    applicationData={selectedApplication.application_data}
                    selectedApplication={selectedApplication}
                    ceoCode={ceo.code}
                    cooCode={coo.code}
                    hraManagerCode={hraManager.code}
                    projectManagerCode={projectManager.code}
                    immediateSuperiorCode={immediateSuperior.code}
                    supervisorCommentL1={selectedApplication.application_data.supervisor_commentL1}
                    supervisorCommentL2={selectedApplication.application_data.supervisor_commentL2}
                    supervisorCommentL3={selectedApplication.application_data.supervisor_commentL3}
                    projectManagerCommentL1={selectedApplication.application_data.project_manager_commentL1}
                    projectManagerCommentL2={selectedApplication.application_data.project_manager_commentL2}
                    projectManagerCommentL3={selectedApplication.application_data.project_manager_commentL3}
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
                <Button color="success" onClick={handleApprove}
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

export default ResignationApprovalForm;