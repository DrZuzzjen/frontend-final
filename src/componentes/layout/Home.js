import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Suggestions from '../productos/Suggestions';
import Categories from '../productos/Categories';
import {
	listLatest,
	listCategories
} from '../../API/api-product';

import NuevoProducto from '../productos/NuevoProducto';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 30
	}
}));

export default function Home(props) {
	const classes = useStyles();

	const [
		products,
		setProducts
	] = useState([]);
	const [
		suggestionTitle,
		setSuggestionTitle
	] = useState('Latest Products');
	const [
		categories,
		setCategories
	] = useState([]);
	const [
		suggestions,
		setSuggestions
	] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		listLatest(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				setSuggestions(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		listCategories(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				setCategories(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	return (
		<div className={classes.root}>
			<NuevoProducto />
			<Grid container spacing={2}>
				<Grid item xs={8} sm={8} />
				<Grid item xs={4} sm={4} />
			</Grid>
		</div>
	);
}
