import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from '../imports/ui/App.jsx';
import UserHome from '../imports/ui/UserHome.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import Login from '../imports/ui/Login.jsx';
import Submission from '../imports/ui/Submission.jsx';

Meteor.startup(() => {

})

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
		<Route path="/home" component={UserHome}/>
		<Route path="/login" component={Login}/>
		<Route path="/submission" component={Submission}/>
		<Route path="*" component={NotFound}/>  
	</Router>
), document.getElementById('render-target'))
