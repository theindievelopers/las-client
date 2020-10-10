import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import ContextProvider from './context/Context'

const Login = React.lazy(() => import('./pages/login'));
const HomePage = React.lazy(() => import('./pages/HomePage'))
const Employees = React.lazy(() => import('./pages/Employees/Employees'))
const Users = React.lazy(() => import('./pages/Users/Users'))
const Leaves = React.lazy(() => import('./pages/Leaves/Leaves'))
const Approvals = React.lazy(() => import('./pages/Approvals'))
const Resignation = React.lazy(() => import('./pages/Resignation/Resignation'))
const LeaveApproval = React.lazy(() => import('./pages/Approvals/Leave/LeaveApproval'))
const ResignationApproval = React.lazy(() => import('./pages/Approvals/Resignation/ResignationApproval'))
const StaffRequisition = React.lazy(()=> import('./pages/StaffRequisition/StaffRequisition'))
const StaffRequisitionApproval = React.lazy(() => import('./pages/Approvals/StaffRequisition/StaffRequisitionApproval'))
const ChangeProfession = React.lazy(() => import('./pages/ChangeProfession/ChangeProfession'))
const ChangeProfessionApproval = React.lazy(() => import('./pages/Approvals/ChangeProfession/ChangeProfessionApproval'))
const IncrementRequest = React.lazy(() => import('./pages/IncrementRequest/IncrementRequest'))
const IncrementRequestApproval = React.lazy(() => import('./pages/Approvals/IncrementRequestApproval/IncrementRequestApproval'))

function App() {
  const loading = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        Loading...
      </div>
    )
  }
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <ContextProvider>
          <Route
            path="/login"
            exact
            name="Login"
            render={props => <Login {...props} />}
          />
          <Route
            path="/"
            exact
            name="Home"
            render={props => <HomePage {...props} />}
          />
          <Route
            path="/admin/users"
            exact
            name="Users"
            render={props => <Users {...props} />}
          />
          <Route
            path="/leaves"
            exact
            name="Leaves"
            render={props => <Leaves {...props} />}
          />
          <Route
            path="/resignation"
            exact
            name="Resignation"
            render={props => <Resignation {...props} />}
          />
          <Route
            path="/staffrequisition"
            exact
            name="Staff Requisition"
            render={props => <StaffRequisition {...props} />}
          />
          <Route
            path="/changeprofession"
            exact
            name="Change Profession"
            render={props => <ChangeProfession {...props} />}
          />
          <Route
            path="/incrementrequest"
            exact
            name="Increment Request"
            render={props => <IncrementRequest {...props} />}
          />
          <Route
            path="/approvals"
            exact
            name="Approvals"
            render={props => <Approvals {...props} />}
          />
          <Route
            path="/leave/approvals"
            exact
            name="Leave Approvals"
            render={props => <LeaveApproval {...props} />}
          />
          <Route
            path="/resignation/approvals"
            exact
            name="Resignation Approvals"
            render={props => <ResignationApproval {...props} />}
          />
          <Route
            path="/staffrequisition/approvals"
            exact
            name="Staff Requisition Approvals"
            render={props => <StaffRequisitionApproval {...props} />}
          />
          <Route
            path="/changeprofession/approvals"
            exact
            name="Change Profession Approvals"
            render={props => <ChangeProfessionApproval {...props} />}
          />
          <Route
            path="/incrementrequest/approvals"
            exact
            name="Increment Request Approvals"
            render={props => <IncrementRequestApproval {...props} />}
          />
          <Route
            path="/admin/employees"
            exact
            name="Employees"
            render={props => <Employees {...props} />}
          />
          {/* <Route 
            path="*"
            name="404"
            render={props => <h1>404</h1>}
          /> */}
          </ContextProvider>
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;