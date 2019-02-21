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
import { Route, Redirect } from 'react-router-dom'; 
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

class ComposedTextField extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            zipcode: '',
            redirect: false,
        };
        //bind functions to this
        this.onChange = this.onChange.bind(this);
        this.enterZipCode = this.enterZipCode.bind(this);
    }

    //function to allow user to type in input field
    onChange(event) {
        this.setState({ 
            zipcode: event.target.value 
        });
    }; 

    //function to send get request to server when enter pressed
    enterZipCode(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            console.log('enter was pressed');
            // <Route path="/plantList"/>
            // <Redirect to="/plantList"/>
            
            //axios.get
                //endpoint = /user/zipcode ?
                //.then handle res
                //.catch any errors
            
                this.setState({
                    redirect: true,
                })
            
            //brought to list view
    } 
    }

    render() {
        const { classes } = this.props;

        if(this.state.redirect === true) {
            return <Redirect to='/plantList'/>;
        }

        return (
            <div>
            <img className="logo-body" src={require('../PLUCK-logo-02.png')} />
            <div className="zip-body">
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                            this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Zip-code
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        onChange={this.onChange}
                        onKeyPress={ this.enterZipCode }
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>

            </div>
            </div>
        );
    }
}

    ComposedTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
