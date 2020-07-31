import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const Topbar = () => {

  const [user, setUser] = useState({});

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.replace('#/login');
  };

  return (
    <div id="topbar">
      <Navbar className="my-0 py-3" color='white' light>
        <Nav className='ml-auto'>
          <NavItem>
            <NavLink className='text-uppercase' href='#'>
              Hello, {sessionStorage.user}
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
