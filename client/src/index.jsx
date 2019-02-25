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
import SampleData from "./components/SampleData";
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plants: SampleData,
      username: '',
      zipcode: '',
      userId: '',
      userPlants: [],
    };

    // bind to this all functions being handed down
    this.zipCodeSubmit = this.zipCodeSubmit.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  componentDidMount() {
    this.forceUpdate(); // rerenders page when components state or props change
  }

  // function gets called when submit button is clicked in zipcode view
  zipCodeSubmit(userZip) {
    console.log(userZip.zipcode);

    // get req to server
    axios.get(`/user/zipcode?zipcode=${userZip.zipcode}`)
    // server will grab plants in this zipcode from db and send back
      .then((res) => {
        console.log(res.data);
        // data state in index component will be updated to those plants
        this.setState({
          plants: res.data,
        });
      })
      .catch((err) => { console.log(err); });
  }

  // called in UserProfile when a user signs up
  submitUserInfo(userInfo) {
    console.log(userInfo.username);

    // get all user info from userProfile view
    // send post req to server to add new user to db
    const {
 username, password, address, zipcode,
} = userInfo;
    axios.post('/user/info', {
 username, password, address, zipcode,
})
      .then((res) => {
        console.log(res.data, 'RES DATA');
        // get all plants in new users zipcode
        this.zipCodeSubmit({ zipcode });
      })
      .catch((err) => { console.log(err); });
  }

  // called in UserLogin to allow user to log in
  userLogin(userInfo) {
    console.log(userInfo, 'USER INFO');
    this.setState({
      username: userInfo.username,
    });

    axios.get(`/user/login?username=${userInfo.username}&password=${userInfo.password}`)
      .then((res) => {
        console.log(res, 'RES');
        this.setState({
          loggedIn: true,
          userId: res.data.userId,
          zipcode: res.data.zipcode,
        });

        // get all plants in new users zipcode
        this.zipCodeSubmit({ zipcode: this.state.zipcode });
      })
      .catch((err) => { console.log(err); });
  }


  render() {
    return (

      <div>
        <BrowserRouter>
          <div>

            <NavBar logUser={this.userLoginLogut} signUser={this.userSignUp} />
            <Switch>
              <Route path="/" render={() => <ZipCode onSubmit={this.zipCodeSubmit} />} exact />
              <Route path="/userProfile" render={() => <UserProfile plants={this.state.plants} onSubmit={this.submitUserInfo} />} />
              <Route path="/plantList" render={() => <PlantList plants={this.state.plants} />} />
              <Route path="/userLogin" render={() => <UserLogin plants={this.state.plants} zipcode={this.state.zipcode} onSubmit={this.userLogin} />} />
              <Route path="/viewPlantProfile" component={ViewPlantProfile} />
              <Route path="/submitPlant" render={() => <CreatePlantProfile parentState={this.state} />} />
              <Route path="/myProfile" render={() => <MyProfile zipcode={this.state.zipcode} plants={this.state.userPlants} username={this.state.username} />} />
              <Route path="/plantLocation" component={MapView} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
