import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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
      name: "",
      age: "",
      multiline: "Controlled",
      selectedFile: null,
    };
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.submitPlant = this.submitPlant.bind(this);
  }

  // function allows users to upload image
  fileSelectHandler(event) {
    console.log(event.target.files[0]);
    const currentImage = event.target.files[0];
    this.setState({
      selectedFile: currentImage,
      redirect: false,
    });
  }

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
  // save plant info to database
  // redirect to myprofile page
  // add plant to users profile page
  submitPlant() {
    console.log('submitting new plant');
    this.setState({
      redirect: true,
    });
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
            id="outlined-multiline-flexible"
            label="plant type"
            multiline
            rowsMax="4"
            // defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            helperText=""
            variant="outlined"

          />
        </form>
        <form className={classes.container} noValidate autoComplete="off">

          <TextField
            id="outlined-multiline-static"
            label="description"
            multiline
            rows="4"
            // defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="outlined"
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
