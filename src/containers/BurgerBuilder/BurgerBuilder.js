import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";

export default class BurgerBuilder extends Component {
	render() {
		return (
			<>
				<Burger />
				<div>Build Control</div>
			</>
		);
	}
}
