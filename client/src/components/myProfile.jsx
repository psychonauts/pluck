import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
    padding: 50,
  },
};

function MyProfile(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        gutterBottom
        // align="center"
      >
        USERNAME
      </Typography>

      <Typography
        variant="subtitle1"
        gutterBottom
        // align="center"
      >
        1234 avenue road city, state zipcode
      </Typography>
    </div>
  );
}


export default withStyles(styles)(MyProfile);
