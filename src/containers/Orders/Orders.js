import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../utils/axios-orders";
import withErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
	const { onFetchOrders, token, userId } = props;

	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map((order) => {
			return (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={+order.price}
				/>
			);
		});
	}

	return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
