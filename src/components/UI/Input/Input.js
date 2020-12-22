import React from "react";

import "./Input.css";

export default function Input(props) {
	let inputElement = null;

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className="InputElement"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;

		case "textarea":
			inputElement = (
				<textarea
					className="InputElement"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select className="InputElement" value={props.value}>
					{props.elementConfig.options.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;

		default:
			inputElement = (
				<input
					className="InputElement"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
	}

	return (
		<div className="Input">
			<label className="Label">{props.label}</label>
			{inputElement}
		</div>
	);
}
