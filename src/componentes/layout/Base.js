import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './Base.css';
import { withRouter } from 'react-router-dom';
import Header from '../layout/Header';

const { Content, Footer } = Layout;

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return { color: '#000000' };
	else return { color: '#000000' };
};

const Base = withRouter(
	({ children, title, history, ...props }) => (
		<Layout className='layout'>
			<div className='site-page-header-ghost-wrapper'>
				<Header />
			</div>
			<Content style={{ padding: '0 50px' }}>
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
