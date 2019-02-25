import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import SampleData from './SampleData.js';

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

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      zipcode: props.zipcode,
      userPlants: props.plants,
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
          {this.state.zipcode}
        </Typography>

        <div className={classes.root}>
          {this.state.userPlants.map((plant) => {
            return (
              <Card className={classes.card}>
                <CardHeader
                  title={plant.title}
                />
                <CardMedia
                  className={classes.media}
                  image={plant.image_url}
                  title={plant.title}
                />
                <CardContent>
                  <Typography component="p">
                    {plant.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
          }
        </div>

      </div>
    );
  }
}


export default withStyles(styles)(MyProfile);
