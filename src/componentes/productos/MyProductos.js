import React, { useState, useEffect } from 'react';
import auth from '../auth/auth-helper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Edit from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { listByShop } from '../../API/api-product';
import DeleteProduct from '../productos/DeleteProduct';

const useStyles = makeStyles((theme) => ({
	products: {
		padding: '24px'
	},
	addButton: {
		float: 'right'
	},
	leftIcon: {
		marginRight: '8px'
	},
	title: {
		margin: theme.spacing(2),
		color: theme.palette.protectedTitle,
		fontSize: '1.2em'
	},
	subheading: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle
	},
	cover: {
		width: 110,
		height: 100,
		margin: '8px'
	},
	details: {
		padding: '10px'
	}
}));

export default function MyProduct(props) {
	const classes = useStyles();
	const [
		products,
		setProducts
	] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const jwt = auth.isAuthenticated();
		const id = jwt.user._id;
		console.log(props.userId);
		listByShop(
			{
				userId: id
			},
			signal
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				setProducts(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	const removeProduct = (product) => {
		const updatedProducts = [
			...products
		];
		const index = updatedProducts.indexOf(product);
		updatedProducts.splice(index, 1);
		setProducts(updatedProducts);
	};

	return (
		<Card className={classes.products}>
			product/MyProducts
			<Typography type='title' className={classes.title}>
				Producto
				<span className={classes.addButton}>
					<Link
						to={
							'/seller/' + props.userId + '/products/new'
						}>
						<Button color='primary' variant='contained'>
							<Icon className={classes.leftIcon}>
								add_box
							</Icon>
							Nuevo Producto
						</Button>
					</Link>
				</span>
			</Typography>
		</Card>
	);
}
MyProducts.propTypes = {
	userId: PropTypes.string.isRequired
};
