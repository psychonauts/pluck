import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Route, Redirect } from 'react-router-dom';
import ViewPlantProfile from './ViewPlantProfile.jsx';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const PlantList = ({ classes, filterByTag, userId, plants, view }) => {
  if (view !== '/plantList') {
    return <Redirect to={view} />;
  }
  return (
    // Pass down to ViewPlantProfile to render grid
    <div className={classes.root}>
      {plants.map(plant => <ViewPlantProfile userId={userId} plant={plant} />)}
    </div>
  );
};

PlantList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlantList);
