import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";

export default class BurgerBuilder extends Component {
	state = {
		ingredient: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
	};

	render() {
		return (
			<>
				<Burger ingredient={this.state.ingredient} />
				<div>Build Control</div>
			</>
		);
	}
}
