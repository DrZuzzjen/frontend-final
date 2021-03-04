import '../layout/Card.css';
import {
	Form,
	Input,
	Typography,
	Button,
	Checkbox,
	Card
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

import { create } from '../../API/api-user';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link } from 'react-router-dom';

export default function SigninSignup() {
	return (
		<div>
			<Dialog
				open='true'
				disableBackdropClick={true}
				titleStyle={
					({ textAlign: 'center' }, { padding: 30 })
				}>
				<DialogTitle>¡Bienvenido a wallapop!</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Card
							title='¡Bienvenido a wallapop!'
							bordered={false}
							style={({ width: 300 }, { padding: 30 })}>
							<p>Registrate o inicia sesión</p>
							<p>o continua con tu email</p>
							<p>
								<DialogActions>
									<Link to='/signin'>Inicia sesión </Link>
									{` |`}
									<Link to='/signup'>Registrate</Link>
								</DialogActions>
							</p>
						</Card>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
