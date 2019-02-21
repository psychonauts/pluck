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
import { NavLink } from 'react-router-dom'; 

const drawerWidth = 240;

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
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
};



class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }; 
    }

    handleDrawerOpen(){
        this.setState({ open: true });
    };

    handleDrawerClose(){
        this.setState({ open: false });
    };

    render() {
        const { classes, signUser, logUser } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="Menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <NavLink to="/"> <img className="logo" src={require('./pluck.png')}></img></NavLink>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                p l u c k
                            </Typography>

                            <NavLink to="/userProfile" style={{color: 'white', textDecoration: 'none'}}> <Button color="inherit" onClick={signUser}>Signup</Button> </NavLink>
                            <NavLink to="/userLogin" style={{color: 'white', textDecoration: 'none'}}><Button color="inherit" onClick={logUser}>Login / Logout</Button> </NavLink>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}



ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
