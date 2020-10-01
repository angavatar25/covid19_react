import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CovidHome from './Home';

class App extends React.Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/" component={CovidHome}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
