import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

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
            currency: "EUR"
        };
    }
    


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
                        //defaultValue="Default Value"
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
                        //defaultValue="Default Value"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </form>
                <div>
                    <button>Upload Plant Image</button>
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
