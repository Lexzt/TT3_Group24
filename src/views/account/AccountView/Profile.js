import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  // city: 'Los Angeles',
  // country: 'USA',
  // jobTitle: 'Senior Developer',
  // name: 'Katarina Smith',
  // timezone: 'GTM-7'
  phoneNumber: '(+65) 96291392',
  accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43',
  lastName: 'Skiles',
  username: 'Group24',
  address: '1025 Jennyfer Stream',
  email: 'group24@techtrek.com',
  firstName: 'Ottilie',
  nric: 'S77831711F'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

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
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.username}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.accountKey}
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
