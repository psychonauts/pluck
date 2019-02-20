import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Nav.jsx';
import ZipCode from './components/Zip-code.jsx'
import './index.css'


class App extends React.Component {
    constructor(props) {
        super(props);

    // bind to this all functions being handed down
    this.enterZipCode = this.enterZipCode.bind(this);
    }

    componentDidMount() {
        this.forceUpdate();
    }

    //function to send get request to server when enter pressed
    enterZipCode(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            console.log('enter was pressed');
    } 
    }

    render() {
        const { enterZipCode } = this.props;
        return (
            <div>
                    <div>
                        <NavBar />
                        <img className="logo-body" src={require('./PLUCK-logo-02.png')} />
                        <ZipCode 
                            enterZipCode={ enterZipCode }/>
                    </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));