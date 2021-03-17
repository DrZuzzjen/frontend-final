import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from './../auth/auth-helper';
import { remove } from '../../API/api-product';

export default function DeleteProduct(props) {
	const [
		open,
		setOpen
	] = useState(false);

	const jwt = auth.isAuthenticated();
	const id = jwt.user._id;

	const clickButton = () => {
		setOpen(true);
	};
	const deleteProduct = () => {
		remove(
			{
				userId: id,
				productId: props.product._id
			},
			{ t: jwt.token }
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				setOpen(false);
				props.onRemove(props.product);
			}
		});
	};
	const handleRequestClose = () => {
		setOpen(false);
	};
	return (
		<span>
			<IconButton
				aria-label='Delete'
				onClick={clickButton}
				color='secondary'>
				<DeleteIcon />
			</IconButton>
			<Dialog open={open} onClose={handleRequestClose}>
				<DialogTitle>
					{'Borrar ' + props.product.name}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Confirmas Borrar tu producto{' '}
						{props.product.name}.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRequestClose}
						color='primary'>
						Cancelar
					</Button>
					<Button
						onClick={deleteProduct}
						color='secondary'
						autoFocus='autoFocus'>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
}
DeleteProduct.propTypes = {
	userId: PropTypes.string.isRequired,
	product: PropTypes.object.isRequired,
	onRemove: PropTypes.func.isRequired
};
