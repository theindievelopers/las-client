import React, { Component, useState } from 'react'
import MaterialTable from 'material-table';
import Employees from './Employees';


class EmployeesTable extends Component {
  state = {
    selectedRow: null
  }
  render() {
    return (
      <MaterialTable
        title=""
        columns={[
          {
            title: 'Code',
            field: 'code',
            width: 100
          },
          {
            title: 'Name',
            field: 'fname',
            width: 130
          },
          {
            title: 'Middle Name',
            field: 'mname',
            width: 130
          },
          {
            title: 'Last Name',
            field: 'lname',
            width: 130
          },
          {
            title: 'Allocation Site',
            field: 'cost_allocation_site',
            width: 130
          },
          {
            title: 'Job Title',
            field: 'cost_allocation_actual_job_title',
            width: 130
          },
          {
            title: 'Nationality',
            field: 'nationality',
            width: 130
          },
          {
            title: 'Sponsorship',
            field: 'sponsorship',
            width: 130
          },
          {
            title: 'DOB',
            field: 'dob',
            width: 130
          },
          {
            title: 'Passport No.',
            field: 'passport_number',
            width: 130
          },
          {
            title: 'Passport Issued Date',
            field: 'passport_date_of_issue',
            width: 130
          },
          {
            title: 'Passport Expiry Date',
            field: 'passport_expiry_date',
            width: 130
          },
          {
            title: 'Residence Permit No.',
            field: 'residence_permit_number',
            width: 130
          },
          {
            title: 'Residence Permit Expiry Date',
            field: 'residence_permit_expiry_date',
            width: 130
          },
          {
            title: 'Blood Group',
            field: 'residence_permit_blood_group',
            width: 130
          },
          {
            title: 'Job Offer Doha Entry',
            field: 'job_offer_doha_entry',
            width: 130
          },
          {
            title: 'Joining Date',
            field: 'joining_date',
            width: 130
          },
          {
            title: 'Increment Month',
            field: 'increment_month',
            width: 130
          },
          {
            title: 'Increment Amount',
            field: 'increment_amount',width: 130
          },
          {
            title: 'Basic',
            field: 'basic',width: 130
          },
          {
            title: 'General Allowance',
            field: 'general_allowance',width: 130
          },
          {
            title: 'HRA',
            field: 'hra',width: 130
          },
          {
            title: 'Transportation Allowance',
            field: 'transportation_allowance',width: 130
          },
          {
            title: 'Tel Allow',
            field: 'tel_allow',width: 130
          },
          {
            title: 'Ticket Allowance',
            field: 'ticket_allowance',width: 130
          },
          {
            title: 'Food Allowance',
            field: 'food_allowance',width: 130
          },
          {
            title: 'Medical Allowance',
            field: 'medical_allowance',width: 130
          },
          {
            title: 'Total',
            field: 'total',width: 130
          },
          {
            title: 'Leave Ticket Entitlement',
            field: 'leave_ticket_entitlement',width: 130
          },
          {
            title: 'Leave Ticker Days/Year',
            field: 'leave_ticket_days_per_year',width: 130
          },
          {
            title: 'Driving License Issue Date',
            field: 'driving_license_expiry_date',width: 130
          },
          {
            title: 'Health Card Number',
            field: 'health_card_number',width: 130
          },
          {
            title: 'Healt Card Issue Date',
            field: 'health_card_issue_date',width: 130
          },
          {
            title: 'Health Card Expiry Date',
            field: 'health_card_expiry_date',width: 130
          },
          {
            title: 'Bank Name',
            field: 'bank_name',width: 130
          },
          {
            title: 'Card No.',
            field: 'card_number',width: 130
          },
          {
            title: 'Recruited By',
            field: 'recruited_by',width: 130
          },
          {
            title: 'Accomodation',
            field: 'accommodation',width: 130
          },
          {
            title: 'Employee Type',
            field: 'employee_type',width: 130
          },
          {
            title: 'Employment Status',
            field: 'employment_status',width: 130
          },
          {
            title: 'Created By',
            field: 'createdBy',width: 130
          },
          {
            title: 'Created At',
            field: 'createdAt',width: 130
          },
          {
            title: 'Updated By',
            field: 'updatedBy',width: 130
          },
          {
            title: 'Updated At',
            field: 'updatedAt',width: 130
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
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: () => this.props.handleShowForm()
          },
          {
            icon: 'edit',
            tooltip: 'Edit User',
            width: '150px',
            onClick: (event, rowData) => this.props.handleEdit(rowData)
          }
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
          // fixedColumns: {
          //   left: 1,
          // },
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

export default EmployeesTable;