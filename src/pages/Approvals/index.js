import React, {useEffect, useState} from "react";
import Sidebar from "../../Layout/Sidebar";
import Topbar from "../../Layout/Topbar";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const Approvals = () => {

  const [applicationPendings, setApplicationPendings] = useState({})

  useEffect(() => {
    fetch('http://localhost:3000/application')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let leaves = 0;
        let resignation = 0;
        data.map(indivData => {
          if(indivData.application_form_code === "LEAVE_STAFF" && indivData.application_form_code === "LEAVE_WORKER" && indivData.status === "PENDING"){
            leaves++
          }
          if(indivData.application_form_code === "RESIGNATION" && indivData.application_form_code === "RESIGNATION" && indivData.status === "PENDING"){
            resignation++
          }
        })
        setApplicationPendings({
          leaves,
          resignation
        })
      })
  }, [])

  const handleRedirect = () => {
    window.location.replace("#/leave/approvals");
  };
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
                <h1 className="pt-5 pb-3">Approvals</h1>
              </div>
              <div className="row" style={{ color: 'black' }}>
                <div className="col-md-3 justify-content-center">
                  <Link to="/leave/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>LEAVES STAFF/WORKER</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.leaves}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center">
                  <Link to="/resignation/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>RESIGNATION</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">{applicationPendings.resignation}</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center">
                  <Link to="/leave/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>STAFF REQUISITION</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">4</Badge></CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
                <div className="col-md-3 justify-content-center">
                  <Link to="/leave/approvals" style={{ textDecoration: 'none', color: '#373a3c' }}>
                    <Card>
                      <CardBody>
                        <CardTitle><strong>CLEARANCE STAFF/WORKER</strong></CardTitle>
                        <CardText>Pendings: <Badge color="danger">4</Badge></CardText>
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
