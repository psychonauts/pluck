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

// for drop down
const currencies = [
  {
    value: 'Strawberries',
    label: 'Strawberries',
  },
  {
    value: 'Oranges',
    label: 'Oranges',
  },
  {
    value: 'Figs',
    label: 'Figs',
  },
  {
    value: 'Tomatoes',
    label: 'Tomatoes',
  },
  {
    value: 'Squash',
    label: 'Squash',
  },
  {
    value: 'Rosemary',
    label: 'Rosemary',
  },
  {
    value: 'Snap Peas',
    label: 'Snap Peas',
  },
  {
    value: 'Apples',
    label: 'Apples',
  },
  {
    value: 'Basil',
    label: 'Basil',
  },
  {
    value: 'Peaches',
    label: 'Peaches',
  },
];

class PlantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // type: '',
      description: '',
      image: '',
      loggedIn: false,
      currency: 'Select',
      username: props.username,
      address: '',
      zipcode: '',
      tags: '',
    };
    this.getPlantType = this.getPlantType.bind(this);
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

  // get req to server to grab correct image based on selected type
  getPlantType() {
    axios.get(`/plant/category?category=${this.state.currency}`) // currency is plant type
      .then((res) => {
        console.log(res);
        const plantImage = res.data[0];
        this.setState({ image: plantImage }); // this is not working yet
      });
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


  ////////////////// THESE FUNCTIONS ARE USED TO ENABLE USER IMAGE UPLOAD ////////////////
  ///// which does not currently work /////////////
  //// another option would be to grab plant images from a plant api /////////////

  // function allows users to upload image
  fileSelectHandler(event) {
    const currentImage = event.target.files[0];

    this.setState({
      image: currentImage,
    });
  }

  // function upload image to our server
  // fileUploadHandler() {
  //   const fd = new FormData();
  //   fd.append('image', this.state.image, this.state.image.name);

  //   const fr = new FileReader();
  //   const file = this.state.image;
  //   // fr.readAsBinaryString(file);
  //   // fr.readAsDataURL(file); //base64

  //   const params = {
  //     image: fr.readAsBinaryString(file), // this needs to be binary, base64 data, or a url
  //     // type: 'application/file',
  //     headers: {
  //       Authorization: `Client-ID ${config.clientId} Bearer ${config.imgurKey}`, // this is correct
  //     },
  //   };

  //   // post request to imgur
  //   // goal: upload a user image and get back a url
  //   axios.post('https://api.imgur.com/3/image', params)
  //     .then((res) => {
  //       console.log(res.data.link);

  //       // set state to image url
  //       this.setState({
  //         image: res.data.link,
  //       });
  //     })
  //     .catch((err) => { console.log(err); });
  // }

  ////////////////////////////////////////////////////////////////////////////

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
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')} 
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your Plant Type"
            margin="normal"
            variant="outlined"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
