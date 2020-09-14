import React, { Component } from 'react'
import MaterialTable from 'material-table';
import moment from 'moment'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import WorkerPDF from '../../../components/PDForms/WorkerPDF';
import StaffPDF from '../../../components/PDForms/StaffPDF';

class LeaveApprovalTable extends Component {
  state = {
    selectedRow: null
  }
  render() {
    return (
      <MaterialTable
        title="Leave Approval Lists"
        columns={[
          {
            title: 'ID',
            field: 'id',
            width: 150
          },
          {
            title: 'Status',
            field: 'status',
            width: 130
          },
          {
            title: 'Approver ID',
            field: 'approver_id',
            width: 130
          },
          {
            title: 'Created By',
            field: 'createdBy',
            width: 130
          },
          {
            title: 'Application Type',
            field: 'application_type',
            width: 130
          },
          {
            title: 'Created At',
            field: "createdAt",
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
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.props.refetch(),
          },
          {
            icon: props => <i className="far fa-eye"></i>,
            tooltip: 'View',
            position: "row",
            width: '150px',
            onClick: (event, rowData) => this.props.handleShowForm(rowData),
          },
          // {isLoading: this.props.isLoading}
        ]}
        onRowClick={((evt, selectedRow) => this.setState({selectedRow : selectedRow.tableData.id}))}
        options={{
          actionsColumnIndex: -1,
          selection: true,
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
          rowStyle: rowData => ({
            backgroundColor: (this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
        isLoading={this.props.isLoading}
      />
    )
  }
}

export default LeaveApprovalTable;