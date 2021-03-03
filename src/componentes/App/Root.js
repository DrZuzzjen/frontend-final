import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';

const Root = () => (
	<BrowserRouter>
		<MainRouter />
	</BrowserRouter>
);

export default Root;
