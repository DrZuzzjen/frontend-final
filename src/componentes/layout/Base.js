import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from '../layout/Header';
import 'antd/dist/antd.css';
import './Base.css';

const { Content, Footer } = Layout;

const Base = withRouter(
	({ children, title, history, ...props }) => (
		<Layout className='whit'>
			<div className='site-page-header-ghost-wrapper'>
				<Header className='blanco'/>
			</div>
			<Content style={{ padding: '0 50px' }}>
				<div className='site-layout-content'>
					{children}
				</div>
			</Content>
			<Footer className='red' style={{ textAlign: 'center' }}>
				Wallarock© 2021 - v0.1.2
			</Footer>
		</Layout>
	)
);

export default Base;
