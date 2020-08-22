import React, { useState, useEffect } from 'react'
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
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import StaffPDF from '../../components/PDForms/StaffPDF';
import WorkerPDF from '../../components/PDForms/WorkerPDF';

const ApprovalForm = React.memo( props => {
  const { 
    showForm, handleShowForm, selectedLeave, selectedApplicationData, isReady, handleRefresh, accounting, ceo, coo, hraManager, logisticsOfficer, approvals,
    handleApprove, handleDeny, handleReview
  } = props
  // console.log("approvals", approvals)
  // console.log(selectedLeave)

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
            <Col md={12}>
              <h4>{selectedApplicationData.employee_code} - {selectedApplicationData.name}</h4>
            </Col>
            <Col md={12}>
              <h4>{selectedApplicationData.project} - {selectedApplicationData.position}</h4>
            </Col>
            <Col md={12}>
              {isReady ?
                  <PDFViewer
                    width="763px" height="570px"
                  >
                    {selectedLeave.application_form_code === "LEAVE_STAFF" ?
                    <StaffPDF
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
                      itemRemarks={selectedApplicationData.remarks}
                      recievedTicket={selectedApplicationData.receive_ticket}
                      recievedSettlement={selectedApplicationData.receive_settlement}
                      recievedOthers={selectedApplicationData.receive_others}
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
                      ceoSign={selectedApplicationData.ceo_signature_and_date}
                      cooSign={selectedApplicationData.coo_signature_and_date}
                      acctSign={selectedApplicationData.accounting_department_signature_and_date}
                      hraSign={selectedApplicationData.hr_manager_signature_and_date}
                      logisticsSign={selectedApplicationData.logistics_officer_signature_and_date}
                      immidiateSupSign={selectedApplicationData.immidiate_supervisor_manager_signature_and_date}
                      projectManagerSign={selectedApplicationData.project_manager_signature_and_date}
                    />
                    :
                    <WorkerPDF 
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
                    />
                  }
                  </PDFViewer>
                : 
                <div style={{paddingTop: "275px", paddingBottom: "275px"}}>
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner color="secondary" />
                  </div>
                </div>
              }
            </Col>
          </Row>
          <div className="float-right">
            <Button color="secondary" onClick={handleRefresh}>CANCEL</Button>{' '}
            <Button color="primary" onClick={handleReview}>REVIEW</Button>{' '}
            <Button color="danger" onClick={handleDeny}>DENY</Button>{' '}
            <Button color="success" onClick={handleApprove}>APPROVE</Button>{' '}
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
})

export default ApprovalForm;