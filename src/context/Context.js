import React, { createContext, useState, useEffect } from 'react';
import { config } from '../config/config';

export const CredsContext = createContext();

const ContextProvider = (props) => {

  const [empCode, setEmpCode] = useState()
  const [accessLevel, setAccessLevel] = useState()
  const [name, setName] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [employees, setEmployees] = useState([])
  const [username, setUsername] = useState()

  useEffect(() => {
    if(sessionStorage.token) {
      let data = Buffer.from(sessionStorage.token, "base64").toString().split(":");
      saveCreds(data[0], JSON.parse(data[1]), data[2], JSON.parse(data[3]), data[4])
    }

    const abortController = new AbortController()
    const signal = abortController.signal

    fetch(`${config.baseURL}/employee`, { signal: signal })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setEmployees(data)
        }
      })

     return function cleanUp() {
      abortController.abort()
    }
  }, [])

  const saveCreds = (empCode, accessLevel, name, isLoggedIn, username) => {
    setEmpCode(empCode)
    setAccessLevel(accessLevel)
    setName(name)
    setIsLoggedIn(isLoggedIn)
    setUsername(username)
  }


  return (
    <CredsContext.Provider value={{ empCode, accessLevel, name, isLoggedIn, saveCreds, employees, username }}>
      {props.children}
    </CredsContext.Provider>
  )
}

export default ContextProvider