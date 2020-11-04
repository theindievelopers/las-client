import React from 'react';
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  CustomInput,
  // FormText
} from 'reactstrap';

const LeaveApplicationStaff = React.memo(({
  isEdit, selectedApplication, noOfDaysApplied, selectedEmployee, disableOtherLeave, submitStaff,
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
              <Label>Mobile No. in Qatar:</Label>
              <Input bsSize="sm" type="number" placeholder="Mobile No. in Qatar" onBlur={props.handleMobileNoQatarChange}
                defaultValue={isEdit ? selectedApplication.application_data.mobile_no_qatar : ""}
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
                onChange={props.handleLeaveTypeChange}
                defaultValue={isEdit ? selectedApplication.application_data.leave_type : ""}
              >
                <option>-</option>
                <option>Annual</option>
                <option>Unpaid</option>
                <option>Sick</option>
                <option>Emergency(Condolence)</option>
                <option>Others</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Others:</Label>
              <Input bsSize="sm" type="text" disabled={disableOtherLeave} readOnly={disableOtherLeave} placeholder="Others" onBlur={props.handleOtherLeaveChange}
                defaultValue={isEdit ? selectedApplication.application_data.other_leave : ""}
              />
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
              <Label>No. of days to encashed:</Label>
              <Input bsSize="sm" type="number" id="noOfDaysApplied" placeholder="No. of days to be encashed" onBlur={props.handleNoOfDaysToEncashed}
                defaultValue={isEdit ? selectedApplication.application_data.no_of_days_to_encashed : ""}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Preferred Airlines:</Label>
              <Input bsSize="sm" type="text" id="noOfDaysApplied" placeholder="Preferred Airlines" onBlur={props.handlePreferredAirlines}
                defaultValue={isEdit ? selectedApplication.application_data.preferred_airlines : ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <hr />
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label>With Family Ticket:</Label>
                  <div style={{ paddingLeft: 20 }}>
                    <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Wife" onClick={props.handleWife} 
                      defaultChecked={isEdit && selectedApplication.application_data.with_wife ? true : false }
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>(If applicable):</Label>
                  <div style={{ paddingLeft: 20 }} >
                    <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Children" onClick={props.handleChildren} 
                      defaultChecked={isEdit && selectedApplication.application_data.with_children ? true : false }
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Dates from: *</Label>
                  <Input bsSize="sm" type="date" placeholder="" onChange={props.handleDatesFrom} 
                    defaultValue={isEdit ? selectedApplication.application_data.dates_from : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>To: *</Label>
                  <Input bsSize="sm" type="date" placeholder="" onChange={props.handleDatesTo} 
                    defaultValue={isEdit ? selectedApplication.application_data.dates_to : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Preferred Airlines:</Label>
                  <Input bsSize="sm" type="text" id="noOfDaysApplied" placeholder="Preferred Airlines" onBlur={props.handleFamilyPrferredAirlines}
                    defaultValue={isEdit ? selectedApplication.application_data.family_preferred_airlines : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button type="button" className="mr-auto"
        disabled={props.isLoading ? true : false}
        onClick={submitStaff}
        >
        {isEdit ? "Update" : "Submit" }
        </Button>
      </div>
    </React.Fragment>
  )
})

export default LeaveApplicationStaff;