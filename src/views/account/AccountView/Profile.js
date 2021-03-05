import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';

// import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
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
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src="/static/images/avatars/avatar_6.png"
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {loginDetails.username}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {loginDetails.accountKey}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
