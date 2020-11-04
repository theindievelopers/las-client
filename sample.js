import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../../Layout/Sidebar'
import Topbar from '../../../Layout/Topbar'
import moment from 'moment'
import { Card, CardTitle, CardSubtitle, Row, Col, CardBody } from 'reactstrap';
import Swal from 'sweetalert2'
import { CredsContext } from '../../../context/Context'
import ChangeProfessionApprovalTable from './ChangeProfessionApprovalTable';
import ChangeProfessionApprovalForm from '../../Approvals/ChangeProfession/ChangeProfessionApprovalForm';

const ChangeProfessionApproval = React.memo(() => {
  const { empCode, accessLevel, name, isLoggedIn, username } = useContext(CredsContext)

  const [approvals, setApprovals] = useState([])
  const [forApproval, setForApproval] = useState([])
  const [approved, setApproved] = useState(0)
  const [denied, setDenied] = useState(0)
  const [review, setReview] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState({})
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState([])
  const [selectedApplicationData, setSelectedApplicationData] = useState([])
  const [employees, setEmployees] = useState([])
  const [ceo, setCeo] = useState({})
  const [coo, setCoo] = useState({})
  const [hraManager, setHraManager] = useState({})
  const [immediateSupervisor, setImmediateSupervisor] = useState({})
  const [projectManager, setProjectManager] = useState({})
  const [hideSupervisorNotes, setHideSupervisorNotes] = useState(true)
  const [supervisorNotesL1, setSupervisorNotesL1] = useState("")
  const [supervisorNotesL2, setSupervisorNotesL2] = useState("")
  const [supervisorNotesL3, setSupervisorNotesL3] = useState("")
  const [supervisorNotesL4, setSupervisorNotesL4] = useState("")
  const [supervisorNotesL5, setSupervisorNotesL5] = useState("")
  const [supervisorNotesL6, setSupervisorNotesL6] = useState("")
  const [supervisorNotesL7, setSupervisorNotesL7] = useState("")
  const [supervisorNotesL8, setSupervisorNotesL8] = useState("")
  const [supervisorNotesL9, setSupervisorNotesL9] = useState("")
  

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }
    if (accessLevel === 4) {
      window.location.replace('#/leaves')
    }

    fetchData()
  }, [])

  const fetchData = () => {
    fetch('http://localhost:3000/approvals')
      .then(res => res.json())
      .then(data => {
        let allData = []
        let approved = []
        let denied = []
        let review = []
        let pending = []
        data.map(indivData => {
          if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.approver_id) {
            if (indivData.application_type === "CHANGE_PROFESSION") {
              allData.push(indivData)
              if (indivData.status === "APPROVED") {
                approved.push(indivData)
              } else if (indivData.status === "DENIED") {
                denied.push(indivData)
              } else if (indivData.status === "REVIEW") {
                review.push(indivData)
              } else if (indivData.status === "PENDING") {
                pending.push(indivData)
              }
            }
          }
        })
        // setApprovals(allData)
        setApprovals([...pending, ...review, ...denied, ...approved])
        setForApproval(pending.length)
        setApproved(approved.length)
        setDenied(denied.length)
        setReview(review.length)
        setIsLoading(false)
      })

    fetch('http://localhost:3000/application')
      .then(res => res.json())
      .then(data => {
        let allData = []
        data.map(indivData => {
          allData.push(indivData)
        })
        setApplications(allData)
      })

      fetch('http://localhost:3000/applicationform')
      .then(res => res.json())
      .then(data => {
        let approverCode = data[0].data.approvers
        let ceo = []
        let coo = []
        let hraManager = []
        fetch('http://localhost:3000/employee')
          .then(res => res.json())
          .then(data => {
            data.map(inidvData => {
              if (inidvData.code === approverCode.ceo) {
                ceo.push(inidvData)
              }
              if (inidvData.code === approverCode.coo) {
                coo.push(inidvData)
              }
              if (inidvData.code === approverCode.hra_manager) {
                hraManager.push(inidvData)
              }
            })
            setEmployees(data)
          })
          .then(() => {
            setCeo(ceo[0])
            setCoo(coo[0])
            setHraManager(hraManager[0])
          })
      })

  }

  const handleShowForm = (data) => {
    console.log("LoggedInUser",typeof(empCode))
    setSelectedApproval(data)
    let projectManID = ""
    let immediateSupID = ""
    applications.map(indivApplication => {
      if(indivApplication.collateid === data.collateid) {
        setSelectedApplication(indivApplication)
        setSelectedApplicationData(indivApplication.application_data)
        projectManID = indivApplication.application_data.project_manager
        immediateSupID = indivApplication.application_data.immediate_supervisor
      }
    })
    employees.map(indivEmpoyee => {
      if (indivEmpoyee.code === immediateSupID) {
        setImmediateSupervisor(indivEmpoyee)
      }
      if (indivEmpoyee.code === projectManID) {
        setProjectManager(indivEmpoyee)
      }
    })
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
    setShowForm(!showForm)
  }

  const handleRefresh = () => {
    setShowForm(false)
    setIsReady(false)
    setHideSupervisorNotes(true)

  }

  const handleShowSupervisorNotes = () => {
    setHideSupervisorNotes(!hideSupervisorNotes)
  }

  const handleEditSupervisorNotes = () => {

  }

  const handleSupervisorNotesChange = (e) => {
    let supervisorNotes = e.target.value.split(/[\s]+/)
    let trimmedSupervisorNotesL1 = []
    let trimmedSupervisorNotesL2 = []
    let trimmedSupervisorNotesL3 = []
    let trimmedSupervisorNotesL4 = []
    let trimmedSupervisorNotesL5 = []
    let trimmedSupervisorNotesL6 = []
    let trimmedSupervisorNotesL7 = []
    let trimmedSupervisorNotesL8 = []
    let trimmedSupervisorNotesL9 = []
    supervisorNotes.map(word => {
      if(trimmedSupervisorNotesL1.length <=9) {
        return trimmedSupervisorNotesL1.push(word)
      } else if(trimmedSupervisorNotesL2.length <=9) {
        return trimmedSupervisorNotesL2.push(word)
      } else if(trimmedSupervisorNotesL3.length <=9) {
        return trimmedSupervisorNotesL3.push(word)
      } else if(trimmedSupervisorNotesL4.length <=9) {
        return trimmedSupervisorNotesL4.push(word)
      } else if(trimmedSupervisorNotesL5.length <=9) {
        return trimmedSupervisorNotesL5.push(word)
      } else if(trimmedSupervisorNotesL6.length <=9) {
        return trimmedSupervisorNotesL6.push(word)
      } else if(trimmedSupervisorNotesL7.length <=9) {
        return trimmedSupervisorNotesL7.push(word)
      } else if(trimmedSupervisorNotesL8.length <=9) {
        return trimmedSupervisorNotesL8.push(word)
      } else {
        return trimmedSupervisorNotesL9.push(word)
      }
    })
    setSupervisorNotesL1(trimmedSupervisorNotesL1.join(" "))
    setSupervisorNotesL2(trimmedSupervisorNotesL2.join(" "))
    setSupervisorNotesL3(trimmedSupervisorNotesL3.join(" "))
    setSupervisorNotesL4(trimmedSupervisorNotesL4.join(" "))
    setSupervisorNotesL5(trimmedSupervisorNotesL5.join(" "))
    setSupervisorNotesL6(trimmedSupervisorNotesL6.join(" "))
    setSupervisorNotesL7(trimmedSupervisorNotesL7.join(" "))
    setSupervisorNotesL8(trimmedSupervisorNotesL8.join(" "))
    setSupervisorNotesL9(trimmedSupervisorNotesL9.join(" "))
  }

  const handleSaveSupervisorNotes = () => {
    setIsReady(false)
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')

    fetch(`http://localhost:3000/application?id=${selectedApplication.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${creds}` },
          body: JSON.stringify({
            application_form_code: selectedApplication.application_form_code,
            employee_code: selectedApplication.employee_code,
            application_data: {
              employee_table_id: selectedApplicationData.employee_table_id,
              name: selectedApplicationData.name,
              employee_code: selectedApplicationData.employee_code,
              department: selectedApplicationData.department,
              designation: selectedApplicationData.designation,
              joining_date: selectedApplicationData.joining_date,
              employee_signature: selectedApplicationData.employee_signature,
              nationality: selectedApplicationData.nationality,
              employee_signature_date: selectedApplicationData.employee_signature_date,
              new_designation: selectedApplicationData.new_designation,
              supervisor_notesL1: supervisorNotesL1,
              supervisor_notesL2: supervisorNotesL2,
              supervisor_notesL3: supervisorNotesL3,
              supervisor_notesL4: supervisorNotesL4,
              supervisor_notesL5: supervisorNotesL5,
              supervisor_notesL6: supervisorNotesL6,
              supervisor_notesL7: supervisorNotesL7,
              supervisor_notesL8: supervisorNotesL8,
              supervisor_notesL9: supervisorNotesL9,
              immediate_supervisor: selectedApplicationData.immediate_supervisor,
              immidiate_supervisor_manager_signature: selectedApplicationData.immidiate_supervisor_manager_signature,
              immidiate_supervisor_sign_date: selectedApplicationData.immidiate_supervisor_sign_date,
              project_manager_notesL1: selectedApplicationData.project_manager_notesL1,
              project_manager_notesL2: selectedApplicationData.project_manager_notesL2,
              project_manager_notesL3: selectedApplicationData.project_manager_notesL3,
              project_manager_notesL4: selectedApplicationData.project_manager_notesL4,
              project_manager_notesL5: selectedApplicationData.project_manager_notesL5,
              project_manager_notesL6: selectedApplicationData.project_manager_notesL6,
              project_manager_notesL7: selectedApplicationData.project_manager_notesL7,
              project_manager_notesL8: selectedApplicationData.project_manager_notesL8,
              project_manager_notesL9: selectedApplicationData.project_manager_notesL9,
              project_manager: selectedApplicationData.project_manager,
              project_manager_signature: selectedApplicationData.project_manager_signature,
              project_manager_sign_date: selectedApplicationData.project_manager_sign_date,
              hr_manager_signature: selectedApplicationData.hr_manager_signature,
              hr_manager_sign_date: selectedApplicationData.hr_manager_sign_date,
              hr_manager_notes: selectedApplicationData.hr_manager_notes,
              coo_signature: selectedApplicationData.coo_signature,
              coo_notes: selectedApplicationData.coo_notes,
              coo_sign_date: selectedApplicationData.coo_sign_date,
              ceo_signature: selectedApplicationData.ceo_signature,
              ceo_notes: selectedApplicationData.ceo_notes,
              ceo_sign_date: selectedApplicationData.ceo_sign_date,
              createdby: selectedApplicationData.createdby,
              createdat: selectedApplicationData.createdat,
              updatedby: name,
              updatedat: moment(new Date()).format("MM/DD/YYYY")
            },
            status: selectedApplication.status,
            createdBy: selectedApplication.createdBy,
            createdAt: selectedApplication.createdAt,
            updatedBy: name,
            updatedAt: moment(new Date()).format("MM/DD/YYYY")
          })
        })
          .then(res => res.json())
          .then(data => {
            handleShowSupervisorNotes()
            fetch('http://localhost:3000/application')
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.error}`,
              })
            } else {
              if(isEdit){
                Swal.fire(
                  'Success!',
                  'Comments has been updated successfully!',
                  'success'
                )
              } else {
                Swal.fire(
                  'Success!',
                  'Comments has been added successfully!',
                  'success'
                )
              }
            }
            let allData = []
            data.map(indivData => {
              allData.push(indivData)
            })
            setApplications(allData)
            allData.map(indivApplication => {
              if (indivApplication.collateid === selectedApproval.collateid) {
                setSelectedApplication(indivApplication)
                setSelectedApplicationData(indivApplication.application_data)
              }
            })
          })
          .then(() => {
            setIsReady(true)
          })
        
          })
  }

  return(
    <React.Fragment>
      <div className="row">
        <div className="col-4 offset-8 text-right">
         <ChangeProfessionApprovalForm 
          isReady={isReady}
          showForm={showForm}
          handleShowForm={handleShowForm}
          handleRefresh={handleRefresh}
          selectedApplication={selectedApplication}
          selectedApplicationData={selectedApplicationData}
          selectedApproval={selectedApproval}
          empCode={empCode}
          projectManager={projectManager}
          immediateSuperviso={immediateSupervisor}
          hraManager={hraManager}
          coo={coo}
          ceo={ceo}
          accessLevel={accessLevel}
          handleEditSupervisorNotes={handleEditSupervisorNotes}
          handleShowSupervisorNotes={handleShowSupervisorNotes}
          hideSupervisorNotes={hideSupervisorNotes}
          handleSupervisorNotesChange={handleSupervisorNotesChange}
          handleSaveSupervisorNotes={handleSaveSupervisorNotes}
         />
        </div>
      </div>
      <Sidebar />
      <div className="main-panel">
        <Topbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 ">
              <Row style={{ padding: "30px 0 15px 0" }}>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid yellow", borderBottom: "5px solid yellow" }}>
                    <CardTitle><h1>Pending</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{forApproval}</CardSubtitle>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid green", borderBottom: "5px solid green" }}>
                    <CardTitle><h1>Approved</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{approved}</CardSubtitle>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid red", borderBottom: "5px solid red" }}>
                    <CardTitle><h1>Denied</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{denied}</CardSubtitle>
                  </Card>
                </Col>
                {/* </Row>
              <Row> */}
                <div className="col-md-3">
                  {/* <div className="col-md-4 offset-4"> */}
                  <Card body className="text-center" style={{ borderLeft: "5px solid blue", borderBottom: "5px solid blue" }}>
                    <CardTitle><h1>For Review</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}>{review}</CardSubtitle>
                  </Card>
                </div>
              </Row>
              <div className='col-lg-12 justify-content-center'>
                <Card>
                  <CardBody>
                    <ChangeProfessionApprovalTable 
                      data={approvals}
                      handleShowForm={handleShowForm}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
})

export default ChangeProfessionApproval



// 
&& (employee.project_manager !== "" || employee.project_manager !== null && employee.immediate_superior !== "" || employee.immediate_superior !== null)



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


accounting_department_signature_and_date: ""
accounting_dept_sign_date: ""
airport_transportation_accommodation: "qwe"
airport_transportation_arrival_date: "2020-09-02"
airport_transportation_departure_date: "2020-08-26"
airport_transportation_mobile_number: "qwe"
be_back_on: "2020-09-03"
ceo_sign_date: ""
ceo_signature_and_date: ""
contact_number: "09201234567"
coo_sign_date: ""
coo_signature_and_date: ""
createdat: "08-26-2020"
createdby: "Roronoa Zoro"
departure_date: "2020-08-26"
employee_code: "BGS017"
employee_signature: "uploads\signature\831fbf15d7287aacba2038db5a15714c"
employee_signature_date: "08-26-2020"
handover_briefing_to_successor: true
handover_briefing_to_successor_employee_code: ""
handover_briefing_to_successor_employee_name: "Rock Lee / BGS012"
handover_documents: true
handover_documents_employee_code: ""
handover_documents_employee_name: "Neji Hyuga / BGS013"
hr_manager_sign_date: ""
hr_manager_signature_and_date: ""
immediate_supervisor: "BGS011"
immidiate_supervisor_manager_signature_and_date: ""
immidiate_supervisor_sign_date: ""
items_issued: "qwe"
items_issued2: "qwe"
items_issued3: "qwe"
items_issued4: "qwe"
leave_from: "2020-08-26"
leave_to: "2020-09-02"
leave_type: "Annual"
logistics_officer_sign_date: ""
logistics_officer_signature_and_date: ""
name: "Obito Uchiha"
position: "Staff"
project: "Main Office"
project_manager: "BGS010"
project_manager_sign_date: ""
project_manager_signature_and_date: ""
receive_others: true
receive_others_remarks: "qwe"
receive_settlement: true
receive_ticket: true
remarks: "qwe"
remarks2: "qwe"
remarks3: "qwe"
remarks4: "qwe"
return_date: "2020-09-02"
updatedat: "08-26-2020"
updatedby: "Roronoa Zoro"




              {/* {selectedApplication.application_form_code === "LEAVE_STAFF_APPLICATION" ? 
                <ApprovalformStaff 
                  selectedApplicationData={selectedApplicationData}
                  isReady={isReady}
                  selectedApplication={selectedApplication}
                  selectedApproval={selectedApproval}
                  hideSupervisorComments={hideSupervisorComments}
                  handleSupervisorCommentsChange={handleSupervisorCommentsChange}
                  isEdit={isEdit}
                  supervisorComments={supervisorComments}
                  handleSaveSupervisorComments={handleSaveSupervisorComments}
                  handleShowSupervisorComments={handleShowSupervisorComments}
                />
                :
                selectedApplication.application_form_code === "LEAVE_WORKER_APPLICATION" ? */}