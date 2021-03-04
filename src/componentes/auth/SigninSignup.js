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
import { makeStyles } from '@material-ui/core/styles';
import { create } from '../../API/api-user';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link } from 'react-router-dom';

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
};

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		textAlign: 'center',
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2)
	},
	error: {
		verticalAlign: 'middle'
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300
	},
	submit: {
		margin: 'auto',
		marginBottom: theme.spacing(2)
	}
}));

export default function SigninSignup() {
	const classes = useStyles();
	const [
		values,
		setValues
	] = useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: ''
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const couldSubmit = () => {
		return values.name && values.email && values.password;
	};

	const clickSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			password: values.password || undefined
		};
		create(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				setValues({ ...values, error: '', open: true });
			}
		});
	};
	return (
		<div>
			<Card
				title='¡Bienvenido de nuevo!'
				bordered={false}
				style={({ width: 300 }, { padding: 30 })}>
				<p>
					<Form.Item
						id='name'
						value={values.name}
						onChange={handleChange('name')}>
						<Input
							size='large'
							placeholder='Nombre y apellidos'
							prefix={<UserOutlined />}
						/>
					</Form.Item>

					<Form.Item
						id='email'
						value={values.email}
						onChange={handleChange('email')}>
						<Input
							size='large'
							placeholder='Dirección de email'
							prefix={<UserOutlined />}
						/>
					</Form.Item>

					<Form.Item
						id='password'
						value={values.password}
						onChange={handleChange('password')}>
						<Input.Password
							size='large'
							placeholder='Contraseña'
						/>
					</Form.Item>

					<Form.Item {...tailLayout}>
						{values.error && (
							<Typography component='p' color='error'>
								<Icon color='error'>error</Icon>
								{values.error}
							</Typography>
						)}
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button
							type='primary'
							htmlType='submit'
							disabled={!couldSubmit()}
							onClick={clickSubmit}>
							Crear una cuenta
						</Button>
					</Form.Item>
				</p>
			</Card>

			<Dialog
				open={values.open}
				disableBackdropClick={true}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to='/signin'>
						<Button
							color='primary'
							autoFocus='autoFocus'
							variant='contained'>
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
}
