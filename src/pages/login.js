import React, { useState } from 'react';
import {
  CardTitle,
  Button,
  Card,
  CardBody
} from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import {
  FormInput
} from '../globalcomponents';
// import Axios from 'axios';
// import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameRequired, setUsernameRequired] = useState(true)
  const [passwordRequired, setPasswordRequired] = useState(true)
  const [userCredentials, setUserCredentials] = useState({
    username: 'admin',
    password: 'admin'
  })

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
    if(username === userCredentials.username && password === userCredentials.password) {
      sessionStorage.isLoggedIn = true;
      sessionStorage.user = userCredentials.username
      window.location.replace('#/')
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