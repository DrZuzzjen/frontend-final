import {
	Descriptions,
	PageHeader,
	Layout,
	Button
} from 'antd';
import 'antd/dist/antd.css';
import './Base.css';
import { Link, withRouter } from 'react-router-dom';

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
				<PageHeader
					ghost={false}
					onBack={() => window.history.back()}
					title='Title'
					subTitle='This is a subtitle'
					extra={[
						<Button shape='round' key='3'>
							Mensajes
						</Button>,
						<Link to='/signin_signup'>
							<Button
								shape='round'
								key='2'
								style={isActive(history, '/signin_signup')}>
								Regístrate o inicia sesión
							</Button>
						</Link>,
						<Button shape='round' key='1' type='primary'>
							Subir producto
						</Button>
					]}>
					<Descriptions size='small' column={1}>
						<Descriptions.Item>
							wallaclone, la plataforma líder de compraventa
							de productos de Segunda mano
						</Descriptions.Item>
						<Descriptions.Item>
							¿Qué estás buscando hoy?
						</Descriptions.Item>
					</Descriptions>
				</PageHeader>
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
