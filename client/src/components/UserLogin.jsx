import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Redirect } from 'react-router-dom'; 
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '', // is this how we should handle this?
      redirect: false,
      loggedIn: false,
      userId: '',
    };

    // bind functions to this
    this.onChange = this.onChange.bind(this);
    this.submitUserInfo = this.submitUserInfo.bind(this);
  }

  // function that sets state via onchange
  onChange(event) {
    // console.log(event.target.id);

    // find which field is being used
    if (event.target.id === 'username') {
      // set corresponding state to the value entered into that field
      this.setState({
        username: event.target.value,
      });
    } else {
      this.setState({
        password: event.target.value,
      });
    }
  }

  // function that sends get req to server to retrieve user info
  submitUserInfo() {
    const { username, password } = this.state;
    console.log('user info submitted');

    axios.get(`/user/login?username=${username}&password=${password}`)
      .then((res) => {
        console.log(res);
        this.setState({
          loggedIn: true,
          userId: res.userId, // something like this
        });
      })
      .catch((err) => { console.log(err); });

    // brought to list view
    // set state of redirect to true
    this.setState({
      redirect: true,
    });
  }


  render() {
    const { classes } = this.props;

    if (this.state.redirect === true && this.state.loggedIn === true) {
      return <Redirect to="/plantList" />;
    }

    return (
      <div className="zip-body">

        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            ref={(ref) => {
              this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            htmlFor="username"
          > Username
          </InputLabel>

          <OutlinedInput
            id="username"
            onChange={this.onChange} // function that sets state of username
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
        </FormControl>

        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            ref={(ref) => {
              this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            htmlFor="password"
          > Password
          </InputLabel>
                
          <OutlinedInput
            id="password"
            onChange={this.onChange} // function that sets state of password
            // onKeyPress={this.submitUserInfo} // function that sends post req to server w user info
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
        </FormControl>
        <div>
          <Button variant="contained" onClick={this.submitUserInfo} className={classes.button}>
                Submit
          </Button>
        </div>
      </div>
    );
  }
}

// UserLogin.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(UserLogin);
