import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import black from '@material-ui/core/colors/grey'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: { main: black[900] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { color: 'white' },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    color: {
        color: 'green'
    }
};

class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
    }

    handleToggle(){
        this.setState(state => ({ open: !state.open }));
    };

    handleClose(event){
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" >
                                <MenuIcon />
                            </IconButton>
                            <img className="logo" src={require('./pluck.png')}></img>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                p l u c k
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}

// function ButtonAppBar(props) {
//   const { classes } = props;

//   return (
//     <div className={classes.root}>
//           <MuiThemeProvider theme={theme}>
//           <AppBar position="static" >
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" >
//             <MenuIcon />
//           </IconButton>
//             <img className="logo" src={require('./pluck.png')}></img>
//             <Typography variant="h6" color="inherit" className={classes.grow}>
//             pluck
//           </Typography>
//             <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//           </MuiThemeProvider>
//     </div>
//   );
// }



ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
