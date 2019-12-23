import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button, FormControl, TextField } from "@material-ui/core";
import useForm from "react-hook-form";
import { useHistory } from "react-router-dom";

import Layout from "../Layout";
import PersonalInfoSchema from "./PersonalInfoSchema";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  control: {
    margin: theme.spacing(1, 0),
    width: "100%"
  }
}));

const formHookOptions = {
  validationSchema: PersonalInfoSchema
};

export default function PersonalInfo() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [homeInfo, setHomeInfo ] = useState(null);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(formHookOptions);
  const errorList = Object.keys(errors);

  useEffect(() => {
    setHomeInfo(JSON.parse(localStorage.getItem('home-info')));
  }, []);

  function onSubmit(data) {
    localStorage.setItem('personal-info', JSON.stringify(data));
    history.push('confirmation');
  }

  if(!homeInfo) {
    return (
      <Layout>
        <div>Must enter home info first.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Paper className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
              <Typography variant="h5" component="h3">
                Please enter Personal Info
              </Typography>
              <FormControl className={classes.control}>
                <TextField id="first-name" name="firstName" value={firstName} label="First Name" onChange={(e) => setFirstName(e.target.value)} innerRef={register}/>
              </FormControl>
              <FormControl className={classes.control}>
                <TextField id="last-name" name="lastName" value={lastName} label="Last Name" onChange={(e) => setLastName(e.target.value)} innerRef={register}/>
              </FormControl>
              <FormControl className={classes.control}>
                <TextField id="email" name="email" type="email" value={email} label="Email" onChange={(e) => setEmail(e.target.value)} innerRef={register}/>
              </FormControl>
              <FormControl className={classes.control}>
                <TextField id="phone" name="phone" type="phone" value={phone} label="phone" onChange={(e) => setPhone(e.target.value)} innerRef={register}/>
              </FormControl>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={errorList.length > 0}
                >
                  Continue
                </Button>
              </div>
            </form>
            <div style={{ color: "red" }}>
              <pre>
                {errorList.length > 0 && (
                  <label>Errors: {JSON.stringify(errors, null, 2)}</label>
                )}
              </pre>
            </div>
          </Paper>
    </Layout>
  );
}
