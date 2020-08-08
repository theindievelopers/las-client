import React, { Component, useState } from 'react'
import MaterialTable from 'material-table';
import moment from 'moment'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
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
            title: 'ID',
            field: 'id',
            width: 150
          },
          {
            title: 'Form Code',
            field: 'application_form_code',
            width: 130
          },
          {
            title: 'Employee ID',
            field: 'employee_id',
            width: 130
          },
          {
            title: 'Employee Code',
            field: 'application_data.employee_code',
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
            field: "createdAt",
            width: 130
          },
          {
            title: 'Updated By',
            field: 'updatedBy',
            width: 130
          },
        ]}
        data={this.props.leaves}
        detailPanel={[
          {
            icon: props => <i className="far fa-file-pdf"></i>,
            tooltip: 'Show PDF',
            render: rowData => {
              let appData = rowData.application_data
              console.log(rowData)
              if (rowData.application_form_code == "LEAVE_WORKER") {
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
              }
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
                    itemIssued={appData.items_issued}
                    itemRemarks={appData.remarks}
                    recievedTicket={appData.receive_ticket}
                    recievedSettlement={appData.receive_settlement}
                    recievedOthers={appData.receive_others}
                    leaveFrom={appData.leave_from}
                    leaveTo={appData.leave_to}
                    backOn={appData.be_back_on}
                    employeeSignature={appData.employee_signature}
                    employeeSignDate={appData.employee_signature_date}
                    airportDepartureDate={appData.airport_transportation_departure_date}
                    airportArrivalDate={appData.airport_transportation_arrival_date}
                    airportAccommodation={appData.airport_transportation_accommodation}
                    airportMobile={appData.airport_transportation_mobile_number}
                  />
                </PDFViewer>
              )
            },
          },
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
          {
            icon: 'edit',
            tooltip: 'Edit User',
            width: '150px',
            onClick: (event, rowData) => this.props.handleEdit(rowData)
          },
          // {isLoading: this.props.isLoading}
        ]}
        onRowClick={((evt, selectedRow) => this.setState({selectedRow : selectedRow.tableData.id}))}
        options={{
          search: true,
          cellStyle: {
            color: '#000000',
            // backgroundColor: '#ffffff'
          },
          headerStyle: {
            // backgroundColor: '#ffffff',
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