/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../Layout/Sidebar'
import Topbar from '../Layout/Topbar'
import { CredsContext } from '../context/Context'
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';
import LeaveApplicationWorkerPDF from '../components/PDForms/LeaveApplicationWorkerPDF';

const HomePage = (props) => {

  const { isLoggedIn, accessLevel, empCode } = useContext(CredsContext)

  const [isReady, setIsReady] = useState(false)
  const [applicationPendings, setApplicationPendings] = useState({})


  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace('#/login')
    }

    fetch('http://localhost:3000/approvals')
      .then(res => res.json())
      .then(data => {
        let leavesPending = 0;
        let leavesReview = 0;
        let resignationPending = 0;
        let resignationReview = 0;
        let staffrequisitionPending = 0;
        let staffrequisitionReview = 0;
        let changeProfessionPending = 0;
        let changeProfessionReview = 0;
        let incrementRequestPending = 0;
        let incrementRequestReview = 0;
        let leaveApplicationPending = 0;
        let leaveApplicationReview = 0;
        data.map(indivData => {
          if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.approver_id) {
            if((indivData.application_type === "LEAVE_STAFF" || indivData.application_type === "LEAVE_WORKER") && indivData.status === "PENDING"){
              leavesPending++
            }
            if((indivData.application_type === "LEAVE_STAFF" || indivData.application_type === "LEAVE_WORKER") && indivData.status === "REVIEW"){
              leavesReview++
            }
            if(indivData.application_type === "RESIGNATION" && indivData.status === "PENDING"){
              resignationPending++
            }
            if(indivData.application_type === "RESIGNATION" && indivData.status === "REVIEW"){
              resignationReview++
            }
            if(indivData.application_type === "STAFF_REQUISITION" && indivData.status === "PENDING"){
              staffrequisitionPending++
            }
            if(indivData.application_type === "STAFF_REQUISITION" && indivData.status === "REVIEW"){
              staffrequisitionReview++
            }
            if(indivData.application_type === "CHANGE_PROFESSION" && indivData.status === "PENDING"){
              changeProfessionPending++
            }
            if(indivData.application_type === "CHANGE_PROFESSION" && indivData.status === "REVIEW"){
              changeProfessionReview++
            }
            if(indivData.application_type === "INCREMENT_REQUEST" && indivData.status === "PENDING"){
              incrementRequestPending++
            }
            if(indivData.application_type === "INCREMENT_REQUEST" && indivData.status === "REVIEW"){
              incrementRequestReview++
            }
            if(indivData.application_type === "LEAVE_WORKER_APPLICATION" && indivData.status === "PENDING"){
              leaveApplicationPending++
            }
            if(indivData.application_type === "LEAVE_WORKER_APPLICATION" && indivData.status === "REVIEW"){
              leaveApplicationReview++
            }
          }
        })
        setApplicationPendings({
          leavesPending,
          leavesReview,
          resignationPending,
          resignationReview,
          staffrequisitionPending,
          staffrequisitionReview,
          changeProfessionPending,
          changeProfessionReview,
          incrementRequestPending,
          incrementRequestReview,
          leaveApplicationPending,
          leaveApplicationReview
        })
      })

      setTimeout(() => {
        setIsReady(true);
      }, 1000);
  }, [])

  return (
    <React.Fragment>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='container'>
            <div className="row justify-content-center">
              <div className="col-md-12 ">
                <div className="text-center">
                  <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>DASHBOARD</h1>
                </div>
                { accessLevel === 1 || accessLevel === 2 || accessLevel === 3 ?
                  <div className="row" style={{ color: 'black' }}>
                    <div className="col-md-4 justify-content-center pb-4">
                      <Link to="/leave/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                        <Card>
                          <CardBody>
                            <CardTitle><strong>LEAVE CLEARANCE</strong></CardTitle>
                            <CardText>
                                Pendings: <Badge color="danger">{applicationPendings.leavesPending} </Badge> Reviews: <Badge color="danger">{applicationPendings.leavesReview} </Badge>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </div>
                    <div className="col-md-4 justify-content-center pb-4">
                      <Link to="/leaveapplication/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                        <Card>
                          <CardBody>
                            <CardTitle><strong>LEAVE APPLICATION</strong></CardTitle>
                            <CardText>
                                Pendings: <Badge color="danger">{applicationPendings.leaveApplicationPending} </Badge> Reviews: <Badge color="danger">{applicationPendings.leaveApplicationReview} </Badge>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </div>
                    <div className="col-md-4 justify-content-center pb-4">
                      <Link to="/resignation/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                        <Card>
                          <CardBody>
                            <CardTitle><strong>RESIGNATION</strong></CardTitle>
                            <CardText>
                              Pendings: <Badge color="danger">{applicationPendings.resignationPending}</Badge> Reviews: <Badge color="danger">{applicationPendings.resignationReview}</Badge>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </div>
                    <div className="col-md-4 justify-content-center pb-4">
                      <Link to="/changeprofession/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                        <Card>
                          <CardBody>
                            <CardTitle><strong>CHANGE PROFESSION REQUEST</strong></CardTitle>
                            <CardText>
                              Pendings: <Badge color="danger">{applicationPendings.changeProfessionPending}</Badge> Reviews: <Badge color="danger">{applicationPendings.changeProfessionReview}</Badge>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </div>
                    <div className="col-md-4 justify-content-center pb-4">
                      <Link to="/incrementrequest/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                        <Card>
                          <CardBody>
                            <CardTitle><strong>INCREMENT REQUEST</strong></CardTitle>
                            <CardText>
                              Pendings: <Badge color="danger">{applicationPendings.incrementRequestPending}</Badge> Reviews: <Badge color="danger">{applicationPendings.incrementRequestReview}</Badge>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </div>
                  </div>
                  : ""
                }
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
}

export default HomePage;