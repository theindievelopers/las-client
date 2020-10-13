/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState, useContext} from "react";
import Sidebar from "../../Layout/Sidebar";
import Topbar from "../../Layout/Topbar";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { CredsContext } from '../../context/Context'

const Approvals = () => {

  const { empCode, accessLevel } = useContext(CredsContext)
  const [applicationPendings, setApplicationPendings] = useState({})

  useEffect(() => {
    fetch('http://localhost:3000/approvals')
      .then(res => res.json())
      .then(data => {
        let leaves = 0;
        let resignation = 0;
        let staffrequisition = 0;
        let changeProfession = 0;
        let incrementRequest = 0;
        data.map(indivData => {
          if (accessLevel === 1 || accessLevel === 3 || empCode === indivData.approver_id) {
            if((indivData.application_type === "LEAVE_STAFF" || indivData.application_type === "LEAVE_WORKER") && indivData.status === "PENDING"){
              leaves++
            }
            if(indivData.application_type === "RESIGNATION" && indivData.status === "PENDING"){
              resignation++
            }
            if(indivData.application_type === "STAFF_REQUISITION" && indivData.status === "PENDING"){
              staffrequisition++
            }
            if(indivData.application_type === "CHANGE_PROFESSION" && indivData.status === "PENDING"){
              changeProfession++
            }
            if(indivData.application_type === "INCREMENT_REQUEST" && indivData.status === "PENDING"){
              incrementRequest++
            }
          }
        })
        setApplicationPendings({
          leaves,
          resignation,
          staffrequisition,
          changeProfession,
          incrementRequest
        })
      })
  }, [])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-4 offset-8 text-right"></div>
      </div>
      {/* <div className="row">
        <div className="col-lg-1">
        </div> */}
      <Sidebar />
      <div className="main-panel">
        <Topbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 ">
              <div className="text-center">
                <h1 className="pt-5 pb-3">Approvals Dashboard</h1>
              </div>
              <div className="row" style={{ color: 'black' }}>
                <div className="col-md-3 justify-content-center pb-2">
                  <Link to="/leave/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>LEAVES STAFF/WORKER</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.leaves}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center pb-2">
                  <Link to="/resignation/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>RESIGNATION</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.resignation}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center pb-2">
                  <Link to="/staffrequisition/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>STAFF REQUISITION</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.staffrequisition}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center pb-2">
                  <Link to="/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>CLEARANCE STAFF/WORKER</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">4</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center pb-2">
                  <Link to="/changeprofession/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>CHANGE PROFESSION REQUEST</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.changeProfession}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center pb-2">
                  <Link to="/incrementrequest/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>INCREMENT REQUEST</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.incrementRequest}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Approvals;
