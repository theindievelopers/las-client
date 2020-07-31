import React, { Component, useState } from 'react'
import MaterialTable from 'material-table';
import moment from 'moment'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import WorkerPDF from '../../components/PDForms/WorkerPDF';
import StaffPDF from '../../components/PDForms/StaffPDF';


class LeavesTable extends Component {
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
            title: 'Application Data',
            field: 'application_data.employee_code',
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
                    contactNum={appData.contace_number}
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
            },
          },
        ]}
        // detailPanel={rowData => {
        //   let appData = rowData.application_data
        //   return (
        //     <PDFViewer 
        //     width="500px" height="850px"
        //     >
        //       <WorkerPDF
        //         name={appData.name}
        //         department={appData.project}
        //         employeeNum={appData.employee_code}
        //         position={appData.position}
        //         departureDate={appData.departure_date}
        //         returnDate={appData.return_date}
        //         contactNum={appData.contace_number}
        //         typeOfLeave={appData.leave_type}
        //         itemIssued={appData.items_issued_type}
        //         employeeSignature={appData.employee_signature}
        //         itemIssuedOthers={appData.items_issued_others_remarks}
        //         passport={appData.receive_passport}
        //         settlement={appData.receive_settlement}
        //         ticket={appData.receive_ticket}
        //         recievedOthers={appData.receive_others}
        //         recievedOthersRemarks={appData.receive_others_remarks}
        //         leaveFrom={appData.leave_from}
        //         leaveTo={appData.leave_to}
        //         backOn={appData.be_back_on}
        //         employeeSignDate={appData.employee_signature_date}

        //       />
        //     </PDFViewer>
        //   )
        // }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.props.refetch(),
          },
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: () => this.props.handleShowForm()
          },
          // {
          //   icon: props => <i className="far fa-file-pdf"></i>,
          //   tooltip: "Custom",
          //   onClick: (event,  rowData) => console.log(event, rowData.application_data)
          // },
          // {
          //   icon: 'file',
          //   tooltip: 'Download File',

          // }

          // {isLoading: this.props.isLoading}
        ]}
        options={{
          search: true,
          cellStyle: {
            color: '#000000',
            backgroundColor: '#ffffff'
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            color: '#000000'
          },
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          headerStyle: {
            backgroundColor: '#6787A9',
            color: '#FFF'
          },
          tableLayout: "auto"
        }}
        isLoading={this.props.isLoading}
      />
    )
  }
}

export default LeavesTable;