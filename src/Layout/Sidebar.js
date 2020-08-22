import React, { Fragment, useState, useEffect } from 'react';
import { Collapse } from 'reactstrap';
import logo from '../img/logo.jpg'

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("")
  const [accessLevel, setAccessLevel] = useState()

  useEffect(() => {
    if(sessionStorage.isLoggedIn) {
      let user = JSON.parse(sessionStorage.name)
      let accessLevel = JSON.parse(sessionStorage.accessLevel)
      setUser(user)
      setAccessLevel(accessLevel)
    }
  }, [])

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <nav id='sidebar'>
        <div className='sidebar-header pt-1 px-0 border-bottom' style={{border: 'orange'}}>
          <a
            className='navbar-brand d-flex align-items-center py-0'
            href='#/'>
              <img src={logo} alt="boom general contractors" className="logo-img ml-3 mt-3" />
          </a>
        </div>
        <ul className='list-unstyled components'>
          <li>
            <a href='#/leaves'>
              Leaves
            </a>
          </li>
          <li>
            <a href='#/approvals'>
              Approvals
            </a>
          </li>
          {accessLevel === 1 || accessLevel === 2 ?
            <li>
              <a href='#/employees'>
                Employees
              </a>
            </li>
            : ""
          }
          {accessLevel === 1 ? 
            <li>
              <a id="theLink" onClick={toggle}>
                Admin
                <i className="fa fa-caret-down" style={{marginLeft: 110}} aria-hidden="true"></i>
              </a>
              
              <Collapse isOpen={isOpen}>
                <ul className='list-unstyled'>
                  <li>
                    <a href='#/admin/users'>
                      Users
                    </a>
                  </li>
                </ul>
              </Collapse>
            </li>
            : ""
          }
        </ul>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
