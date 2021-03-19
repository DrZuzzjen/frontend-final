import { Layout, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from '../layout/Header';
import 'antd/dist/antd.css';
import './Base.css';
import Home from '../layout/Home';

const { Content, Footer } = Layout;

const Base = withRouter(
	({ children, title, history, ...props }) => (
		<Layout className='layout'>
			{console.log({ children })}
			<div className='site-page-header-ghost-wrapper' />
			<Header />
			<Content style={{ padding: '0 50px' }}>
				{children}
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</Layout>
	)
);

export default Base;
