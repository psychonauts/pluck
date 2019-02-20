import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
//import axios

const styles = theme => ({
  container: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexWrap: 'wrap',
  },
  formControl: {
      margin: theme.spacing.unit,
  },
});

class UserProfile extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '', //is this how we should handle this?
        address: '',
    };

    //bind functions to this
    this.onChange = this.onChange.bind(this);
  }

  //function that sets state via onchange
  onChange(event) {
    console.log(event.target.id);
    //find which field is being used
    if(event.target.id === 'username') {
      //set corresponding state to the value entered into that field
      this.setState({ 
        username: event.target.value
    });
    } else if(event.target.innerHTML === 'address') {
      this.setState({ 
        address: event.target.value
    });
    } else{
      this.setState({ 
        password: event.target.value
    });
    }

  }

  //function that sends post req to server when enter is pressed

  submitUserInfo(event) {
    let code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode
        console.log('user info submitted');
        //axios.post
            //endpoint = /user/info ?
            //.then handle res
            //.catch any errors
        
        //brought to list view
  }
  }

  render() {
    const { classes } = this.props;

    return (
        <div className="zip-body">
            <FormControl className={classes.formControl} variant="outlined">

            <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor="address"
                >
                    Address
                </InputLabel>
                <OutlinedInput
                    id="address"
                    onChange={this.onChange} // function that sets state of address
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                />

                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor="username"
                >
                    {/* Username */}
                </InputLabel>
                <OutlinedInput
                    id="username"
                    onChange={this.onChange} // function that sets state of username
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                />

                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor="password"
                >
                    {/* Password */}
                </InputLabel>
                <OutlinedInput
                    id="password"
                    onChange={this.onChange} // function that sets state of password
                    onKeyPress={ this.submitUserInfo } // function that sends post req to server w user info
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                />

            </FormControl>

        </div>
    );
}


}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);