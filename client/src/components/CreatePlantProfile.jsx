import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import API_URL from '../../../config'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class PlantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      description: '',
      image: '',
      // do we need user id?
      // multiline: "Controlled",
    };
    // this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.submitPlant = this.submitPlant.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // function that sets state via onchange
  onChange(event) {
    // console.log(event.target.id);

    // find which field is being used
    if (event.target.id === 'type') {
      // set corresponding state to the value entered into that field
      this.setState({
        type: event.target.value,
      });
    } else if (event.target.id === 'description') {
      this.setState({
        description: event.target.value,
      });
    } else {
      console.log(event.taget.files[0]);
      this.setState({
        image: event.target.files[0],
      });
    }
  }

  // function allows users to upload image
  // fileSelectHandler(event) {
  //   console.log(event.target.files[0]);
  //   const currentImage = event.target.files[0];

  //   this.setState({
  //     image: currentImage,
  //     redirect: false,
  //   });
  // }

  // function upload image to our server
  fileUploadHandler() {
    // creating new form data
    const fd = new FormData();
    // append the image to the form data
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    // create post request to save image in database

    // axios.post('/submitPlant', fd)
    // .then((imageData)=>{
    // console.log(imageData);
    // })
  }

  // function when submit button is pressed
  submitPlant() {
    const { type, description, image } = this.state;
    console.log('submitting new plant');

    // change state to redirect to myProfile
    this.setState({
      redirect: true,
    });

    // send post req to server to save new plant info in plants table
    // save plant info to database
    // add plant to users profile page
    axios.post('/plant/profile', { type, description, image })
      .then((res) => { console.log(res); })
      .catch((err) => { console.log(err); });
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    if (redirect === true) {
      return <Redirect to="/myProfile" />;
    }

    return (
      <div className="zip-body">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="type"
            label="plant type"
            multiline
            rowsMax="4"
            className={classes.textField}
            margin="normal"
            helperText=""
            variant="outlined"
            onChange={this.onChange}

          />
        </form>
        <form className={classes.container} noValidate autoComplete="off">

          <TextField
            id="description"
            label="description"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
          />
        </form>
        <div>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" type="file" className={classes.button}>
                    Upload Plant Image
            </Button>
          </label>
        </div>
        <Button variant="contained" className={classes.button} onClick={this.submitPlant}>
                Submit
        </Button>
      </div>
    );
  }
}

// PlantProfile.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(PlantProfile);
