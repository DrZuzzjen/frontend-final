import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../layout/Home';
import Signin from '../auth/Signin';
import SigninSignup from '../auth/SigninSignup';
import Base from '../layout/Base.js';
import Users from '../user/Users';
import Signup from '../user/Signup';

const MainRouter = () => {
	return (
		<div>
			<Base>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/users' component={Users} />
					<Route path='/signup' component={Signup} />
					<Route path='/signin' component={Signin} />
					<Route
						path='/signin_signup'
						component={SigninSignup}
					/>
				</Switch>
			</Base>
		</div>
	);
};

export default MainRouter;
