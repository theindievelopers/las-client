import React, { useState } from 'react';
import {
  CardTitle,
  Button,
  Card,
  CardBody
} from 'reactstrap';
import {
  FormInput
} from '../globalcomponents';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameRequired, setUsernameRequired] = useState(true)
  const [passwordRequired, setPasswordRequired] = useState(true)

  const handleUsernameChange = (e) => {
    if (e.target.value === "") {
      setUsernameRequired(true)
      setUsername("")
    } else {
      setUsernameRequired(false)
      setUsername(e.target.value)
    }
  }

  const handlePasswordChange = (e) => {
    if (e.target.value === "") {
      setPasswordRequired(true)
      setPassword("")
    } else {
      setPasswordRequired(false)
      setPassword(e.target.value)
    }
  }

  const handleLogin = () => {
    if (usernameRequired) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username Required!',
      })
    } else if (passwordRequired) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password Required!',
      })
    } else {
      fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (!data.success) {
            return (Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Username or Password not match!',
            })
            )
          }
          sessionStorage.empCode = JSON.stringify(data.data.employeecode)
          sessionStorage.accessLevel = JSON.stringify(data.data.accesslvl)
          sessionStorage.name = JSON.stringify(data.data.fullname)
          sessionStorage.isLoggedIn = true;
          if (data.data.accesslvl === 3) {
            return window.location.replace('#/leaves');
          } else if (data.data.accesslvl === 2) {
            return window.location.replace('#/approvals');
          } else if (data.data.accesslvl === 1) {
            return window.location.replace('#/');
          }
        })
    }
  }

  return (
    <React.Fragment>
      <div className="col-lg-4 offset-lg-4 py-5">
        <Card className="my-5">
          <CardBody>
            <CardTitle className="text-center"><h1>Login</h1></CardTitle>
            <FormInput
              label={"Username"}
              type={"text"}
              name={"text"}
              placeholder={"Enter Username"}
              onChange={handleUsernameChange}
              required={usernameRequired}
            />
            <FormInput
              label={"Password"}
              type={"password"}
              name={"password"}
              placeholder={"Enter Password"}
              onChange={handlePasswordChange}
              required={passwordRequired}
            />
            <Button
              className="btn-default"
              block
              onClick={handleLogin}
            >Login</Button>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default Login;