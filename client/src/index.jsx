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
import SampleData from '../src/components/SampleData';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      data: SampleData,
    };

    // bind to this all functions being handed down
    this.zipCodeSubmit = this.zipCodeSubmit.bind(this);
  }

  componentDidMount() {
    this.forceUpdate(); // rerenders page when components state or props change
  }

  // function gets called when submit button is clicked in zipcode view
  zipCodeSubmit(zipcode) {
    console.log(zipcode.zipcode);

    axios.get(`/user/zipcode?zipcode=${zipcode.zipcode}`)
      .then((res) => {
        console.log(res.data); 
        this.setState({
          data: res.data,
        });
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
              {/* <Route path="/" component={ZipCode} exact /> */}
              <Route path="/" render={() => <ZipCode parentState={this.state} onSubmit={this.zipCodeSubmit} />} exact />
              <Route path="/userProfile" component={UserProfile} />
              {/* <Route path="/plantList" component={PlantList} /> */}
              <Route path="/plantList" render={() => <PlantList parentState={this.state} />} />
              <Route path="/userLogin" component={UserLogin} />
              <Route path="/viewPlantProfile" component={ViewPlantProfile} />
              <Route path="/submitPlant" render={() => <CreatePlantProfile parentState={this.state} />} />
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
