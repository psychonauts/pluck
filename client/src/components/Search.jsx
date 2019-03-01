import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { Redirect } from 'react-router-dom';

const searchClient = algoliasearch(
  'S218GIN4YW',
  '349f0eeaa887cc4df720ebbd1b4dc29a',
);

const Hits = ({ hits }) => (
  <List>
    {hits.map(hit => <ListItem className="search-results"><ListItemText inset primary={hit.tag} /></ListItem>)}
  </List>
);

const CustomHits = connectHits(Hits);

const Search = ({ searchByTag, view }) => {
  if (view !== '/') {
    return <Redirect to={view} />;
  }
  return (
    <InstantSearch
      className="search-nav"
      searchClient={searchClient}
      indexName="tags"
      refresh
    >
      <SearchBox
        onSubmit={(event) => {
          event.preventDefault();
          searchByTag(event.currentTarget[0].value);
        }}
      />
      <CustomHits />
    </InstantSearch>
  );
};

export default Search;
