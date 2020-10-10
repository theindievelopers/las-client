import React, { Fragment } from 'react';
import {
  FormGroup,
  Label,
  Input, Form
} from 'reactstrap';

const FormInput = ({onBlur, label, name, type, placeholder, onChange, defaultValue, required, ...props}) => {
  return(
    <Fragment>
        <FormGroup>
          <Label>{label}</Label>
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={defaultValue}
            />
        </FormGroup>
    </Fragment>
  )
}

export default FormInput;