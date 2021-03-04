import {
	Form,
	Input,
	Typography,
	Button,
	Checkbox
} from 'antd';

import React, { useState } from 'react';

import Icon from '@material-ui/core/Icon';

import auth from './../auth/auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from '../../API/api-auth.js';

const layout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 16
	}
};
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
		<Form {...layout}>
			<Form.Item
				id='email'
				label='Email'
				value={values.email}
				onChange={handleChange('email')}>
				<Input />
			</Form.Item>

			<Form.Item
				id='password'
				label='Password'
				value={values.password}
				onChange={handleChange('password')}>
				<Input.Password />
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
					Enviar
				</Button>
			</Form.Item>
		</Form>
	);
}
