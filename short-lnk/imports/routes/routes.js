import { Meteor } from 'meteor/meteor';
import React from 'react';
//import ReactDOM from 'react-dom';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
//import { Tracker } from 'meteor/tracker';
import createBrowserHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

// This is how to get the browser history in v4
const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
    if (isUnauthenticatedPage && isAuthenticated){
      browserHistory.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated){
      browserHistory.replace('/');
    }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={ () => {
        return Meteor.userId() ? <Redirect to="/links"/> : <Login/>
      }}/>
      <Route path="/signup" render={ () => {
        return Meteor.userId() ? <Redirect to="/links"/> : <Signup/>
      }}/>
      <Route path="/links" render={ () => {
        return !Meteor.userId() ? <Redirect to="/"/> : <Link/>
      }}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

