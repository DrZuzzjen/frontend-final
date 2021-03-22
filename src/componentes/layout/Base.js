import { Layout, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from '../layout/Header';
import 'antd/dist/antd.css';
import './Base.css';
import Home from '../layout/Home';
import Email from '../z-email/Email'


const { Content, Footer } = Layout;

const Base = withRouter(
	({ children, title, history, ...props }) => (

		<Layout className='whit'>
			<div className='site-page-header-ghost-wrapper'>
				<Header className='blanco'/>
			</div>

			<Email/>

			<Content style={{ padding: '0 50px' }}>
				{children}
			</Content>
			<Footer className='red' style={{ textAlign: 'center' }}>
				Wallarock© 2021 - v0.1.2
			</Footer>
		</Layout>
	)
);

export default Base;
