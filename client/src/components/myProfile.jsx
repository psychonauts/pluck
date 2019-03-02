/* eslint-disable react/prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

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

  deletePlant(plant) {
    console.log(this.state.username);
    this.setState(prevState => (prevState.userPlants.length > 1 ? { userPlants: prevState.userPlants.slice(0, prevState.userPlants.indexOf(plant)).concat(prevState.userPlants.slice(prevState.userPlants.indexOf(plant) + 1)) } : { userPlants: [] }));
    axios.delete(`/plant/delete/${plant.id}`).then(() => {
    }).then(() => {
      console.log('HOORAY FOR DELETION');
    }).catch((err) => {
      console.log(err);
    });
  }

  // render username, zip, and user plants dynamically
  render() {
    const { classes } = this.props;
    const { username, zipcode, userPlants } = this.state;
    console.log(userPlants);
    return (
      <div className={classes.root}>
        <Typography
          variant="h5"
          gutterBottom
          // align="center"
        >
          {username.toUpperCase()}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {zipcode}
        </Typography>

        <div className={classes.root}>

          <Typography
            variant="subtitle1"
            gutterBottom
          >
          Your Plants
          </Typography>

          {userPlants.map(plant => (
            <Card className={classes.card}>
              <button type="button" onClick={() => this.deletePlant(plant)}>Delete</button>
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
                  <br />
                  {plant.address}
                  <br />
                  {plant.zipcode}
                </Typography>
              </CardContent>
            </Card>
          ))
          }
        </div>

      </div>
    );
  }
}


export default withStyles(styles)(MyProfile);
