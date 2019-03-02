/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PlantList from './PlantList';
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

export default myFavorites = withStyles(styles)(({ classes, username, plants, getFavorites, classes, userId, view, focusTag, zipcode }) => {
  if (view !== '/myFavorites') {
    return <Redirect to={view} />
  }
  return (
    <PlantList classes={classes} userId={userId} plants={plants} view={view} zipcode={zipcode} focusTag={focusTag} />
  );
});
