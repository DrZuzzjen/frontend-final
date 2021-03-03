import { Layout, Menu, Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.css';
import './Base.css';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#bef67a' };
	else return { color: '#ffffff' };
};

const Base = withRouter(
	({ children, title, history, ...props }) => (
		<Layout className='layout'>
			<Header>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={[
						'2'
					]}>
					<Menu.Item key='1'>
						<Link to='/signin'>
							<Button style={isActive(history, '/signin')}>
								Entrar
							</Button>
						</Link>
					</Menu.Item>
					<Menu.Item key='2'>nav 2</Menu.Item>
					<Menu.Item key='3'>nav 3</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className='site-layout-content'>
					{children}
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</Layout>
	)
);

export default Base;
