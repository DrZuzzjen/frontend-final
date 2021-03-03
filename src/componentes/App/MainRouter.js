import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Base from '../layout/Base';
import Signin from '../auth/Signin';
import Menu from '../layout/Menu';

const MainRouter = () => {
	return (
		<div>
			<Menu />
			<Switch>
				<Route exact path='/' component={Base} />
				<Route path='/signin' component={Signin} />
			</Switch>
		</div>
	);
};

export default MainRouter;
