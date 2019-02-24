import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import NavBar from './components/Nav.jsx';
import UserProfile from './components/UserProfile.jsx';
import ZipCode from './components/Zip-code.jsx';
import './index.css';
import PlantList from './components/PlantList.jsx';
import UserLogin from './components/UserLogin.jsx';
import ViewPlantProfile from './components/ViewPlantProfile.jsx';
import CreatePlantProfile from './components/CreatePlantProfile.jsx';
import MyProfile from './components/myProfile.jsx';
import MapView from './components/MapView.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }

    // bind to this all functions being handed down
    this.userLoginLogut = this.userLoginLogut.bind(this);
    this.userSignUp = this.userSignUp.bind(this);
  }

  componentDidMount() {
    this.forceUpdate(); // rerenders page when components state or props change
  }

  // function redirects to login page
  userLoginLogut(event) {
    console.log(event.target.innerHTML);
  }

  // function redirects to sign up page
  userSignUp(event) {
    console.log(event.target.innerHTML);
  }

  render() {
    return (

      <div>
        <BrowserRouter>
          <div>

            <NavBar logUser={this.userLoginLogut} signUser={this.userSignUp}/>
            <Switch>
              <Route path="/" component={ZipCode} exact />
              <Route path="/userProfile" component={UserProfile} />
              <Route path="/plantList" component={PlantList} />
              <Route path="/userLogin" component={UserLogin} />
              <Route path="/viewPlantProfile" component={ViewPlantProfile} />
              <Route path="/submitPlant" component={CreatePlantProfile} />
              {/* { this.state.loggedIn === true &&
                <Route exact path="/submitPlant" component={CreatePlantProfile} />
              } */}
              <Route path="/myProfile" component={MyProfile} />
              <Route path="/plantLocation" component={MapView} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
        {/* <MapView /> */}
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
