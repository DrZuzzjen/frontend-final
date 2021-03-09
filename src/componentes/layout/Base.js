import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from '../layout/Header';
import 'antd/dist/antd.css';
import './Base.css';

const { Content, Footer } = Layout;

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
