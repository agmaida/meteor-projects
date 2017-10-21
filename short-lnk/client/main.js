import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import createBrowserHistory from 'history/createBrowserHistory'

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound'
import Login from '../imports/ui/Login'

// This is how to get the browser history in v4
const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/links" component={Link}/>
      <Route component={NotFound}/>
    </Switch>    
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated){
    browserHistory.push('/links');
  } else if (isAuthenticatedPage && !isAuthenticated){
    browserHistory.push('/');
  }

  console.log('isAuthenticated', isAuthenticated)
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
