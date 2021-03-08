import React from 'react';

import { Button, Col, Divider, Input, Row } from 'antd';
import {
	MessageOutlined,
	HighlightOutlined,
	PlusOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { AudioOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Signin from '../auth/Signin';
import Signup from '../user/Signup';
import 'antd/dist/antd.css';
import './Base.css';
import SignBase from '../auth/SignBase';
const { Search } = Input;
const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#000000' };
	else return { color: '#000000' };
};

export default function Header({ handleSearch }) {
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
				<Col>
					<Button
						icon={<HighlightOutlined />}
						shape='circle'
						style={{ float: 'right' }}
					/>
				</Col>
				<br />
				<Col>
					<Search
						placeholder='Search'
						onSearch={handleSearch}
						allowClear
						style={{ float: 'left', width: 350 }}
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
				<Col flex='auto'>
					<Button
						style={{ float: 'right' }}
						shape='round'
						onClick={handleClickOpen}>
						Regístrate o inicia sesión
					</Button>
				</Col>
				<Col flex='auto'>
					<Button
						icon={<PlusOutlined />}
						type='primary'
						shape='round'
						style={{ float: 'right' }}>
						Subir Producto
					</Button>
				</Col>
			</Row>
			<Divider />

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
