import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
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
      // type: '',
      description: '',
      image: '',
      loggedIn: false,
      title: '',
      username: props.username,
      address: '',
      zipcode: '',
      tags: '',
    };
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setState = this.setState.bind(this);
    this.selectFile = this.selectFile.bind(this);
    // this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }


  // function that sets state via onchange
  // allows us to grab the plant type and description
  onChange(event) {
    // find out if descrip field is being used
    if (event.target.id === 'description') {
      this.setState({
        description: event.target.value,
      });
    }
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value, // this is for the plant type dropdown... it works...
      });
    };
  }

  selectFile(event) {
    this.setState({ image: event.target.files[0] }, () => console.log(this.state.image));
  }

  // function allows users to upload image
  fileSelectHandler(event) {
    const currentImage = event.target.files[0];

    this.setState({
      image: currentImage,
    });
  }

  render() {
    const { classes, submitPlant } = this.props;
    const { redirect } = this.state;

    if (redirect === true) {
      return <Redirect to={{ pathname: '/myProfile' }} />;
    }


    return (
      <div className="zip-body">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="listing title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')} 
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please name your Plant Type"
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="address"
            helperText="Your address here"
            className={classes.textField}
            value={this.state.address}
            onChange={this.handleChange('address')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="zipcode"
            helperText="Your zipcode here"
            className={classes.textField}
            value={this.state.zipcode}
            onChange={this.handleChange('zipcode')}
            margin="normal"
            variant="outlined"
          />
          {/* Should we just provide a field, and split the incoming string into an array of tags? */}
          {/* We allow the user to submit a tag one by one, or an input type box that lets the user enter multiple entries */}

          <TextField
            label="tags"
            helperText="Add some descriptive Tags seperated by commas eg: 'tomatoes, green, ripe'"
            className={classes.textField}
            value={this.state.tags}
            onChange={this.handleChange('tags')}
            margin="normal"
            variant="outlined"
            
          />

          <TextField
            id="description"
            label="description"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          />
          <input type="file" onChange={this.selectFile} />

        </form>
          
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => submitPlant(this.state)}
        >
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
