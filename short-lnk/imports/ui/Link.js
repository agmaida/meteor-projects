import React from 'react';
// withRouter instead of browserHistory
import { Accounrs } from 'meteor/accounts-base';

export default class Link extends React.Component {
    onLogout(){
        Accounts.logout();
    }
    render() {
      return (
          <div>
              <h1>Your Links</h1>
              <button onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
      );
    }
  }