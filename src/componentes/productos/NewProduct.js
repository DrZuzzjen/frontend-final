import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import auth from '../auth/auth-helper';

import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { create } from '../../API/api-product';
import { Link, Redirect } from 'react-router-dom';
import {
	InputNumber,
	message,
	Form,
	Select,
	Input,
	Typography,
	Space
} from 'antd';

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
		color: theme.palette.openTitle,
		fontSize: '1.2em'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300
	},
	submit: {
		margin: 'auto',
		marginBottom: theme.spacing(2)
	},
	input: {
		display: 'none'
	},
	filename: {
		marginLeft: '10px'
	}
}));

export default function NewProduct({ match }) {
	const classes = useStyles();
	const [
		values,
		setValues
	] = useState({
		name: '',
		description: '',
		image: '',
		category: '',
		quantity: '',
		price: '',
		redirect: false,
		error: ''
	});
	const { Option } = Select;
	const jwt = auth.isAuthenticated();
	const id = jwt.user._id;
	console.log(id);
	const handleChange = (name) => (event) => {
		console.log(event);
		const value =

				name === 'category' ? event :
				name === 'image' ? event.target.files[0] :
				event.target.value;
		setValues({ ...values, [name]: value });
	};
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
				userId: id
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
				to={'/seller/shop/edit/' + match.params.userId}
			/>
		);
	}
	return (
		<div>
			<Card className={classes.card} elevation={24}>
				<CardContent>
					<Typography type='headline' component='h5'>
						INFORMACIÓN DE TU PRODUCTO
					</Typography>
					<br />
					<input
						accept='image/*'
						onChange={handleChange('image')}
						className={classes.input}
						id='icon-button-file'
						type='file'
					/>
					<label htmlFor='icon-button-file'>
						<Button
							variant='contained'
							color='secondary'
							component='span'>
							Subir foto
							<FileUpload />
						</Button>
					</label>{' '}
					<span className={classes.filename}>
						{
							values.image ? values.image.name :
							''}
					</span>
					<br />
					<TextField
						id='name'
						label='Name'
						className={classes.textField}
						value={values.name}
						onChange={handleChange('name')}
						margin='normal'
					/>
					<br />
					<TextField
						id='multiline-flexible'
						label='Description'
						multiline
						rows='2'
						value={values.description}
						onChange={handleChange('description')}
						className={classes.textField}
						margin='normal'
					/>
					<br />
					<TextField
						id='category'
						label='Category'
						className={classes.textField}
						value={values.category}
						onChange={handleChange('category')}
						margin='normal'
					/>
					<Form.Item label='Categoría'>
						<Select
							id='category'
							value={values.category}
							defaultValue='Categoría'
							onChange={handleChange('category')}
							style={{ width: 200 }}>
							<Option value='Coches'>Coches</Option>
							<Option value='Motos'>Motos</Option>
							<Option value='Moda y Accesorios'>
								Moda y Accesorios
							</Option>
						</Select>
					</Form.Item>
					<br />
					<TextField
						id='quantity'
						label='Quantity'
						className={classes.textField}
						value={values.quantity}
						onChange={handleChange('quantity')}
						type='number'
						margin='normal'
					/>
					<br />
					<TextField
						id='price'
						label='Price'
						className={classes.textField}
						value={values.price}
						onChange={handleChange('price')}
						type='number'
						margin='normal'
					/>
					<br />
					{values.error && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={clickSubmit}
						className={classes.submit}>
						Enviar
					</Button>
					<Link
						to={'/seller/shop/edit/' + match.params.shopId}
						className={classes.submit}>
						<Button variant='contained'>Cancelar</Button>
					</Link>
				</CardActions>
			</Card>
		</div>
	);
}
