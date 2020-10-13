/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useContext } from 'react';
import { Collapse } from 'reactstrap';
import logo from '../img/logo.jpg'
import { CredsContext } from '../context/Context';

const Sidebar = () => {
  const { accessLevel } = useContext(CredsContext)

  const [isOpen, setIsOpen] = useState(false);
  const [approvalsOpen, setApprovalsOpen] = useState(false)
  const [applicationsOpen, setApplicationsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen);
  const toggleApprovals = () => setApprovalsOpen(!approvalsOpen);
  const toggleApplications = () => setApplicationsOpen(!applicationsOpen);

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
              <a id="theLink" onClick={toggleApplications} >
                Applications
                <i className="fa fa-caret-down" style={{marginLeft: 57}} aria-hidden="true"></i>
              </a>
            
              <Collapse isOpen={applicationsOpen}>
              <ul className='list-unstyled'>
                <li>
                  <a href='#/leaves'>
                    Leaves
                  </a>
                </li>
                <li>
                  <a href='#/resignation'>
                    Resignation
                  </a>
                </li>
                <li>
                  <a href='#/changeprofession'>
                    Change Profession
                  </a>
                </li>
                <li>
                  <a href='#/incrementrequest'>
                    Increment Request
                  </a>
                </li>
              </ul>
            </Collapse>
          </li>
          {accessLevel === 1 || accessLevel === 2 || accessLevel === 3 ?
            <li>
              <a id="theLink" onClick={toggleApprovals} >
                Approvals
                <i className="fa fa-caret-down" style={{marginLeft: 77}} aria-hidden="true"></i>
              </a>
            
              <Collapse isOpen={approvalsOpen}>
                <ul className='list-unstyled'>
                  <li>
                    <a href='#/leave/approvals'>
                      Leave
                    </a>
                  </li>
                  <li>
                    <a href='#/resignation/approvals'>
                      Resignation
                    </a>
                  </li>
                  <li>
                    <a href='#/changeprofession/approvals'>
                      Change Profession
                    </a>
                  </li>
                  <li>
                    <a href='#/incrementrequest/approvals'>
                      Increment Request
                    </a>
                  </li>
                </ul>
              </Collapse>
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
                  <li>
                    <a href='#/admin/employees'>
                      Employees
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
