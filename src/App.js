import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import "./App.css";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import HomeSelection from "./components/HomeSelection";
import PersonalInfo from "./components/PersonalInfo";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <GlobalErrorBoundary>
        <Router>
          <Switch>
            <Route exact path="/confirmation" component={Confirmation} />
            <Route exact path="/personal-info" component={PersonalInfo} />
            <Route exact path="/" component={HomeSelection} />
          </Switch>
        </Router>
      </GlobalErrorBoundary>
    </div>
  );
}

export default App;
