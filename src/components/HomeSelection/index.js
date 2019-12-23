import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button, NativeSelect, FormControl, InputLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import useForm from "react-hook-form";
import { find } from "lodash";
import { useHistory } from "react-router-dom";

import Layout from "../Layout";
import HomeSelectionSchema from "./HomeSelectionSchema";
import { fetchHousingOptions } from "../../api";

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
  validationSchema: HomeSelectionSchema
};

export default function HomeSelection() {
  const history = useHistory();
  const [housingOptions, setHousingOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [homeId, setHomeId] = useState("");
  const [room, setRoom] = useState("");
  const [numPersons, setNumPersons] = useState(1);
  const [moveInDate, setMoveInDate] = useState(new Date());
  const [termLength, setTermLength] = useState(1);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(formHookOptions);
  const errorList = Object.keys(errors);

  useEffect(() => {
    fetchHousingOptions().then(setHousingOptions);
  }, []);

  function onHousingOptionChange(e) {
    const newHomeId = e.target.value;
    if (!newHomeId) {
      return;
    }
    setHomeId(newHomeId);
    const newHome = find(housingOptions, { home_id: parseInt(newHomeId, 10) });
    const newRoomOptions = newHome && newHome.available_rooms;

    setRoomOptions(newRoomOptions);
    setRoom(newRoomOptions[0]);
  }

  function onSubmit(data) {
    localStorage.setItem('home-info', JSON.stringify(data));
    history.push('personal-info');
  }

  return (
    <Layout>
      <Paper className={classes.root}>
        {housingOptions.length > 0 ? (
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
              <Typography variant="h5" component="h3">
                Please enter housing selections
              </Typography>
              <FormControl className={classes.control}>
                <InputLabel id="home-label">Home</InputLabel>
                <NativeSelect
                  value={homeId}
                  onChange={onHousingOptionChange}
                  labelid="home-label"
                  inputProps={{
                    name: "houseSelection",
                    id: "house-selection"
                  }}
                  inputRef={register}
                  disabled={housingOptions && housingOptions.length < 1}
                  className="full-width"
                >
                  <option value="" />
                  {housingOptions &&
                    housingOptions.map(home => (
                      <option value={home.home_id} key={home.home_id}>
                        {home.apartment_name}
                      </option>
                    ))}
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.control}>
              <InputLabel id="room-label">Room</InputLabel>
                <NativeSelect
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                  labelid="room-label"
                  inputProps={{
                    name: "roomSelection",
                    id: "room-selection"
                  }}
                  inputRef={register}
                  disabled={roomOptions && roomOptions.length < 1}
                  className="full-width"
                >
                  <option value="" />
                  {roomOptions &&
                    roomOptions.map(room => (
                      <option value={room} key={room}>
                        {room}
                      </option>
                    ))}
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.control}>
              <InputLabel id="num-persons-label">Number of Persons</InputLabel>
                <NativeSelect
                  value={numPersons}
                  label="Number of Persons"
                  labelid="num-persons-label"
                  onChange={e => setNumPersons(e.target.value)}
                  inputProps={{
                    name: "numPersons",
                    id: "num-persons-selection"
                  }}
                  inputRef={register}
                  className="full-width"
                >
                  <option value="1" defaultValue>
                    1
                  </option>
                  <option value="2">2</option>
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.control}>
                <MuiPickersUtilsProvider utils={MomentUtils} className="full-width">
                  <KeyboardDatePicker
                    margin="normal"
                    id="move-in-date"
                    label="Move-in date"
                    name="moveInDate"
                    value={moveInDate}
                    onChange={setMoveInDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    inputRef={register}
                    className="full-width"
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <FormControl className={classes.control}>
              <InputLabel id="term-length-label">Term Length</InputLabel>
                <NativeSelect
                  value={termLength}
                  onChange={e => setTermLength(e.target.value)}
                  labelid="term-length-label"
                  inputProps={{
                    name: "termLength",
                    id: "term-length-selection"
                  }}
                  inputRef={register}
                >
                  <option value="1" defaultValue>
                    1 month
                  </option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </NativeSelect>
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
          </div>
        ) : (
          "Loading..."
        )}
      </Paper>
    </Layout>
  );
}
