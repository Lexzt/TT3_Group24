import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
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
import * as CONST from '../../../utils/constants';

const statesBuySell = [
  {
    value: 'BUY',
    label: 'Buy'
  },
  {
    value: 'SELL',
    label: 'Sell'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    orderType: 'SELL',
    assetAmount: '123.0'
  });
  const navigate = useNavigate();

  const [error, setError] = useState('');
  let hasError = false;

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const sendData = async sendObj => {
    const data = JSON.stringify({
      accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43',
      orderType: sendObj.orderType,
      assetAmount: sendObj.assetAmount
    });

    const config = {
      method: 'post',
      url: `${CONST.BASE_URL}${CONST.TRANSACTIONS_ADD}`,
      headers: {
        'x-api-key': `${CONST.X_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data
    };

    const result = axios(config)
      .then(resp => {
        // console.log('success');
        navigate('/app/transactions-view');
      })
      .catch(resp => {
        hasError = true;
        setError(resp.data.body);
      });
    // if (result.status === 400) {
    //   // something when error

    // } else {
    //   navigate('/app/transactions-view');
    // }
    // console.log(result);
  };

  const onSubmit = event => {
    const isNumeric = check => {
      return /^-?\d+(?:[.,]\d*?)?$/.test(check);
    };

    if (!isNumeric(values.assetAmount)) {
      // do something else, later
      hasError = true;
      return;
    }

    const sendObj = {
      accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43',
      orderType: values.orderType,
      assetAmount: parseFloat(values.assetAmount)
    };
    sendData(sendObj);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        {hasError ? <div>{error}</div> : <div>no error</div>}
        <CardHeader
          subheader="Please input your amount and buy/sell"
          title="Buy Asset"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {/* In the future, do validation of input here */}
              <TextField
                fullWidth
                helperText="Please specify the asset amount"
                label="Asset Amount"
                name="assetAmount"
                onChange={handleChange}
                required
                value={values.assetAmount}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Buy/Sell"
                name="orderType"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.orderType}
                variant="outlined"
              >
                {statesBuySell.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={onSubmit}>
            Buy/Sell
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
