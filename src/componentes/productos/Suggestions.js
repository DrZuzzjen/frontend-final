import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import { API_ROOT } from '../../API/api-config';
import Moment from 'react-moment';
// import Product from './Product';
import './suggestions.css'


const useStyles = makeStyles((theme) => ({

	cover: {
		width: '30%',
		height: 190,
		margin: '18px'
	}
	
}));


export default function Suggestions(props) {
	const classes = useStyles();

	return (
	<div>
		<Paper className="tarjeta" elevation={10}>

				<div className="titulo">
					Ultimos Productos en WallaRock
				</div>

				{props.products.map((item, i) => {
					
					return (
						<span key={i}>
							<div className="tarje-pequeña">

								<CardMedia
									className={classes.cover}
									image={`${API_ROOT}/api/product/image/${item._id}`}
								/>

								
								<div className="tarje-container"  /* {classes.details} */  >
									
									<div className="tarjeta-medio">
																				
										{/* <Link to={'/product/' + item._id}>
										</Link>	 */}

										<div className="precio-enlace">
											<span className="precio-2">
												{item.price} €
											</span>

										{/* 	<span className="enlace">
												<Link to={'/product/' + item._id}>												
													<IconButton color='secondary'>
														<ViewIcon
															className={classes.iconButton}
														/>
													</IconButton>
												</Link>											
											</span> */}

									   </div>

									   <Link to={'/product/' + item._id}>
											<div className="nombre">
												{item.name}
											</div>
										</Link>									

																	
										
										{/* <div className="fecha">
											Agregado{' '}
											{new Date(
												item.created
											).toDateString()}
										</div> */}

										<div className="fecha"> 
											Subido el&nbsp;
											<Moment format="DD/MM/YYYY HH:mm">
												{item.createdAt} 
											</Moment>
										</div>

								    </div>

									<Link className="tarjeta-derecha"
										to={'/product/' + item._id}>
										<div className="tarjeta-derecha">										
											<div className="descripcion">
												{item.description}
											</div>										
										</div>
									</Link>

						

								</div>

							</div>

							<Divider />

						</span>
					);
				})}
			</Paper>
		</div>
	);
}

Suggestions.propTypes = {
	products: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
};
