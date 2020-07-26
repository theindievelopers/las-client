import React, { useState, useEffect } from 'react'
import Sidebar from '../Layout/Sidebar';
import Topbar from '../Layout/Topbar';
import moment from 'moment';
import LeavesRow from './LeavesRow';

const Leaves = () => {
  const [leaves, setLeaves] = useState([{
    name: 'Juan Dele Cruz',
    department: 'IT Deparment',
    departureDate: '07/28/2020',
    employeeNum: 123456789,
    position: 'Web Developer',
    returnDate: '08/27/2020',
    contactNum: '09123456789',
    typeOfLeave: 'annual',
    itemIssued: 'tools',
    passport: true,
    date: moment(new Date()).format('L'),

  }])


  return (
    <React.Fragment>
      <div className='d-flex'>
        <Sidebar />
        <div className='d-flex flex-column w-100'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Leaves</h1>
            </div>
            <div className='col-lg-10 justify-content-start mb-3 ml-5'>
              <table className='table table-striped border my-3'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Employee No.</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department/Project</th>
                    <th>Departure Date</th>
                    <th>Return Date</th>
                    <th>Type of Leave</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave,i) => (
                    <LeavesRow 
                      key={i}
                      leave={leave}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Leaves;