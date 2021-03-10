import React, { useState } from 'react';

import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import auth from './../auth/auth-helper';
import Icon from '@material-ui/core/Icon';
import { create } from '../../API/api-product';
import { Redirect } from 'react-router-dom';

import {
	InputNumber,
	Button,
	message,
	Form,
	Select,
	Input,
	Typography,
	Card,
	Space
} from 'antd';

export default function NuevoProducto({ match }) {
	const [
		values,
		setValues
	] = useState({
		name: '',
		description: '',
		image: '',
		category: '',
		quantity: 1,
		price: '',
		redirect: false,
		error: ''
	});
	const { Option } = Select;
	const { TextArea } = Input;
	const tailLayout = {
		wrapperCol: {
			offset: 8,
			span: 16
		}
	};
	const jwt = auth.isAuthenticated();
	const handleChange = (name) => (event) => {
		const value =

				name === 'image' ? event.target.files[0] :
				event.target.value;
		setValues({ ...values, [name]: value });
	};

	function handleMenuClick(e) {
		message.info('Click on menu item.');
		console.log('click', e);
	}
	const clickSubmit = () => {
		let productData = new FormData();
		values.name && productData.append('name', values.name);
		values.description &&
			productData.append('description', values.description);
		values.image &&
			productData.append('image', values.image);
		values.category &&
			productData.append('category', values.category);
		values.quantity &&
			productData.append('quantity', values.quantity);
		values.price &&
			productData.append('price', values.price);

		create(
			{
				shopId: match.params.shopId
			},
			{
				t: jwt.token
			},
			productData
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				setValues({ ...values, error: '', redirect: true });
			}
		});
	};

	if (values.redirect) {
		return (
			<Redirect
				to={'/seller/shop/edit/' + match.params.shopId}
			/>
		);
	}
	return (
		<div>
			<Card elevation={24}>
				<Form layout='vertical'>
					<Typography type='headline' component='h5'>
						INFORMACIÓN DE TU PRODUCTO
					</Typography>
					<br />
					<Form.Item
						id='name'
						label='Qué estas vendiendo?'
						value={values.name}
						onChange={handleChange('name')}>
						<Input
							size='large'
							placeholder='En pocas palabras'
						/>
					</Form.Item>
					<Space>
						<Form.Item label='Categoría'>
							<Select
								defaultValue='Categoría'
								value={values.category}
								onChange={handleChange('category')}
								style={{ width: 200 }}>
								<Option value='Coches'>Coches</Option>
								<Option value='Motos'>Motos</Option>
								<Option value='>Moda y Accesorios'>
									Moda y Accesorios
								</Option>
							</Select>
						</Form.Item>
						<Form.Item
							id='price'
							label='Price'
							value={values.price}
							onChange={handleChange('price')}
							type='number'
							margin='normal'>
							<InputNumber
								min={8}
								max={10000000}
								// value={number.value}
								// onChange={onNumberChange}
							/>
						</Form.Item>
					</Space>
					<Form.Item
						id='multiline-flexible'
						label='Description'
						multiline
						rows='2'
						value={values.description}
						onChange={handleChange('description')}>
						<TextArea
							size='large'
							placeholder='Añade informacion relevante como estado, modelo, color...'
							rows={4}
						/>
					</Form.Item>
					<br />
					<br />
					<input
						accept='image/*'
						onChange={handleChange('image')}
						id='icon-button-file'
						type='file'
					/>
					<br />
					<label htmlFor='icon-button-file'>
						<Button
							variant='contained'
							color='secondary'
							component='span'>
							Subir foto
							<FileUpload />
						</Button>
					</label>{' '}
					<span>
						{
							values.image ? values.image.name :
							''}
					</span>
					<br />
					<br />
					{values.error && (
						<Typography component='p' color='error'>
							<Icon color='error'>error</Icon>
							{values.error}
						</Typography>
					)}
					<Form.Item {...tailLayout}>
						<Button
							color='primary'
							variant='contained'
							onClick={clickSubmit}>
							Enviar
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}
