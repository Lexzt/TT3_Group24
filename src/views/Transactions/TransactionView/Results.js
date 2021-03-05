import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, transactions, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Order Type</TableCell>
                <TableCell>Asset Symbol</TableCell>
                <TableCell>Asset Price</TableCell>
                <TableCell>Cash Amount</TableCell>
                <TableCell>Asset Amount</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * limit, page * limit + limit)
                .map(transaction => (
                  <TableRow
                    hover
                    key={transaction.transactionId}
                    selected={
                      transactions.indexOf(transaction.transactionId) !== -1
                    }
                  >
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {transaction.transactionId}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box alignItems="center" display="flex">
                        {transaction.orderType}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {transaction.assetSymbol}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {transaction.assetPrice}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {transaction.cashAmount}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {transaction.assetAmount}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {moment
                          .unix(transaction.timestamp)
                          // .format('dddd, MMMM Do, YYYY h:mm:ss A')}
                          .format('dddd, MMMM Do, YYYY h:mm:ss A')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={transactions.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  transactions: PropTypes.array.isRequired
};

export default Results;
