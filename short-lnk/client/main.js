import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import createBrowserHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router';


import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound'
import Login from '../imports/ui/Login'

// This is how to get the browser history in v4
const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

// const routes = (
//   <Router history={browserHistory}>
//     <Switch>
//       <Route exact path="/" component={Login}/>
//       <Route path="/signup" component={Signup}/>
//       <Route path="/links" component={Link}/>
//       <Route component={NotFound}/>
//     </Switch>    
//   </Router>
// );

// The Redirect for / and signup was found in the QA for the course
// I am using Redirect because onEnter isnt supported in react rourter v4
// ? : is shorhand for if else
const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={ () => {
        return Meteor.userId() ? <Redirect to="/links"/> : <Login/>
      }}/>
      <Route path="/signup" render={ () => {
        return Meteor.userId() ? <Redirect to="/links"/> : <Singup/>
      }}/>
      <Route path="/links" render={ () => {
        return !Meteor.userId() ? <Redirect to="/"/> : <Link/>
      }}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
 );

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
  }

  //console.log('isAuthenticated', isAuthenticated)
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
