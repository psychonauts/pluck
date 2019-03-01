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
import axios from 'axios';
import MyDropzone from './components/ImageUploader.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plants: [],
      username: '',
      zipcode: '',
      userId: '',
      userPlants: [],
      view: '/',
    };

    // bind to this all functions being handed down
    this.zipCodeSubmit = this.zipCodeSubmit.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    this.onZipChange = this.onZipChange.bind(this);
    this.searchByTag = this.searchByTag.bind(this);
    this.submitPlant = this.submitPlant.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.forceUpdate(); // rerenders page when components state or props change
  }

  
  onZipChange(event) {
    this.setState({
      zipcode: event.target.value,
    });
  }

  // function when submit button is pressed
  submitPlant(formData) {
    const data = new FormData();
    Object.entries(formData).forEach(([name, val]) => data.append(name, val));
    // data.append('image', selectedFile);

    // change state to redirect to myProfile

    // send post req to server to save new plant info in plants table
    // add plant to users profile page
    // need to send through userId, type, description, address, zipcode, image
    axios.post('/plant/profile', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res);
        this.changeView('/myProfile');
      })
      .catch((err) => { console.log(err); });
  }

  // function gets called when submit button is clicked in zipcode view
  zipCodeSubmit(userZip) {
    // get req to server
    axios.get(`/user/zipcode?zipcode=${userZip.zipcode}`)
    // server will grab plants in this zipcode from db and send back
      .then((res) => {
        console.log(res.data);
        // data state in index component will be updated to those plants
        this.setState({
          plants: res.data,
        }); // method to redirect as second argument
      })
      .catch((err) => { console.log(err); });
  }

  filterByTag(tag) {
    const { zipcode } = this.state;
    axios.get(`/plant/category?zipcode=${zipcode}&tag=${tag}`)
      .then((res) => {
        this.setState({ plants: res.data });
      })
      .catch(err => console.log(err));
  }

  searchByTag(tag) {
    axios.get(`/plant/tag?tag=${tag}`)
      .then((res) => {
        this.setState({ plants: res.data }, () => this.changeView('/plantList'));
      }).catch(err => console.error(err));
  }

  // called in UserProfile when a user signs up/ hits submit button
  submitUserInfo(userInfo) {
    // get all user info from userProfile view
    // deconstruct vals
    const {
      username,
      password,
      address,
      zipcode,
    } = userInfo;
    // send post req to server to add new user to db
    axios.post('/user/info', {
      username,
      password,
      address,
      zipcode,
    })
      .then((res) => {
        console.log(res.data, 'RES DATA');
        // get all plants in new users zipcode
        this.zipCodeSubmit({ zipcode });
      })
      .catch((err) => { console.log(err); });
  }

  // called in UserLogin to allow user to log in when submit is pressed
  userLogin(userInfo) {
    // grab username and add to state
    this.setState({
      username: userInfo.username,
    });
    // get req to server to grab all user info
    axios.get(`/user/login?username=${userInfo.username}&password=${userInfo.password}`)
      .then((res) => {
        // set states with all user info
        this.setState({
          userId: res.data.id,
          zipcode: res.data.zipcode,
          userPlants: res.data.plants,
        });

        // get all plants in new users zipcode
        this.zipCodeSubmit({ zipcode: this.state.zipcode });
      })
      .catch((err) => { console.log(err); });
  }

  changeView(view) {
    this.setState({ view });
  }


  render() {
    const { view } = this.state;
    return (

      <div>
        <BrowserRouter>
          <div>
            <NavBar changeView={this.changeView} logUser={this.userLoginLogut} signUser={this.userSignUp} />
            <Switch>
              <Route path="/" render={() => <Search searchByTag={this.searchByTag} view={view} />} exact />
              <Route path="/userProfile" render={() => <UserProfile plants={this.state.plants} view={view} onSubmit={this.submitUserInfo} />} />
              <Route path="/plantList" render={() => <PlantList plants={this.state.plants} view={view} filterByTag={this.filterByTag} userId={this.state.userId} />} />
              <Route path="/userLogin" render={() => <UserLogin plants={this.state.plants} view={view} zipcode={this.state.zipcode} onSubmit={this.userLogin} />} />
              <Route path="viewPlantProfile" render={() => <ViewPlantProfile userId={this.state.userId} view={view} />} />
              <Route path="/submitPlant" render={() => <CreatePlantProfile userId={this.state.userId} view={view} username={this.state.username} submitPlant={this.submitPlant} />} />
              <Route path="/myProfile" render={() => <MyProfile zipcode={this.state.zipcode} view={view} plants={this.state.userPlants} username={this.state.username} />} />
              <Route path="/plantLocation" view={view} component={MapView} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
