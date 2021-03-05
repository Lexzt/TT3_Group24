import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const [loginDetails, setLoginDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const temp = JSON.stringify({
        username: 'Group24',
        password: 'U1KAc0ZrKyMIzNX'
      });

      const config = {
        method: 'post',
        url: 'https://849rs099m3.execute-api.ap-southeast-1.amazonaws.com/techtrek/login',
        headers: {
          'x-api-key': '7hurCytKCQx5oqxCHwgx7K7jkNtBp4A71JmesZ0e',
          'Content-Type': 'application/json'
        },
        data: temp
      };

      const result = await axios(config);
      console.log(result);
      setLoginDetails(result.data);
    };

    fetchData();
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              First Name
              <TextField
                fullWidth
                helperText="Please specify the first name"
                name="firstName"
                required
                value={loginDetails.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              Last Name
              <TextField
                fullWidth
                name="lastName"
                required
                value={loginDetails.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              NRIC
              <TextField
                fullWidth
                name="nric"
                required
                value={loginDetails.nric}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              Email Address
              <TextField
                fullWidth
                name="email"
                required
                value={loginDetails.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              Home Address
              <TextField
                fullWidth
                name="address"
                required
                value={loginDetails.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              Phone Number
              <TextField
                fullWidth
                name="phone"
                value={loginDetails.phoneNumber}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
