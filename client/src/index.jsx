import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Nav.jsx';
import UserProfile from './components/UserProfile.jsx';
import ZipCode from './components/Zip-code.jsx'
import './index.css'
import PlantList from './components/PlantList.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);

    // bind to this all functions being handed down
    }

    componentDidMount() {
        this.forceUpdate(); //rerenders page when components state or props change
    }

    //function redirects to login page
    userLoginLogut(event){
        console.log(event.target.innerHTML);
    }

    //function redirects to sign up page
    userSignUp(event) {
        console.log(event.target.innerHTML);
    }

    render() {
        return (

                    <div>
                        <BrowserRouter>
                        <div>

                        <NavBar logUser={this.userLoginLogut.bind(this)} signUser={this.userSignUp.bind(this)}/>
                        {/* <img className="logo-body" src={require('./PLUCK-logo-02.png')} /> */}
                            <Switch>
                                <Route path="/" component={ZipCode} exact />
                                <Route path="/userProfile" component={UserProfile} />
                                <Route path="/plantList" component={PlantList} />
                                <Route component={Error} />
                            </Switch>
                        </div>
                        </BrowserRouter>
                    </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));