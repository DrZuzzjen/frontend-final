import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import {
	Descriptions,
	PageHeader,
	Layout,
	Button
} from 'antd';
import 'antd/dist/antd.css';
import './Base.css';
import { Link, withRouter } from 'react-router-dom';

const { Content, Footer } = Layout;

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#000000' };
	else return { color: '#000000' };
};

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle
			disableTypography
			className={classes.root}
			{...other}>
			<Typography variant='h6'>{children}</Typography>
			{
				onClose ? <IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}>
					<CloseIcon />
				</IconButton> :
				null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

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
			<Dialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}>
				<DialogTitle
					id='customized-dialog-title'
					onClose={handleClose}>
					Modal title
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet
						fermentum. Cras justo odio, dapibus ac facilisis
						in, egestas eget quam. Morbi leo risus, porta ac
						consectetur ac, vestibulum at eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque
						nisl consectetur et. Vivamus sagittis lacus vel
						augue laoreet rutrum faucibus dolor auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur.
						Praesent commodo cursus magna, vel scelerisque
						nisl consectetur et. Donec sed odio dui. Donec
						ullamcorper nulla non metus auctor fringilla.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handleClose}
						color='primary'>
						Save changes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
