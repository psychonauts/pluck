import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Nav.jsx';
// require('./index.css')

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Item Listt</h1> 
                <NavBar />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));