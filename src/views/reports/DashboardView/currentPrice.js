import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const currentPrice = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const temp = JSON.stringify({
      accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43'
    });

    const config = {
      method: 'post',
      url:
        'https://849rs099m3.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/view',
      headers: {
        'x-api-key': '7hurCytKCQx5oqxCHwgx7K7jkNtBp4A71JmesZ0e',
        'Content-Type': 'application/json'
      },
      data: temp
    };

    await axios(config).then(response => {
      console.log(JSON.stringify(response.data));
      // setData();
    });
    // console.log(data);
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              CURRENT
            </Typography>
            <Typography color="textPrimary" variant="h3">
              1,600
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

currentPrice.propTypes = {
  className: PropTypes.string
};

export default currentPrice;
