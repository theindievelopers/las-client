import React, { Fragment, useState } from 'react';
import { Collapse } from 'reactstrap';

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
            <span className='logo-text-admin ml-3 mt-3'>Boom</span><br />
          </a>
        </div>

        <ul className='list-unstyled components'>
          <li>
            <a href='#/leaves'>
              Leaves
            </a>
          </li>

          <li>
            <a href='#/forms'>
              Forms
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
