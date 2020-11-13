import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AboutUs from '../About_Us/AboutUs'
import AreaInformation from '../Area_Information/AreaInformation'
import ContactUs from '../Contact_Us/ContactUs'
import FundingAndUniversities from '../Funding_And_Universities/FundingAndUniversities'
import JobInformation from '../Job_Information/JobInformation'
import Error404 from '../Error404/Error404'
export default function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Job Information</Link>
          </li>
          <li>
            <Link to="/areainformation">Area Information</Link>
          </li>
          <li>
            <Link to="/fundinganduniversities">Funding And Universities</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <JobInformation/>
        </Route>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/fundinganduniversities">
          <FundingAndUniversities />
        </Route>
        <Route path="/areainformation">
          <AreaInformation />
        </Route>
        <Route path="/contactus">
          <ContactUs />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

