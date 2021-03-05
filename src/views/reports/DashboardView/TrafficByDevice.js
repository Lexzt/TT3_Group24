import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import * as CONST from '../../../utils/constants';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [transactions, setTransactions] = useState([]);

  const rngColors = [
    colors.amber[600],
    colors.blue[600],
    colors.blueGrey[600],
    colors.brown[600],
    colors.common[600],
    colors.cyan[600],
    colors.deepOrange[600],
    colors.deepPurple[600],
    colors.green[600],
    colors.grey[600],
    colors.indigo[600],
    colors.lightBlue[600],
    colors.lightGreen[600],
    colors.lime[600],
    colors.orange[600],
    colors.pink[600],
    colors.purple[600],
    colors.red[600],
    colors.teal[600],
    colors.yellow[600]
  ];
  const getRandomColor = () => {
    const randomNumber = Math.floor(Math.random() * rngColors.length);
    const color = rngColors[randomNumber];
    delete rngColors[randomNumber];
    return color;
  };

  // const data = {
  //   datasets: [
  //     {
  //       data: [63, 63, 63, 63],
  //       backgroundColor: [
  //         colors.amber[600],
  //         colors.amber[600],
  //         colors.amber[600],
  //         colors.amber[600]
  //       ],
  //       borderWidth: 8,
  //       borderColor: colors.common.white,
  //       hoverBorderColor: colors.common.white
  //     }
  //   ],
  //   labels: ['Desktop', 'Tablet', 'Mobile']
  // };

  const [data, setData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: []
  });

  const [devices, setDevices] = useState([
    {
      title: 'Desktop',
      value: 63,
      color: colors.indigo[500]
    },
    {
      title: 'Tablet',
      value: 15,
      color: colors.red[600]
    },
    {
      title: 'Mobile',
      value: 23,
      color: colors.orange[600]
    },
    {
      title: 'Mobile',
      value: 43,
      color: colors.amber[600]
    }
  ]);

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
      const map = new Map();
      result.data.forEach(e => {
        if (!map.has(e.assetPrice)) {
          map.set(e.assetPrice, 1);
        }
        map.set(e.assetPrice, map.get(e.assetPrice) + 1);
      });
      map.forEach((v, k) => {
        data.datasets[0].data.push(v);
        data.datasets[0].backgroundColor.push(getRandomColor());
      });
      setTransactions(result.data);
    };

    fetchData();
  }, []);

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Current Position Exposure" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
