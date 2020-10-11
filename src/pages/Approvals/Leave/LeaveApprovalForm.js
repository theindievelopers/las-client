import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Spinner
} from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import StaffPDF from '../../../components/PDForms/StaffPDF';
import WorkerPDF from '../../../components/PDForms/WorkerPDF';

const LeaveApprovalForm = React.memo(props => {
  const {
    showForm, handleShowForm, selectedApplication, selectedApplicationData, isReady, handleRefresh, accounting, ceo, coo, hraManager, logisticsOfficer,
    handleApprove, handleDeny, handleReview, projectManager, immediateSuperior, selectedApproval, accessLevel, handleReviewWorker, handleDenyWorker,
    handleApproveWorker
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
              <h4>Position: {selectedApplicationData.position}</h4>
            </Col>
            <Col md={12}>
              {isReady ?
                  <PDFViewer
                    width="763px" height="570px"
                  >
                    {selectedApplication.application_form_code === "LEAVE_STAFF" ?
                      <StaffPDF
                        applicationData={selectedApplicationData}
                        name={selectedApplicationData.name}
                        department={selectedApplicationData.project}
                        employeeNum={selectedApplicationData.employee_code}
                        position={selectedApplicationData.position}
                        departureDate={selectedApplicationData.departure_date}
                        returnDate={selectedApplicationData.return_date}
                        contactNum={selectedApplicationData.contact_number}
                        typeOfLeave={selectedApplicationData.leave_type}
                        handOverSuccessor={selectedApplicationData.handover_briefing_to_successor}
                        handOverSuccessorName={selectedApplicationData.handover_briefing_to_successor_employee_name}
                        handOverSuccessorCode={selectedApplicationData.handover_briefing_to_successor_employee_code}
                        handOverDocsCode={selectedApplicationData.handover_documents_employee_code}
                        handOverDocsName={selectedApplicationData.handover_documents_employee_name}
                        handOverDocs={selectedApplicationData.handover_documents}
                        itemIssued={selectedApplicationData.items_issued}
                        itemIssued2={selectedApplicationData.items_issued2}
                        itemIssued3={selectedApplicationData.items_issued3}
                        itemIssued4={selectedApplicationData.items_issued4}
                        itemRemarks={selectedApplicationData.remarks}
                        itemRemarks2={selectedApplicationData.remarks2}
                        itemRemarks3={selectedApplicationData.remarks3}
                        itemRemarks4={selectedApplicationData.remarks4}
                        recievedTicket={selectedApplicationData.receive_ticket}
                        recievedSettlement={selectedApplicationData.receive_settlement}
                        recievedOthers={selectedApplicationData.receive_others}
                        recievedOthersRemarks={selectedApplicationData.receive_others_remarks}
                        leaveFrom={selectedApplicationData.leave_from}
                        leaveTo={selectedApplicationData.leave_to}
                        backOn={selectedApplicationData.be_back_on}
                        employeeSignature={selectedApplicationData.employee_signature}
                        employeeSignDate={selectedApplicationData.employee_signature_date}
                        airportDepartureDate={selectedApplicationData.airport_transportation_departure_date}
                        airportArrivalDate={selectedApplicationData.airport_transportation_arrival_date}
                        airportAccommodation={selectedApplicationData.airport_transportation_accommodation}
                        airportMobile={selectedApplicationData.airport_transportation_mobile_number}
                        accountingCode={accounting.code}
                        ceoCode={ceo.code}
                        cooCode={coo.code}
                        hraManagerCode={hraManager.code}
                        logisticsOfficerCode={logisticsOfficer.code}
                        projectManagerCode={projectManager.code}
                        immediateSuperiorCode={immediateSuperior.code}
                        ceoSign={selectedApplicationData.ceo_signature_and_date}
                        cooSign={selectedApplicationData.coo_signature_and_date}
                        acctSign={selectedApplicationData.accounting_department_signature_and_date}
                        hraSign={selectedApplicationData.hr_manager_signature_and_date}
                        logisticsSign={selectedApplicationData.logistics_officer_signature_and_date}
                        immidiateSupSign={selectedApplicationData.immidiate_supervisor_manager_signature_and_date}
                        projectManagerSign={selectedApplicationData.project_manager_signature_and_date}
                        ceoSignDate={selectedApplicationData.ceo_sign_date}
                        cooSignDate={selectedApplicationData.coo_sign_date}
                        acctSignDate={selectedApplicationData.accounting_dept_sign_date}
                        hraSignDate={selectedApplicationData.hr_manager_sign_date}
                        logisticsSignDate={selectedApplicationData.logistics_officer_sign_date}
                        immidiateSupSignDate={selectedApplicationData.immidiate_supervisor_sign_date}
                        projectManagerSignDate={selectedApplicationData.project_manager_sign_date}
                      />
                      : 
                        <WorkerPDF
                          applicationData={selectedApplicationData}
                          name={selectedApplicationData.name}
                          department={selectedApplicationData.project}
                          employeeNum={selectedApplicationData.employee_code}
                          position={selectedApplicationData.position}
                          departureDate={selectedApplicationData.departure_date}
                          returnDate={selectedApplicationData.return_date}
                          contactNum={selectedApplicationData.contact_number}
                          typeOfLeave={selectedApplicationData.leave_type}
                          itemIssued={selectedApplicationData.items_issued_type}
                          employeeSignature={selectedApplicationData.employee_signature}
                          itemIssuedOthers={selectedApplicationData.items_issued_others_remarks}
                          passport={selectedApplicationData.receive_passport}
                          settlement={selectedApplicationData.receive_settlement}
                          ticket={selectedApplicationData.receive_ticket}
                          recievedOthers={selectedApplicationData.receive_others}
                          recievedOthersRemarks={selectedApplicationData.receive_others_remarks}
                          leaveFrom={selectedApplicationData.leave_from}
                          leaveTo={selectedApplicationData.leave_to}
                          backOn={selectedApplicationData.be_back_on}
                          employeeSignDate={selectedApplicationData.employee_signature_date}
                          hraManagerCode={hraManager.code}
                          accountingCode={accounting.code}
                          immediateSuperiorCode={immediateSuperior.code}
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
            <Button color="secondary" onClick={handleRefresh} style={{marginRight: "4px"}}>CANCEL</Button>
            {accessLevel !== 3 ?
              <React.Fragment>
                <Button color="primary" onClick={selectedApplication.application_form_code === "LEAVE_STAFF" ? handleReview : handleReviewWorker} style={{marginRight: "4px"}}
                  disabled={selectedApplication.status === "DENIED" || selectedApplication.status === "APPROVED" || selectedApproval.status === "REVIEW" || selectedApproval.status === "APPROVED" || selectedApproval.status === "DENIED"}
                >REVIEW</Button>  
                <Button color="danger" onClick={selectedApplication.application_form_code === "LEAVE_STAFF" ? handleDeny : handleDenyWorker} style={{marginRight: "4px"}}
                  disabled={selectedApplication.status === "APPROVED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
                >DENY</Button>  
                <Button color="success" onClick={selectedApplication.application_form_code === "LEAVE_STAFF" ? handleApprove : handleApproveWorker}
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

export default LeaveApprovalForm;