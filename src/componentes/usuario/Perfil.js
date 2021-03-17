import React, { useState, useEffect } from 'react';

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

export default function Perfil({ match }) {
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
		<Card elevation={4}>
			<Typography variant='h6'>Perfil</Typography>
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
