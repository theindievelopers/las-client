import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../../Layout/Sidebar'
import Topbar from '../../../Layout/Topbar'
import moment from 'moment'
import { Card, CardTitle, CardSubtitle, Row, Col, CardBody } from 'reactstrap';
import Swal from 'sweetalert2'
import { CredsContext } from '../../../context/Context'
import ResignationApprovalTable from '../Resignation/ResignationApprovalTable';


const StaffRequisitionApproval = () => {
  return(
    <React.Fragment>
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
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}></CardSubtitle>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid green", borderBottom: "5px solid green" }}>
                    <CardTitle><h1>Approved</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}></CardSubtitle>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid red", borderBottom: "5px solid red" }}>
                    <CardTitle><h1>Denied</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}></CardSubtitle>
                  </Card>
                </Col>
                </Row>
              <Row>
                <div className="col-md-3">
                  <Card body className="text-center" style={{ borderLeft: "5px solid blue", borderBottom: "5px solid blue" }}>
                    <CardTitle><h1>For Review</h1></CardTitle>
                    <CardSubtitle style={{ fontSize: "23px", fontWeight: "bold" }}></CardSubtitle>
                  </Card>
                </div>
              </Row>
              <div className='col-lg-12 justify-content-center'>
                <Card>
                  <CardBody>
                    <ResignationApprovalTable />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default StaffRequisitionApproval;
