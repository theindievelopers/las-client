import React, { useState } from 'react'
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Card, CardBody, CardImg
  // FormText
} from 'reactstrap';

const LeaveStaff = (props) => {
  console.log(props.selectedEmployee)

  

  return (
    <React.Fragment>
      <h4>Leave Staff</h4>
      <FormGroup>
        <Label for="signature">Signature</Label>
        <Input type="file" name="signature" id="signature" accept="image/*" onChange={props.handleSignature} />
      </FormGroup>
    </React.Fragment>
  )
}

export default LeaveStaff;