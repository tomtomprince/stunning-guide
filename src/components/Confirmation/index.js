import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "../Layout";
import { getHomeById } from "../../api";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  control: {
    margin: theme.spacing(1, 0),
    width: "100%"
  }
}));

export default function PersonalInfo() {
  const [homeInfo, setHomeInfo] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [homeDetails, setHomeDetails] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const homeInfo = JSON.parse(localStorage.getItem("home-info"));
    getHomeById(homeInfo.home_id).then(setHomeDetails);
    setHomeInfo(homeInfo);
    setPersonalInfo(JSON.parse(localStorage.getItem("personal-info")));
  }, []);

  if (!homeInfo || !personalInfo) {
    return (
      <Layout>
        <div>Must complete other steps first.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Paper>
        <div className={`${classes.root} vertical-rhythm`}>
        <Typography variant="h3" component="h2">
          Confirmation
        </Typography>
        <Typography variant="h4" component="h3">
          Home Info
        </Typography>
        <Typography component="p">
          Building: {homeDetails && homeDetails.apartment_name}
        </Typography>
        <Typography component="p">
          Apartment: {homeInfo.roomSelection}
        </Typography>
        <Typography component="p">
          Number of tenants: {homeInfo.numPersons}
        </Typography>
        <Typography component="p">
          Move-in Date: {homeInfo.moveInDate}
        </Typography>
        <Typography component="p">
          Term Length: {homeInfo.termLength} month{homeInfo.termLength > 1 ? 's' : null }
        </Typography>
        
        <Typography variant="h4" component="h3">
          Personal Info
        </Typography>
        <Typography component="p">
          First Name: {personalInfo.firstName}
        </Typography>
        <Typography component="p">
          Last Name: {personalInfo.lastName}
        </Typography>
        <Typography component="p">
          Email: {personalInfo.email}
        </Typography>
        <Typography component="p">
          Phone: {personalInfo.phone}
        </Typography>
        </div>
      </Paper>
    </Layout>
  );
}
