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
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import ViewPlantProfile from './ViewPlantProfile.jsx';
import { List, ListItem, ListItemText } from '@material-ui/core';

const searchClient = algoliasearch(
  'S218GIN4YW',
  '349f0eeaa887cc4df720ebbd1b4dc29a',
);

const Hits = ({ hits }) => (
  <List>
    {hits.map(hit => <ListItem><ListItemText inset primary={hit.tag} /></ListItem>)}
  </List>
);

const CustomHits = connectHits(Hits);

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

const PlantList = ({ classes, filterByTag, userId, plants }) => (
  // Pass down to ViewPlantProfile to render grid
  <div>
    <InstantSearch
      searchClient={searchClient}
      indexName="tags"

      refresh
    >
      <SearchBox
        defaultRefinement=""
        onSubmit={(event) => {
          event.preventDefault();
          filterByTag(event.currentTarget[0].value);
        }}
      />
      <CustomHits classes={classes} />
    </InstantSearch>
    <div className={classes.root}>
      {plants.map(plant => <ViewPlantProfile userId={userId} plant={plant} />)
    }
    </div>
  </div>
);

PlantList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlantList);
