/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PlantList from './PlantList.jsx';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
    padding: 50,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const MyFavorites = ({ plants, userId, view, focusTag, zipcode }) => {
  // if (view !== '/myFavorites') {
  //   return <Redirect to={view} />;
  // }
  return (
    <PlantList userId={userId} plants={plants} view={view} zipcode={zipcode} focusTag={focusTag} />
  );
};

export default withStyles(styles)(MyFavorites);
