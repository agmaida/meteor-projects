import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import {} from 'react-router-dom'

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound'

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/signup" component={Signup}/>
      <Route path="/links" component={Link}/>
      <Route path="*" component={NotFound}/>
    </Switch>    
  </BrowserRouter>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

//<Route path="/signup" component={Signup}/>