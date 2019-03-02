import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, connectHits, connectStateResults } from 'react-instantsearch-dom';
import { Redirect } from 'react-router-dom';

const searchClient = algoliasearch(
  'S218GIN4YW',
  '349f0eeaa887cc4df720ebbd1b4dc29a',
);

const Hits = ({ hits, searchByTag }) => (
  <List className="search-hitList">
    {hits.map(hit => <ListItem onClick={() => searchByTag(hit.tag)} className="search-results"><ListItemText inset primary={hit.tag} /></ListItem>)}
  </List>
);

const CustomHits = connectHits(Hits);

const CustomStateResults = connectStateResults(({ searchState, searchByTag }) => {
  return searchState.query ? <CustomHits searchByTag={searchByTag} /> : null;
});

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
      <CustomStateResults searchByTag={searchByTag} />
    </InstantSearch>
  );
};

export default Search;
