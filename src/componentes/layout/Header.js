import React from 'react';
import { Descriptions, PageHeader, Button } from 'antd';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import Signin from '../auth/Signin';
import Signup from '../user/Signup';
import 'antd/dist/antd.css';
import './Base.css';
import SignBase from '../auth/SignBase';

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#000000' };
	else return { color: '#000000' };
};

export default function Header() {
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
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Title'
				subTitle='This is a subtitle'
				extra={[
					<Button shape='round' key='3'>
						Mensajes
					</Button>,
					<Button
						shape='round'
						key='2'
						onClick={handleClickOpen}>
						Regístrate o inicia sesión
					</Button>,
					<Button shape='round' key='1' type='primary'>
						Subir producto
					</Button>
				]}>
				<Descriptions size='small' column={1}>
					<Descriptions.Item>
						wallaclone, la plataforma líder de compraventa
						de productos de Segunda mano
					</Descriptions.Item>
					<Descriptions.Item>
						¿Qué estás buscando hoy?
					</Descriptions.Item>
				</Descriptions>
			</PageHeader>
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
