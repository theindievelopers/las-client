import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { PDFViewer } from '@react-pdf/renderer';
import ChangeProfessionPDF from '../../components/PDForms/ChangeProfessionPDF';

class ChangeProfessionTable extends Component {
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
            // width: 130
          },
          {
            title: 'Employee ID',
            field: 'employee_code',
            // width: 130
          },
          {
            title: 'Employee Name',
            field: 'application_data.name',
            // width: 130
          },
          {
            title: 'Status',
            field: 'status',
            // width: 130
          },
          {
            title: 'Created By',
            field: 'createdBy',
            // width: 130
          },
          {
            title: 'Created At',
            field: 'createdAt',
            // width: 130,
            type: "date"
          },
          {
            title: 'Updated By',
            field: 'updatedBy',
            // width: 130
          },
          {
            title: 'Updated At',
            field: 'updatedAt',
            // width: 130,
            type: "date"
          },
        ]}
        data={this.props.data}
        detailPanel={[
          rowData => ({
            icon: props => <i className="far fa-file-pdf"></i>,
            tooltip: 'Show PDF',
            disabled: rowData.status === "DENIED" || rowData.status === "PROCESSING" || rowData.status === "REVIEW",
            render: rowData => {
              let appData = rowData.application_data
                return (
                  <PDFViewer
                    width="500px" height="850px"
                  >
                    <ChangeProfessionPDF 
                      applicationData={appData}
                      selectedApplication={rowData}
                      ceoCode={this.props.ceo.code}
                      cooCode={this.props.coo.code}
                      hraManagerCode={this.props.hraManager.code}
                      projectManagerCode={appData.project_manager}
                      immediateSupervisorCode={appData.immediate_supervisor}
                    />
                  </PDFViewer>
                )
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
            tooltip: 'Apply Resignation',
            isFreeAction: true,
            onClick: () => this.props.handleShowForm()
          },
          rowData => ({
            icon: 'edit',
            tooltip: 'Edit Resignation',
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
            // backgroundColor: '#ffffff'
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

export default ChangeProfessionTable;