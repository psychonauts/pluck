import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Nav.jsx';
import ZipCode from './components/Zip-code.jsx'
import './index.css'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                zipcode: ''
            }
    // bind to this all functions being handed down
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({ zipcode: event.target.value });
    };

    render() {
        const { zipcode } = this.state; 
        const { handleChange } = this.props;
        return (
            <div>
                    <div>
                        <NavBar />
                        <img className="logo-body" src={require('./PLUCK-logo-02.png')} />
                        <ZipCode 
                            zipcode={ zipcode }
                            handleChange={ handleChange }/>
                    </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));