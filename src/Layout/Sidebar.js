import React, { Fragment, useState } from 'react';
import { Collapse } from 'reactstrap';
import logo from '../img/logo.jpg'

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

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
            <a href='#/employees'>
              Employees
            </a>
          </li>
          <li>
            <a href='#/leaves'>
              Leaves
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
