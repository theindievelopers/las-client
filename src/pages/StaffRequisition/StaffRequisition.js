import React from "react";
import Sidebar from '../../Layout/Sidebar'
import Topbar from '../../Layout/Topbar'

const StaffRequisition = () => {
  return(
    <React.Fragment>
      <div className=''>
        <Sidebar />
        <div className='main-panel'>
          <Topbar />
          <div className='content'>
            <div className="text-center">
              <h1 className='col-lg-10 text-primary mt-5 py-3 ml-5'>Staff Requisition</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};


export default StaffRequisition;