import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import WorkerPDF from '../components/PDForms/WorkerPDF';
import moment from 'moment';

const LeavesRow = ({ leave }) => {
  const [additionPdfName, setAdditionalPdfName] = useState(moment(new Date()).format('x'))
  console.log(leave)

  return (
    <React.Fragment>
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
              // color="info"
              style={{border: "1px solid black", backgroundColor:"white"}}
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
                } fileName = {`${leave.name}-${additionPdfName}-workerleave.pdf`}>
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <i class="far fa-file-pdf"></i>)}
              </PDFDownloadLink>
            </Button>
          </div>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default LeavesRow;