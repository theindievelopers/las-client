import React, { useContext } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { CredsContext } from '../context/Context';

const Topbar = () => {
  const { name } = useContext(CredsContext)

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace('#/login');
  };

  return (
    <div id="topbar">
      <Navbar className="my-0 py-3" color='white' light>
        <Nav className='ml-auto'>
          <NavItem>
            <NavLink className='text-uppercase' href='#'>
              Hello {name}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='text-uppercase' onClick={handleLogout} style={{cursor: 'pointer'}}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Topbar;
