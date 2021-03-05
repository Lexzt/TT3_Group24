import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';

import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import axios from 'axios';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();

  const [currentPrice, setCurrentPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const temp = JSON.stringify({
        accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43'
      });

      const config = {
        method: 'post',
        url:
          'https://849rs099m3.execute-api.ap-southeast-1.amazonaws.com/techtrek/pricing/current',
        headers: {
          'x-api-key': '7hurCytKCQx5oqxCHwgx7K7jkNtBp4A71JmesZ0e',
          'Content-Type': 'application/json'
        },
        data: temp
      };

      const result = await axios(config);
      setCurrentPrice(result.data);
    };
    fetchData();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              CURRENT PRICE
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {`${currentPrice.assetSymbol} ${currentPrice.price}`}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              {moment
                .unix(currentPrice.timestamp)
                .format('dddd, MMMM Do, YYYY h:mm A')}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
