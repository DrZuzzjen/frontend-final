import React, { useState } from 'react';
import {
	Button,
	Col,
	Divider,
	Row,
	Input,
	Space
} from 'antd';
import { Modal } from 'react-responsive-modal';
import Signin from '../auth/Signin';
import Signup from '../usuario/Signup';
import SignBase from '../auth/SignBase';
import { list } from '../../API/api-product';
import Products from '../productos/Products';
import auth from '../auth/auth-helper';
import 'antd/dist/antd.css';
import './Base.css';
import 'react-responsive-modal/styles.css';
import {
	MessageOutlined,
	HighlightOutlined,
	PlusOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function Header() {
	const history = useHistory();
	const { Search } = Input;

	const [
		values,
		setValues
	] = useState({
		category: '',
		search: '',
		results: [],
		searched: false
	});

	const handleChange = (name) => (event) => {
		console.log(event.target.value);
		setValues({
			...values,
			[name]: event.target.value
		});
	};
	const search = () => {
		if (values.search) {
			list({
				search: values.search || undefined,
				category: values.category
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
				}
				else {
					setValues({
						...values,
						results: data,
						searched: true
					});
				}
			});
		}
	};
	const enterKey = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			search();
		}
	};
	const [
		signbase,
		setSignbase
	] = React.useState(false);

	const [
		signin,
		setSignin
	] = React.useState(false);

	const [
		signup,
		setSignup
	] = React.useState(false);

	const [
		open,
		setOpen
	] = React.useState(false);

	const handleClickOpen = () => {
		setSignbase(true);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSignup(false);
		setSignin(false);
	};

	const handleSignin = () => {
		setOpen(false);
		setSignup(false);
		setSignin(false);
	};

	const handleSignup = () => {
		setSignup(true);
		setSignin(false);
		setSignbase(false);
	};

	const handleSign = () => {
		setSignup(false);
		setSignin(true);
		setSignbase(false);
	};

	return (
		<div>
			<Row>
				<Space>
					<Col flex='auto'>
						<Button
							icon={<HighlightOutlined />}
							shape='circle'
							style={{ float: 'right' }}
						/>
					</Col>
					<Col flex='auto'>
						{' '}
						<br />
					</Col>
					<Col flex='auto'>
						<Search
							onKeyDown={enterKey}
							onChange={handleChange('search')}
							placeholder='input search text'
							onSearch={search}
							enterButton
						/>
					</Col>

					<Col flex='auto'>
						<Button
							icon={<MessageOutlined />}
							key='2'
							shape='round'
							style={{ float: 'right' }}>
							Mensajes
						</Button>
					</Col>
					{
						!auth.isAuthenticated() ? <Col flex='auto'>
							<Button
								style={{ float: 'right' }}
								shape='round'
								onClick={handleClickOpen}>
								Regístrate o inicia sesión
							</Button>
						</Col> :
						<Col>
							<Button
								color='inherit'
								onClick={() => {
									handleSignin();
									auth.clearJWT(() => history.push('/'));
								}}>
								Salir
							</Button>
						</Col>}

					<Col flex='auto'>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							shape='round'
							style={{ float: 'right' }}>
							Subir Producto
						</Button>
					</Col>
				</Space>
			</Row>
			<Divider />
			<Row>
				{' '}
				<Products
					products={values.results}
					searched={values.searched}
				/>
			</Row>

			<Modal open={open} onClose={handleClose}>
				{signbase && (
					<SignBase
						onbasein={handleSign}
						onbaseup={handleSignup}
					/>
				)}
				{signin && (
					<Signin
						onSignin={handleSignin}
						onsingup={handleSignup}
					/>
				)}
				{signup && <Signup onSign={handleSign} />}
			</Modal>
		</div>
	);
}
