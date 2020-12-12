import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

export default function Modal(props) {
	return (
		<>
			<Backdrop show={props.show} clicked={props.modalClose} />
			<div
				className="Modal"
				style={{
					transform: props.show
						? "translateY(0)"
						: "translateY(-100vh)",
					opacity: props.show ? "1" : "0",
				}}
			>
				{props.children}
			</div>
		</>
	);
}
