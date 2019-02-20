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
        };
        //bind functions to this
        this.onChange = this.onChange.bind(this);
    }

    //function to allow user to type in input field
    onChange(event) {
        //console.log('hey');
        this.setState({ zipcode: event.target.value });
    };

    render() {
        const { classes, enterZipCode } = this.props;

        return (
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
                        onKeyPress={ enterZipCode }
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>

            </div>
        );
    }
}

    ComposedTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
