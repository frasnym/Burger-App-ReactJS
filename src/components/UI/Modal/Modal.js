import React, { Component } from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

export default class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	componentDidUpdate() {
		console.log("[Modal]", "componentDidUpdate");
	}

	render() {
		return (
			<>
				<Backdrop
					show={this.props.show}
					clicked={this.props.modalClose}
				/>
				<div
					className="Modal"
					style={{
						transform: this.props.show
							? "translateY(0)"
							: "translateY(-100vh)",
						opacity: this.props.show ? "1" : "0",
					}}
				>
					{this.props.children}
				</div>
			</>
		);
	}
}
