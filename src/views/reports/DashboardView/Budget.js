import React, { useEffect, useState } from 'react';
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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import axios from 'axios';
import * as CONST from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
  const classes = useStyles();

  const [cashBalance, setCashBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const temp = JSON.stringify({
        accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43'
      });

      const config = {
        method: 'post',
        url: `${CONST.BASE_URL}${CONST.BALANCE}`,
        headers: {
          'x-api-key': `${CONST.X_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: temp
      };

      const result = await axios(config);
      setCashBalance(result.data.assetBalance); // Might wanna round to 2dp after that
    };

    fetchData();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Cash Balance
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {cashBalance}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
