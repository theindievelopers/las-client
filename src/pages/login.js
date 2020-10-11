import React, { useState, useContext } from 'react';
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
import { CredsContext } from '../context/Context'

const Login = () => {
  const { saveCreds } = useContext(CredsContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameRequired, setUsernameRequired] = useState(true)
  const [passwordRequired, setPasswordRequired] = useState(true)

  const handleUsernameChange = (e) => {
    e.preventDefault()
    if (e.target.value === "") {
      setUsernameRequired(true)
      setUsername("")
    } else {
      setUsernameRequired(false)
      setUsername(e.target.value)
    }
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (e.target.value === "") {
      setPasswordRequired(true)
      setPassword("")
    } else {
      setPasswordRequired(false)
      setPassword(e.target.value)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const creds = Buffer.from(`${username}:`, 'utf8').toString('base64')
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
          'Content-Type': 'application/json',
          'Authorization': `Basic ${creds}`
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
          const token = Buffer.from(`${data.data.employeecode}:${data.data.accesslvl}:${data.data.fullname}:true:${username}`, 'utf8').toString('base64')
          saveCreds(data.data.employeecode, data.data.accesslvl, data.data.fullname, true, username)
          sessionStorage.token = token
          // if (data.data.accesslvl === 1) {
          //   return window.location.replace('#/');
          // } else if (data.data.accesslvl === 2) {
          //   return window.location.replace('#/approvals');
          // } else {
          //   return window.location.replace('#/leaves');
          // }
        })
        .then(()=> {
          window.location.replace('#/');
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