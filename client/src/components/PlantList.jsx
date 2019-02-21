import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import SampleData from './SampleData.js';
import { Route, Redirect } from 'react-router-dom'; 
//require axios

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


class PlantList extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          zipcode: '',
          redirect: false,
      };
      //bind functions to this
      this.reroute=this.reroute.bind(this);
  }

  reroute () {
    console.log('reroute button clicked');
  this.setState({ 
    redirect: true,
  });
}; 

  render() {
    const { classes } = this.props;

    if(this.state.redirect === true) {
        return <Redirect to='/viewPlantProfile'/>;
    }

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {SampleData.map(plant => (
          <GridListTile key={plant.image}>
            <img src={plant.image} alt={plant.plant} />
            <GridListTileBar
              title={plant.plant}
              subtitle={<span>by: {plant.distance}</span>}
              actionIcon={
                <IconButton className={classes.icon} onClick={this.reroute}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
}

PlantList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlantList);
