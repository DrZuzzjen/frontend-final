import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import SearchIcon from '@material-ui/icons/Search';
import { list } from '../../API/api-product';
import Products from '../productos/Products';
import Home from '../layout/Home';

const useStyles = makeStyles((theme) => ({
	card: {
		margin: 'auto',
		textAlign: 'center',
		paddingTop: 10,
		backgroundColor: '#80808024'
	},
	menu: {
		width: 200
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 130,
		verticalAlign: 'bottom',
		marginBottom: '20px'
	},
	searchField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
		marginBottom: '20px'
	},
	searchButton: {
		minWidth: '20px',
		height: '30px',
		padding: '0 8px',
		marginBottom: '20px'
	}
}));

export default function Search(props) {
	const classes = useStyles();
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
		if (event.keyCode == 13) {
			event.preventDefault();
			search();
		}
	};
	return (
		<div>
			<Card className={classes.card} elevation={10}>
				product/Search <br />
				<TextField
					id='search'
					label='Busca producto'
					type='search'
					onKeyDown={enterKey}
					onChange={handleChange('search')}
					margin='normal'
				/>
				<Button
					variant='contained'
					color={'primary'}
					onClick={search}>
					<SearchIcon />
				</Button>
				<Divider />
				<Home
					products={values.results}
					searched={values.searched}>
					<Products
						products={values.results}
						searched={values.searched}
					/>
				</Home>
			</Card>
		</div>
	);
}
Search.propTypes = {
	categories: PropTypes.array.isRequired
};
