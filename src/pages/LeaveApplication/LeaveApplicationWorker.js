import React from 'react';
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  // FormText
} from 'reactstrap';

const LeaveApplicationWorker = React.memo(({
  selectedEmployee, submitWorker, isEdit, noOfDaysApplied, selectedApplication,
  ...props
}) => {
  return(
    <React.Fragment>
      <div style={{ marginTop: 10 }}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Country Destination:</Label>
              <Input bsSize="sm" type="text" placeholder="Country Destination" onBlur={props.handleCountryDestinationChange}
                defaultValue={isEdit ? selectedApplication.application_data.country_of_destination : ""}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Contact no. in Country of Destination:</Label>
              <Input bsSize="sm" type="number" placeholder="Contact no. in Country of Destination" onBlur={props.handleContactCountryDestinationChange}
                defaultValue={isEdit ? selectedApplication.application_data.contact_country_destination : ""}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Leave Type: *</Label>
              <Input bsSize="sm"
                type="select"
                name="leaveType"
                id="leaveType"
                onBlur={props.handleLeaveTypeChange}
                defaultValue={isEdit ? selectedApplication.application_data.leave_type : ""}
              >
                <option>-</option>
                <option>Annual</option>
                <option>Unpaid</option>
                <option>Sick</option>
                <option>Emergency</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Leave Starting Date: *</Label>
              <Input bsSize="sm" type="date" placeholder="" onChange={props.handleLeaveStartDate} 
                defaultValue={isEdit ? selectedApplication.application_data.leave_starting_date : ""}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Leave Ending Date: *</Label>
              <Input bsSize="sm" type="date" placeholder="" onChange={props.handleLeaveEndDate} 
                defaultValue={isEdit ? selectedApplication.application_data.leave_ending_date : ""}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Actual Travel Date: *</Label>
              <Input bsSize="sm" type="date" placeholder="" onChange={props.handleActualTravelDate} 
                defaultValue={isEdit ? selectedApplication.application_data.actual_travel_date : ""}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>No. of days Applied:</Label>
              <Input bsSize="sm" type="number" id="noOfDaysApplied" disabled={true} readOnly={true} placeholder="No. of days Applied" onBlur={props.handleNoOfDaysApplied}
                defaultValue={isEdit ? selectedApplication.application_data.no_of_days_applied : noOfDaysApplied} value={noOfDaysApplied}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Destination:</Label>
              <Input bsSize="sm" type="text" placeholder="Destination" onBlur={props.handleDestination}
                defaultValue={isEdit ? selectedApplication.application_data.destination : ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="button" className="mr-auto"
        // disabled={props.isLoading ? true : false}
        onClick={submitWorker}>
        {isEdit ? "Update" : "Submit" }
        </Button>
      </div>
    </React.Fragment>
  )
})

export default LeaveApplicationWorker;