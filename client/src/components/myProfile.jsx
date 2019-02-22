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

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'myUsername',
      address: '1234 avenue drive, city, state zip',
    };
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant="h5"
          gutterBottom
          // align="center"
        >
          {this.state.username.toUpperCase()}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {this.state.address}
        </Typography>
      </div>
    );
  }
}


export default withStyles(styles)(MyProfile);
