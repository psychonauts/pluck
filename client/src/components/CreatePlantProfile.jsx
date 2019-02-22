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
            selectedFile: null
        };
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
    }
    
    //function allows users to upload image
    fileSelectHandler(event){
        console.log(event.target.files[0])
        let currentImage = event.target.files[0];
        this.setState({
            selectedFile: currentImage
        })
    }

    //function upload image to our server
    fileUploadHandler(){
        //creating new form data
        const fd = new FormData();
        //append the image to the form data
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        //create post request to save image in database

        // axios.post('/submitPlant', fd)
        //     .then((imageData)=>{
        //         console.log(imageData);
        // })
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
                    <label>Upload Plant Image Here:</label>
                    <input type="file" name="file1" onChange={this.fileSelectHandler}></input>
                </div>
                <button className="submit-plant">Submit</button>
            </div>
        );
    }
}

PlantProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlantProfile);
