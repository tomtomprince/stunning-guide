import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";

import Layout from "../Layout";

export default function PersonalInfo() {
  const [homeInfo, setHomeInfo] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    setHomeInfo(JSON.parse(localStorage.getItem("home-info")));
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
        <Typography variant="h5" component="h2">
          Confirmation
        </Typography>
        <Typography variant="h5" component="h3">
          Home Info
        </Typography>
        <pre>{JSON.stringify(homeInfo, null, 2)}</pre>
        <Typography variant="h5" component="h3">
          Personal Info
        </Typography>
        <pre>{JSON.stringify(personalInfo, null, 2)}</pre>
      </Paper>
    </Layout>
  );
}
