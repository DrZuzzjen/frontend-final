import '../layout/Card.css';
import {
	Form,
	Input,
	Typography,
	Button,
	Card
} from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import auth from './../auth/auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from '../../API/api-auth.js';
import Icon from '@material-ui/core/Icon';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Modal } from 'react-responsive-modal';
import DialogActions from '@material-ui/core/DialogActions';

import { Link } from 'react-router-dom';
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
};

const Signin = ({ data }) => {
	const history = useHistory();

	const [
		open,
		setOpen
	] = React.useState(true);

	const [
		values,
		setValues
	] = useState({
		email: '',
		password: '',
		error: ''
	});

	const couldSubmit = () => {
		return values.email && values.password;
	};

	const clickSubmit = () => {
		const user = {
			email: values.email || undefined,
			password: values.password || undefined
		};

		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				auth.authenticate(data, () => {
					setValues({
						...values,
						error: ''
					});
					setOpen(false);
				});
				history.push('/');
			}
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	return (
		<div className='site-card-border-less-wrapper'>
			<Modal open={open} onClose={handleClose}>
				<Card
					title='¡Bienvenido de nuevo!'
					bordered={false}
					style={({ width: 300 }, { padding: 30 })}>
					<Form>
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
								onClick={clickSubmit}
								shape='round'
								size='large'>
								Iniciar sesión
							</Button>
						</Form.Item>
					</Form>

					<Link to='/signin'>Recuperar contraseña </Link>
					{` |`}
					<Link to='/signup'>Registrate</Link>
				</Card>
			</Modal>
		</div>
	);
};

export default Signin;
