import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import Forms from './pages/Forms';
import Leaves from './pages/Leaves';

const Login = React.lazy(()=>import('./pages/Login'));
const HomePage = React.lazy(()=>import('./pages/HomePage'))

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
            path="/forms"
            exact
            name="Forms"
            render={props => <Forms {...props}/>}
          />
          <Route 
            path="/leaves"
            exact
            name="Forms"
            render={props => <Leaves {...props}/>}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;