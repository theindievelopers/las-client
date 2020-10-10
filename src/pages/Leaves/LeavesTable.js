import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { PDFViewer } from '@react-pdf/renderer';
import WorkerPDF from '../../components/PDForms/WorkerPDF';
import StaffPDF from '../../components/PDForms/StaffPDF';

class LeavesTable extends Component {
  state = {
    selectedRow: null
  }
  render() {
    return (
      <MaterialTable
        title=""
        columns={[
          {
            title: 'Form Code',
            field: 'application_form_code',
            width: 130
          },
          {
            title: 'Employee ID',
            field: 'employee_code',
            width: 130
          },
          {
            title: 'Employee Name',
            field: 'application_data.name',
            width: 130
          },
          {
            title: 'Status',
            field: 'status',
            width: 130
          },
          {
            title: 'Created By',
            field: 'createdBy',
            width: 130
          },
          {
            title: 'Created At',
            field: 'createdAt',
            width: 130,
            type: "date"
          },
          {
            title: 'Updated By',
            field: 'updatedBy',
            width: 130
          },
          {
            title: 'Updated At',
            field: 'updatedAt',
            width: 130,
            type: "date"
          },
        ]}
        data={this.props.leaves}
        detailPanel={[
          rowData => ({
            icon: props => <i className="far fa-file-pdf"></i>,
            tooltip: 'Show PDF',
            disabled: rowData.status === "DENIED" || rowData.status === "PROCESSING" || rowData.status === "REVIEW",
            render: rowData => {
              let appData = rowData.application_data
              if (rowData.application_form_code === "LEAVE_WORKER") {
                return (
                  <PDFViewer
                    width="500px" height="850px"
                  >
                    <WorkerPDF
                      name={appData.name}
                      department={appData.project}
                      employeeNum={appData.employee_code}
                      position={appData.position}
                      departureDate={appData.departure_date}
                      returnDate={appData.return_date}
                      contactNum={appData.contact_number}
                      typeOfLeave={appData.leave_type}
                      itemIssued={appData.items_issued_type}
                      employeeSignature={appData.employee_signature}
                      itemIssuedOthers={appData.items_issued_others_remarks}
                      passport={appData.receive_passport}
                      settlement={appData.receive_settlement}
                      ticket={appData.receive_ticket}
                      recievedOthers={appData.receive_others}
                      recievedOthersRemarks={appData.receive_others_remarks}
                      leaveFrom={appData.leave_from}
                      leaveTo={appData.leave_to}
                      backOn={appData.be_back_on}
                      employeeSignDate={appData.employee_signature_date}

                    />
                  </PDFViewer>
                )
              } else if (rowData.application_form_code === "LEAVE_STAFF") {
              return (
                <PDFViewer
                  width="500px" height="850px"
                >
                  <StaffPDF
                    name={appData.name}
                    department={appData.project}
                    employeeNum={appData.employee_code}
                    position={appData.position}
                    departureDate={appData.departure_date}
                    returnDate={appData.return_date}
                    contactNum={appData.contact_number}
                    typeOfLeave={appData.leave_type}
                    handOverSuccessor={appData.handover_briefing_to_successor}
                    handOverSuccessorName={appData.handover_briefing_to_successor_employee_name}
                    handOverSuccessorCode={appData.handover_briefing_to_successor_employee_code}
                    handOverDocsCode={appData.handover_documents_employee_code}
                    handOverDocsName={appData.handover_documents_employee_name}
                    handOverDocs={appData.handover_documents}
                    itemIssued={appData.items_issued}
                    itemIssued2={appData.items_issued2}
                    itemIssued3={appData.items_issued3}
                    itemIssued4={appData.items_issued4}
                    itemRemarks={appData.remarks}
                    itemRemarks2={appData.remarks2}
                    itemRemarks3={appData.remarks3}
                    itemRemarks4={appData.remarks4}
                    recievedTicket={appData.receive_ticket}
                    recievedSettlement={appData.receive_settlement}
                    recievedOthers={appData.receive_others}
                    recievedOthersRemarks={appData.receive_others_remarks}
                    leaveFrom={appData.leave_from}
                    leaveTo={appData.leave_to}
                    backOn={appData.be_back_on}
                    employeeSignature={appData.employee_signature}
                    employeeSignDate={appData.employee_signature_date}
                    airportDepartureDate={appData.airport_transportation_departure_date}
                    airportArrivalDate={appData.airport_transportation_arrival_date}
                    airportAccommodation={appData.airport_transportation_accommodation}
                    airportMobile={appData.airport_transportation_mobile_number}
                    ceoSign={appData.ceo_signature_and_date}
                    cooSign={appData.coo_signature_and_date}
                    acctSign={appData.accounting_department_signature_and_date}
                    hraSign={appData.hr_manager_signature_and_date}
                    logisticsSign={appData.logistics_officer_signature_and_date}
                    accountingCode={this.props.accounting.code}
                    ceoCode={this.props.ceo.code}
                    cooCode={this.props.coo.code}
                    hraManagerCode={this.props.hraManager.code}
                    logisticsOfficerCode={this.props.logisticsOfficer.code}
                    projectManagerCode={appData.project_manager}
                    immediateSuperiorCode={appData.immediate_supervisor}
                    immidiateSupSign={appData.immidiate_supervisor_manager_signature_and_date}
                    projectManagerSign={appData.project_manager_signature_and_date}
                    ceoSignDate={appData.ceo_sign_date}
                    cooSignDate={appData.coo_sign_date}
                    acctSignDate={appData.accounting_dept_sign_date}
                    hraSignDate={appData.hr_manager_sign_date}
                    logisticsSignDate={appData.logistics_officer_sign_date}
                    immidiateSupSignDate={appData.immidiate_supervisor_sign_date}
                    projectManagerSignDate={appData.project_manager_sign_date}
                  />
                </PDFViewer>
              )}
            },
          }),
        ]}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.props.refetch(),
          },
          {
            icon: 'add',
            tooltip: 'Apply Leave',
            isFreeAction: true,
            onClick: () => this.props.handleShowForm()
          },
          rowData => ({
            icon: 'edit',
            tooltip: 'Edit User',
            width: '150px',
            onClick: (event, rowData) => {
              this.props.handleEdit(rowData)
            },
            disabled: this.props.accessLevel !== 1 && rowData.status !== "PENDING"
          })
        ]}
        onRowClick={((evt, selectedRow) => this.setState({selectedRow : selectedRow.tableData.id}))}
        options={{
          search: true,
          cellStyle: {
            color: '#000000',
          },
          headerStyle: {
            color: '#000000'
          },
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 50, 100],
          headerStyle: {
            backgroundColor: '#6787A9',
            color: '#FFF'
          },
          tableLayout: "auto",
          tableLayout: "auto",
          rowStyle: rowData => ({
            backgroundColor: (this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
        isLoading={this.props.isLoading}
      />
    )
  }
}

export default LeavesTable;