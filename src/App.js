import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

const Login = React.lazy(()=>import('./pages/login'));
const HomePage = React.lazy(()=>import('./pages/HomePage'))
const Employees = React.lazy(()=>import('./pages/Employees/Employees'))
const Users = React.lazy(()=>import('./pages/Users/Users'))
const Leaves = React.lazy(()=>import('./pages/Leaves/Leaves'))
const Approvals = React.lazy(()=>import('./pages/Approvals/Approvals'))

function App() {
  const loading = () => {
    return(
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          Loading...
      </div>
    )
  }
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route 
            path="/login"
            exact
            name="Login"
            render={props => <Login {...props}/>}
          />
          <Route 
            path="/"
            exact
            name="Home"
            render={props => <HomePage {...props}/>}
          />
            <Route 
              path="/admin/users"
              exact
              name="Users"
              render={props => <Users {...props}/>}
            />
          <Route 
            path="/leaves"
            exact
            name="Leaves"
            render={props => <Leaves {...props}/>}
          />
            <Route 
              path="/approvals"
              exact
              name="Approvals"
              render={props => <Approvals {...props}/>}
            />
            <Route 
              path="/admin/employees"
              exact
              name="Employees"
              render={props => <Employees {...props}/>}
            />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;