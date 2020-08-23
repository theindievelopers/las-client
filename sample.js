
    // const formData = new FormData();
    // formData.append('code', employeeCode)
    // formData.append('fname', fname)
    // formData.append('mname', mname)
    // formData.append('lname', lname)
    // formData.append('cost_allocation_site', costAllocationSite)
    // formData.append('cost_allocation_actual_job_title', costAllocationJT)
    // formData.append('nationality', nationality)
    // formData.append('sponsorship', sponsorship)
    // formData.append('dob', dob)
    // formData.append('passport_number', passportNum)
    // formData.append('passport_date_of_issue', passportDateIssued)
    // formData.append('passport_expiry_date', passportExpiry)
    // formData.append('residence_permit_number', residencePermit)
    // formData.append('residence_permit_expiry_date', residenceExpiryDate)
    // formData.append('residence_permit_blood_group', residencePermitBloodGroup)
    // formData.append('job_offer_doha_entry', jobOfferDohaEntry)
    // formData.append('joining_date', joiningDate)
    // formData.append('increment_month', incrementMonth)
    // formData.append('increment_amount', incrementAmount)
    // formData.append('basic', basic)
    // formData.append('general_allowance', generalAllowance)
    // formData.append('hra', hra)
    // formData.append('transportation_allowance', transportationAllowance)
    // formData.append('tel_allow', telAllowance)
    // formData.append('ticket_allowance', ticketAllowance)
    // formData.append('food_allowance', foodAllowance)
    // formData.append('medical_allowance', medicalAllowance)
    // formData.append('total', total)
    // formData.append('leave_ticket_entitlement', leaveTicketEntitlement)
    // formData.append('leave_ticket_days_per_year', leaveTicketDaysPerYear)
    // formData.append('driving_license_issue_date', drivingLicenseIssueDate)
    // formData.append('driving_license_expiry_date', driverLicenseExpiry)
    // formData.append('health_card_number', healthCardNum)
    // formData.append('health_card_issue_date', healthCardIssueDate)
    // formData.append('health_card_expiry_date', healthCardExpiry)
    // formData.append('bank_name', bankName)
    // formData.append('card_number', cardNum)
    // formData.append('recruited_by', recruitedBy)
    // formData.append('accommodation', accommodation)
    // formData.append('employee_type', employeeType)
    // formData.append('employment_status', employmentStatus)
    // formData.append('signature', blobSign)
    // formData.append('createdBy', sessionStorage.user)
    // formData.append('createdAt', moment(new Date()).format("YYYY-MM-DD"))
    // formData.append('updatedBy', sessionStorage.user)
    // formData.append('updatedAt', moment(new Date()).format("YYYY-MM-DD"))

    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }
    // try {
    //   Axios.post('http://localhost:3000/employees', formData, config)
    //     .then(res => {
    //       console.log(res)
    //     })
    // } catch (e) {
    //   console.log(e)
    // }


    function dataURItoBlob(dataURI, callback) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
    
        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab]);
        console.log(bb)
        // return bb;
      }
    
      function b64toBlob(dataURI) {
    
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
    
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
      }


      import React, { useState } from 'react';
      import { Button } from 'reactstrap';
      import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
      import WorkerPDF from '../../components/PDForms/WorkerPDF';
      import moment from 'moment';
      
      const LeavesRow = ({ leave, ...props }) => {
        return (
          <React.Fragment>
            <tr>
              <td>{leave.i}</td>
              <td onClick={(e) => props.handleView(leave)}>{leave.employeeNum}</td>
              <td>{leave.name}</td>
              <td>{leave.position}</td>
              <td>{leave.department}</td>
              <td>{leave.departureDate}</td>
              <td>{leave.returnDate}</td>
              <td>{leave.typeOfLeave}</td>
              <td>
                <div className="d-flex">
                  <Button
                    className="mr-3"
                    // color="info"
                    style={{border: "1px solid black", backgroundColor:"white"}}
                  >
                    <PDFDownloadLink document={<WorkerPDF 
                      employeeNum={leave.employeeNum}
                      name={leave.name}
                      position={leave.position}
                      department={leave.department}
                      departureDate={leave.departureDate}
                      returnDate={leave.returnDate}
                      typeOfLeave={leave.typeOfLeave}
                      contactNum={leave.contactNum}
                      itemIssued={leave.itemIssued}
                    />} fileName={`${leave.name}-${moment(new Date()).format('x')}-workerleave.pdf`}>
                          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <i className="far fa-file-pdf"></i>)}
                        </PDFDownloadLink>
                  </Button>
                </div>
              </td>
            </tr>
          </React.Fragment>
        )
      }
      
      export default LeavesRow;










      code: employeeCode,
        fname,
        mname,
        lname,
        cost_allocation_site: costAllocationSite,
        cost_allocation_actual_job_title: costAllocationJT,
        nationality: nationality,
        sponsorship: sponsorship,
        dob: dob,
        passport_number: passportNum,
        passport_date_of_issue: passportDateIssued,
        passport_expiry_date: passportExpiry,
        residence_permit_number: residencePermit,
        residence_permit_expiry_date: residenceExpiryDate,
        residence_permit_blood_group: residencePermitBloodGroup,
        job_offer_doha_entry: jobOfferDohaEntry,
        joining_date: joiningDate,
        increment_month: incrementMonth,
        increment_amount: incrementAmount,
        basic: basic,
        general_allowance: generalAllowance,
        hra: hra,
        transportation_allowance: transportationAllowance,
        tel_allow: telAllowance,
        ticket_allowance: ticketAllowance,
        food_allowance: foodAllowance,
        medical_allowance: medicalAllowance,
        total: total,
        leave_ticket_entitlement: leaveTicketEntitlement,
        leave_ticket_days_per_year: leaveTicketDaysPerYear,
        driving_license_issue_date: drivingLicenseIssueDate,
        driving_license_expiry_date: driverLicenseExpiry,
        health_card_number: healthCardNum,
        health_card_issue_date: healthCardIssueDate,
        health_card_expiry_date: healthCardExpiry,
        bank_name: bankName,
        card_number: cardNum,
        recruited_by: recruitedBy,
        accommodation: accommodation,
        employee_type: employeeType,
        employment_status: employmentStatus,
        signature: signature,
        createdBy: sessionStorage.user,
        createdAt: moment(new Date()).format("MM-DD-YYYY"),
        updatedBy: sessionStorage.user,
        updatedAt: moment(new Date()).format("MM-DD-YYYY")


        C:\Users\Makati\Desktop\weew\s\las-client\src\img\gsas.jpg
        src\img\gsas.jpg









        let acctSign = ""
        let ceoSign = ""
        let cooSign = ""
        let logisticsSign = ""
        let hraSign = ""
        let projSign = ""
        let immSign = ""
        if (selectedApproval.approver_id === accounting.code) {
          acctSign = accounting.signature
        } else if (selectedApproval.approver_id === ceo.code) {
          ceoSign = ceo.signature
        } else if (selectedApproval.approver_id === coo.code) {
          cooSign = coo.code
        } else if (selectedApproval.approver_id === logisticsOfficer.code) {
          logisticsSign = logisticsOfficer.signature
        } else if (selectedApproval.approver_id === hraManager.code) {
          hraSign = hraManager.signature
        } else if (selectedApproval.approver_id === immediateSuperior.code) {
          immSign = immediateSuperior.signature
        } else if (selectedApproval.approver_id === projectManager.code) {
          projSign = projectManager.signature
        }
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Updated!',
              'Application has been Approved.',
              'success'
            )
            fetch(`http://localhost:3000/approvals?id=${selectedApproval.id}`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json', 'LAS': 'LAS', 'raihan': 'raihan' },
              body: JSON.stringify({
                approver_id: selectedApproval.approver_id,
                createdBy: selectedApproval.createdBy,
                createdAt: selectedApproval.createdAt,
                updatedBy: JSON.parse(sessionStorage.name),
                updatedAt: moment(new Date()).format("YYYY-MM-DD"),
                status: "APPROVED"
              })
            })
              .then(res => res.json())
              .then(data => {
                fetch(`http://localhost:3000/application?id=${selectedLeave.id}`, {
                  method: 'put',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    application_form_code: selectedLeave.application_form_code,
                    employee_id: selectedLeave.employee_id,
                    application_data: {
                      name: selectedLeave.application_data.name,
                      employee_code: selectedLeave.application_data.employee_code,
                      project: selectedLeave.application_data.project,
                      position: selectedLeave.application_data.position,
                      departure_date: selectedLeave.application_data.departure_date,
                      return_date: selectedLeave.application_data.return_date,
                      leave_type: selectedLeave.application_data.leave_type,
                      contact_number: selectedLeave.application_data.contact_number,
                      handover_briefing_to_successor: selectedLeave.application_data.handover_briefing_to_successor,
                      handover_briefing_to_successor_employee_name: selectedLeave.application_data.handover_briefing_to_successor_employee_name,
                      handover_briefing_to_successor_employee_code: "",
                      handover_documents: selectedLeave.application_data.handover_documents,
                      handover_documents_employee_name: selectedLeave.application_data.handover_documents_employee_name,
                      handover_documents_employee_code: selectedLeave.application_data.handover_documents_employee_code,
                      items_issued: selectedLeave.application_data.items_issued,
                      remarks: selectedLeave.application_data.remarks,
                      logistics_officer_signature_and_date: (selectedLeave.application_data.logistics_officer_signature_and_date ? selectedLeave.application_data.logistics_officer_signature_and_date : logisticsSign),
                      immidiate_supervisor_manager_signature_and_date: (selectedLeave.application_data.immidiate_supervisor_manager_signature_and_date ? selectedLeave.application_data.immidiate_supervisor_manager_signature_and_date : immSign),
                      project_manager_signature_and_date: (selectedLeave.application_data.project_manager_signature_and_date ? selectedLeave.application_data.project_manager_signature_and_date : projSign),
                      accounting_department_signature_and_date: (selectedLeave.application_data.accounting_department_signature_and_date ? selectedLeave.application_data.accounting_department_signature_and_date : acctSign),
                      receive_ticket: selectedLeave.application_data.receive_ticket,
                      receive_settlement: selectedLeave.application_data.receive_settlement,
                      receive_others: selectedLeave.application_data.receive_others,
                      receive_others_remarks: selectedLeave.application_data.receive_others_remarks,
                      leave_from: selectedLeave.application_data.leave_from,
                      leave_to: selectedLeave.application_data.leave_to,
                      be_back_on: selectedLeave.application_data.be_back_on,
                      employee_signature: selectedLeave.application_data.employee_signature,
                      employee_signature_date: selectedLeave.application_data.employee_signature_date,
                      airport_transportation_departure_date: selectedLeave.airport_transportation_departure_date,
                      airport_transportation_arrival_date: selectedLeave.application_data.airport_transportation_arrival_date,
                      airport_transportation_accommodation: selectedLeave.application_data.airport_transportation_accommodation,
                      airport_transportation_mobile_number: selectedLeave.application_data.airport_transportation_mobile_number,
                      hr_manager_signature_and_date: (selectedLeave.application_data.hr_manager_signature_and_date ? selectedLeave.application_data.hr_manager_signature_and_date : hraSign),
                      coo_signature_and_date: (selectedLeave.application_data.coo_signature_and_date ? selectedLeave.application_data.coo_signature_and_date : cooSign),
                      ceo_signature_and_date: (selectedLeave.application_data.ceo_signature_and_date ? selectedLeave.application_data.ceo_signature_and_date : ceoSign),
                      createdby: selectedLeave.application_data.createdby,
                      createdat: selectedLeave.application_data.createdat,
                      updatedby: selectedLeave.application_data.updatedBy,
                      updatedat: selectedLeave.application_data.updatedAt
                    },
                    status: "ACTIVE",
                    createdBy: selectedLeave.createdBy,
                    createdAt: selectedLeave.createdAt,
                    updatedBy: JSON.parse(sessionStorage.name),
                    updatedAt: moment(new Date()).format("MM-DD-YYYY")
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    refetch()
                    handleRefresh()
                  })
                refetch()
                handleRefresh()
              })
          }
        })