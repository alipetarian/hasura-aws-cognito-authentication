import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { render } from '@testing-library/react';

Amplify.configure(awsconfig);

class App extends Component {

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => {
      console.log("Authenticated ",user)
    })
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h3>Coold stuff goes here</h3>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
