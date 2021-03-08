import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../layout/Home';

import Base from '../layout/Base.js';
import Users from '../user/Users';

const MainRouter = () => {
	return (
		<div>
			<Base>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/users' component={Users} />
				</Switch>
			</Base>
		</div>
	);
};

export default MainRouter;
