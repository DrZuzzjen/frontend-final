import React from 'react';
import '../layout/Card.css';
import { Card } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { Link } from 'react-router-dom';

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

export default function SigninSignup() {
	const [
		open,
		setOpen
	] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				onClose={handleClose}
				open={open}
				disableBackdropClick={true}
				titleStyle={
					({ textAlign: 'center' }, { padding: 30 })
				}>
				<DialogTitle onClose={handleClose}>
					¡Bienvenido a wallapop!
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Card
							title='¡Bienvenido a wallapop!'
							bordered={false}
							style={({ width: 300 }, { padding: 30 })}>
							<p>Registrate o inicia sesión</p>
							<p>o continua con tu email</p>
							<p>
								<DialogActions>
									<Link to='/signin'>Inicia sesión </Link>
									{`|`}
									<Link to='/signup'>Registrate</Link>
								</DialogActions>
							</p>
						</Card>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
