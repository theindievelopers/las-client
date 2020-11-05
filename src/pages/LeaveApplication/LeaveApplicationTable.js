import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { PDFViewer } from '@react-pdf/renderer';
import LeaveApplicationWorkerPDF from '../../components/PDForms/LeaveApplicationWorkerPDF';
import LeaveApplicationStaffPDF from '../../components/PDForms/LeaveApplicationStaffPDF';

class LeaveApplicationTable extends Component {
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
        data={this.props.data}
        detailPanel={[
          rowData => ({
            icon: props => 
            // <span class="material-icons">picture_as_pdf</span>
            <i className="far fa-file-pdf"></i>
            ,
            tooltip: 'Show PDF',
            disabled: rowData.status === "DENIED" || rowData.status === "PROCESSING" || rowData.status === "REVIEW",
            render: rowData => {
              let appData = rowData.application_data
              if (rowData.application_form_code === "LEAVE_WORKER_APPLICATION") {
                return (
                  <PDFViewer
                    width="500px" height="850px"
                  >
                    <LeaveApplicationWorkerPDF 
                      applicationData={appData}
                      selectedApplication={rowData}
                      hraManagerCode={this.props.hraManager.code}
                      projectManagerCode={appData.project_manager}
                      immediateSuperiorCode={appData.immediate_supervisor}  
                    />
                  </PDFViewer>
                )
              } else if (rowData.application_form_code === "LEAVE_STAFF_APPLICATION") {
                return (
                  <PDFViewer
                    width="500px" height="850px"
                  >
                    <LeaveApplicationStaffPDF
                      applicationData={appData}
                      selectedApplication={rowData}
                      hraManagerCode={this.props.hraManager.code}
                      projectManagerCode={appData.project_manager}
                      immediateSuperiorCode={appData.immediate_supervisor}
                      ceoCode={this.props.ceo.code}
                      cooCode={this.props.coo.code}
                    />
                  </PDFViewer>
                )
              }
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
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 50, 100],
          headerStyle: {
            backgroundColor: '#6787A9',
            color: '#FFF'
          },
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

export default LeaveApplicationTable;