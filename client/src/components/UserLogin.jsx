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
import { Redirect } from 'react-router-dom'; 
//import axios

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
  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '', //is this how we should handle this?
        address: '',
        redirect: false,
    };

    //bind functions to this
    this.onChange = this.onChange.bind(this);
    this.submitUserInfo = this.submitUserInfo.bind(this);
  }

  //function that sets state via onchange
  onChange(event) {
    //console.log(event.target.id);

    //find which field is being used
    if(event.target.id === 'username') {
      //set corresponding state to the value entered into that field
      this.setState({ 
        username: event.target.value
    });
    } else if(event.target.id === 'address') {
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
        //axios.get
            //endpoint = /user/login ?
            //.then handle res
            //.catch any errors
        
        //brought to list view
          //set state of redirect to true
          this.setState({
            redirect: true,
          })
  }
  }

  render() {
    const { classes } = this.props;

    if(this.state.redirect === true) {
      return <Redirect to='/plantList'/>
    }

    return (
        <div className="zip-body">

            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor="username"
                > Username </InputLabel>

                <OutlinedInput
                    id="username"
                    onChange={this.onChange} // function that sets state of username
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                />
            </FormControl>

            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor="password"
                > Password </InputLabel>
                
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

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserLogin);