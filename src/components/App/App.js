import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Importing every component
import AboutUs from '../About_Us/AboutUs';
import AreaInformation from '../Area_Information/AreaInformation';
import ContactUs from '../Contact_Us/ContactUs';
import FundingAndUniversities from '../Funding_And_Universities/FundingAndUniversities';
import JobInformation from '../Job_Information/JobInformation';
import Error404 from '../Error404/Error404';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function App() {
  return (
    <>
      <Navbar/>
        <Router>
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
        </Router>
    <Footer/>
  </>
  );
}

