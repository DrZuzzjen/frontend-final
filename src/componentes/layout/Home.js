import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Products from '../productos/Products';

import {
	listLatest,
	listCategories
} from '../../API/api-product';

import Suggestions from '../productos/Suggestions';

import Search from '../productos/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 30
	}
}));

export default function Home({ products, searched }) {
	const classes = useStyles();

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
			console.log(data);
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
			<Products products={products} searched={searched} />
			<Suggestions
				products={suggestions}
				title={suggestionTitle}
			/>
		</div>
	);
}
