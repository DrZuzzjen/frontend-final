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
import auth from './../auth/auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from '../../API/api-auth.js';
import Icon from '@material-ui/core/Icon';
import React, { useState } from 'react';
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

export default function Signin(props) {
	const [
		values,
		setValues
	] = useState({
		email: '',
		password: '',
		error: '',
		redirectToReferrer: false
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
						error: '',
						redirectToReferrer: true
					});
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const { from } = props.location.state || {
		from: {
			pathname: '/'
		}
	};
	const { redirectToReferrer } = values;
	if (redirectToReferrer) {
		return <Redirect to={from} />;
	}

	return (
		<div className='site-card-border-less-wrapper'>
			<Dialog
				open='true'
				disableBackdropClick={true}
				titleStyle={
					({ textAlign: 'center' }, { padding: 30 })
				}>
				<Card
					title='¡Bienvenido de nuevo!'
					bordered={false}
					style={({ width: 300 }, { padding: 30 })}>
					<p>
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
					</p>
					<DialogActions>
						<Link to='/signin'>Recuperar contraseña </Link>
						{` |`}
						<Link to='/signup'>Registrate</Link>
					</DialogActions>
				</Card>
			</Dialog>
		</div>
	);
}
