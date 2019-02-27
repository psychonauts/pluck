import React from 'react';
import axios from 'axios';

const APIconfig = require('../../../config');

console.log('APIconfig: ', APIconfig);

class MyDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileChangedHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  uploadHandler() {
    const { selectedFile } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${APIconfig.key}`,
        'content-type': 'multipart/form-data',
      },
    };

    axios.post('https://api.imgur.com/3/image', selectedFile, config)
      .then(({ data }) => {
      // consider also checking the headers at this point because they should
      //   contain the api key limit
      // 1250/day (I think), but ive also got the request built out in postman
      //   to refresh and get a new key
      // the value attached to Bearer in the heading

        this.setState({ imageURL: data.link });

        // send imageURL to the server for storage
        // we should then call a function that send the imageURL to the database...
      })
      .catch(((err) => {
        console.log(err);
      }));
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileChangedHandler} />
        <button type="button" onClick={this.uploadHandler}>Upload!</button>
      </div>
    );
  }
}

export default MyDropzone;
