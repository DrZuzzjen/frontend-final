import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../layout/Home';
import Cart from '../../componentes/carro/Cart';
import Base from '../layout/Base.js';
import Users from '../usuario/Users';
import Product from '../productos/Product';
import Profile from '../usuario/Profile';
import NuevoProducto from '../productos/NuevoProducto';
import DeleteProducto from '../productos/DeleteProduct';
import EditProducto from '../productos/EditProduct';
import EditProfile from '../usuario/EditProfile';
import MisProductos from '../productos/MyProducts';

const MainRouter = () => {
	return (
		<div>
			<Base>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/users' component={Users} />
					<Route
						exact
						path='/user/:userId'
						component={Profile}
					/>
					<Route
						exact
						path='/user/:userId/product'
						component={MisProductos}
					/>
					<Route
						exact
						path='/user/edit/:userId'
						component={EditProfile}
					/>

					<Route
						exact
						path='/product/:productId'
						component={Product}
					/>
					<Route
						exact
						path='/product'
						component={NuevoProducto}
					/>
					<Route
						exact
						path='/product/:productId/delete'
						component={DeleteProducto}
					/>
					<Route
						exact
						path='/product/:productId/edit/'
						component={EditProducto}
					/>

					<Route path='/cart' component={Cart} />
					<Route path='/user/:userId' component={Profile} />
				</Switch>
			</Base>
		</div>
	);
};

export default MainRouter;
