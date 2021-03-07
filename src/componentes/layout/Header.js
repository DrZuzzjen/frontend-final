import React from 'react';
import { Descriptions, PageHeader, Button } from 'antd';

import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SigninSignup from '../auth/SigninSignup';
import Signin from '../auth/Signin';
import Signup from '../user/Signup';
import 'antd/dist/antd.css';
import './Base.css';

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#000000' };
	else return { color: '#000000' };
};

export default function Header() {
	const [
		open,
		setOpen
	] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogin = () => {
		setOpen(false);
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
				<Signin onLogin={handleLogin} />
			</Modal>
		</div>
	);
}
