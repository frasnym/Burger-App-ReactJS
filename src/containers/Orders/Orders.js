import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../utils/axios-orders";
import withErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";

const Orders = class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get("/orders.json")
			.then((res) => {
				const fetchedOrders = [];
				for (const key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}

				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map((order) => {
					return (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							price={+order.price}
						/>
					);
				})}
			</div>
		);
	}
};

export default withErrorHandler(Orders, axios);
