import { Meteor } from 'meteor/meteor';
//import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
//import createBrowserHistory from 'history/createBrowserHistory'
//import { Redirect } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
