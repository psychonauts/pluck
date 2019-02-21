import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import API_URL from '../../../config'

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    } 
});

class PlantProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Cat in the Hat",
            age: "",
            multiline: "Controlled",
            uploading: false
        };
        // this.imageChange = this.imageChange.bind(this);
    }
    
    //function allows users to upload image
    


    render() {
        const { classes } = this.props;

        return (
            <div className="zip-body">
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="plant type"
                        multiline
                        rowsMax="4"
                        defaultValue="Default Value"
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
                        defaultValue="Default Value"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </form>
                <div>
                    <button type="file">Upload Plant Image</button>
                    <input type="file"></input>
                </div>
                <button>Submit</button>
            </div>
        );
    }
}

PlantProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlantProfile);
