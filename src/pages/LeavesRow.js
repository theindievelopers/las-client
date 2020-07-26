import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import WorkerPDF from '../components/PDForms/WorkerPDF';

const LeavesRow = ({ leave }) => {
  console.log(leave)

  return (
    <Fragment>
      <tr>
        <td>{leave.i}</td>
        <td>{leave.employeeNum}</td>
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
              color="info"
            >
              <PDFDownloadLink document={
                <WorkerPDF 
                  employeeNum={leave.employeeNum}
                  name={leave.name}
                  position={leave.position}
                  department={leave.department}
                  departureDate={leave.departureDate}
                  returnDate={leave.returnDate}
                  typeOfLeave={leave.typeOfLeave}
                  contactNum={leave.contactNum}
                  itemIssued={leave.itemIssued}
                />
                } fileName="workerleave.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Form')}
              </PDFDownloadLink>
            </Button>
          </div>
        </td>
      </tr>
    </Fragment>
  )
}

export default LeavesRow;