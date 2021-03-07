import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import '../layout/Card.css';

export default function SigninSignup() {
	return (
		<div>
			<Card
				title='¡Bienvenido a wallapop!'
				bordered={false}
				style={({ width: 300 }, { padding: 30 })}>
				<p>Registrate o inicia sesión</p>

				<Button shape='round' key='1' type='primary'>
					Subir producto
				</Button>
				<Button shape='round' key='1' type='primary'>
					Subir producto
				</Button>
				<p>o continua con tu email</p>
				<p>
					<Link to='/signin'>Inicia sesión </Link>
					{`|`}
					<Link to='/signup'>Registrate</Link>
				</p>
			</Card>
		</div>
	);
}
