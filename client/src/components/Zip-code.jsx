import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
  constructor(props) {
    super(props);
    // bind functions to this
    this.enterZipCode = this.enterZipCode.bind(this);
  }

  // when submit button is pressed, onsubmit is called from index.jsx
  //    get req to server to get all plants in that areacode from db
  enterZipCode() {
    const { zipcode } = this.props;
    this.props.onSubmit({ zipcode });

  }

  render() {
    const { classes, view } = this.props;

    if (view !== '/plantList') {
      return <Redirect to={view} />;
    }

    return (
      <div>
        <img className="logo-body" src={require('../PLUCK-logo-02.png')} />
        <div className="zip-body">
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel
              ref={(ref) => {
                this.labelRef = ReactDOM.findDOMNode(ref);
              }}
              htmlFor="component-outlined"
            >
                Zip-code
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              onChange={this.props.onChange}
              value={this.props.zipcode}
              // onKeyPress={this.enterZipCode}
              labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
            />
          </FormControl>
          <div id="submitButtonDiv">
            <Button variant="contained" onClick={this.enterZipCode} className={classes.button} id="submitButton">
                Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

//     ComposedTextField.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ComposedTextField);
