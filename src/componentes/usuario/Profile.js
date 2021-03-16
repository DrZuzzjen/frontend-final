import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	Typography,
	Divider,
	Avatar,
	List
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ListItemText from '@material-ui/core/ListItemText';
import auth from '../auth/auth-helper';
import { read } from '../../API/api-user';
import { Redirect, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
		marginTop: theme.spacing(5)
	}),
	title: {
		margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.protectedTitle
	},
	stripe_connect: {
		marginRight: '10px'
	},
	stripe_connected: {
		verticalAlign: 'super',
		marginRight: '10px'
	}
}));

export default function Profile({ match }) {
	const classes = useStyles();
	const [
		user,
		setUser
	] = useState({});
	const [
		redirectToSignin,
		setRedirectToSignin
	] = useState(false);
	const jwt = auth.isAuthenticated();

	useEffect(
		() => {
			const abortController = new AbortController();
			const signal = abortController.signal;
			read(
				{
					userId: match.params.userId
				},
				{ t: jwt.token },
				signal
			).then((data) => {
				if (data && data.error) {
					setRedirectToSignin(true);
				}
				else {
					setUser(data);
				}
			});

			return function cleanup() {
				abortController.abort();
			};
		},
		[
			match.params.userId
		]
	);

	if (redirectToSignin) {
		return <Redirect to='/signin' />;
	}
	return (
		<Card className={classes.root} elevation={4}>
			<Typography variant='h6' className={classes.title}>
				Perfil
			</Typography>
			<List>
				<List.Item>
					<Avatar size={64} icon={<UserOutlined />} />
					<ListItemText
						primary={user.name}
						secondary={user.email}
					/>{' '}
				</List.Item>
				<Divider />

				<ListItemText
					primary={
						'Joined: ' +
						new Date(user.created).toDateString()
					}
				/>
			</List>
		</Card>
	);
}
