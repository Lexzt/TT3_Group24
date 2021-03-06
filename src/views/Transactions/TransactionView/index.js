import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

import * as CONST from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TransactionListView = () => {
  const classes = useStyles();

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const temp = JSON.stringify({
        accountKey: 'd075764b-c0de-4c6d-9794-f2de8389fa43'
      });

      const config = {
        method: 'post',
        url: `${CONST.BASE_URL}${CONST.TRANSACTIONS_VIEW}`,
        headers: {
          'x-api-key': `${CONST.X_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: temp
      };

      const result = await axios(config);
      // console.log(
      //   result.data
      //     .sort((a, b) => b.timestamp - a.timestamp)
      //     .map(e => [e.assetPrice, e.timestamp])
      //     .map(e => [e[0], moment.unix(e[1]).toDate()])
      // );
      setTransactions(result.data.sort((a, b) => b.timestamp - a.timestamp));
    };

    fetchData();
  }, []);

  return (
    <Page className={classes.root} title="Transactions">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results transactions={transactions} />
        </Box>
      </Container>
    </Page>
  );
};

export default TransactionListView;
