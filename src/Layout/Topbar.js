import React, { useContext } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { CredsContext } from '../context/Context';
import Swal from 'sweetalert2';

const Topbar = () => {
  const { name } = useContext(CredsContext)

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to Logout?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, Log me out`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Success!',
          'Your are succesfully logged out.',
          'success'
          )
          sessionStorage.clear();
          localStorage.clear();
          window.location.reload();
          window.location.replace('#/login');
      }
    })
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
