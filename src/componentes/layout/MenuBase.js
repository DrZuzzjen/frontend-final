import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#bef67a' };
	else return { color: '#ffffff' };
};
const isPartActive = (history, path) => {
	if (history.location.pathname.includes(path))
		return { color: '#bef67a' };
	else return { color: '#ffffff' };
};
const Menu = withRouter(({ history }) => (
	<AppBar position='static'>
		core/Menu
		<Toolbar>
      <div style={classes.logoHorizontallyCenter}>
        <img src={"../public/wallarock.logo.svg" className={classes.logo} alt="logo" />
      </div>
    </Toolbar>
		<Toolbar>
			<br />
			<Typography variant='h6' color='inherit'>
				WallaRock
			</Typography>
			<div>
				<Link to='/'>
					<IconButton
						aria-label='Home'
						style={isActive(history, '/')}>
						<HomeIcon />
					</IconButton>
				</Link>
				<Link to='/shops/all'>
					<Button style={isActive(history, '/shops/all')}>
						Tiendas
					</Button>
				</Link>
			</div>
			<div style={{ position: 'absolute', right: '10px' }}>
				<span style={{ float: 'right' }}>
					{!auth.isAuthenticated() && (
						<span>
							<Link to='/signup'>
								<Button
									style={isActive(history, '/signup')}>
									Registrar
								</Button>
							</Link>
							<Link to='/signin'>
								<Button
									style={isActive(history, '/signin')}>
									Entrar
								</Button>
							</Link>
						</span>
					)}
					{auth.isAuthenticated() && (
						<span>
							{auth.isAuthenticated().user.seller && (
								<Link to='/seller/shops'>
									<Button
										style={isPartActive(
											history,
											'/seller/'
										)}>
										Mis tiendas
									</Button>
								</Link>
							)}
							<Link
								to={
									'/user/' + auth.isAuthenticated().user._id
								}>
								<Button
									style={isActive(
										history,
										'/user/' +
											auth.isAuthenticated().user._id
									)}>
									Mi perfil
								</Button>
							</Link>
							<Button
								color='inherit'
								onClick={() => {
									auth.clearJWT(() => history.push('/'));
								}}>
								Salir
							</Button>
						</span>
					)}
				</span>
			</div>
		</Toolbar>
	</AppBar>
));

export default Menu;
