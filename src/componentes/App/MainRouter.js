import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../layout/Home';
import Cart from '../../componentes/cart/Cart';
import Base from '../layout/Base.js';
import Users from '../user/Users';
import Product from '../productos/Product';
import Profile from '../user/Profile';

const MainRouter = () => {
	return (
		<div>
			<Base>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/users' component={Users} />
					<Route
						path='/product/:productId'
						component={Product}
					/>
					<Route path='/cart' component={Cart} />
					<Route path='/user/:userId' component={Profile} />
				</Switch>
			</Base>
		</div>
	);
};

export default MainRouter;
