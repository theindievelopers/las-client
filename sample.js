
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