import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../utils/axios-orders";
import withErrorHandler from "../../../components/HOC/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/actions";
import { updateObject, checkValidity } from "../../../utils/utility";

import "./ContactData.css";

const ContactData = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Full Name",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Zip Code",
			},
			value: "",
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Email",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{
						value: "fastest",
						displayValue: "Fastest",
					},
					{
						value: "cheapest",
						displayValue: "Cheapest",
					},
				],
			},
			validation: {},
			value: "fastest",
			valid: true,
		},
	});

	const orderHandler = (event) => {
		event.preventDefault();

		const formData = {};

		for (const formElementIdentifier in orderForm) {
			formData[formElementIdentifier] =
				orderForm[formElementIdentifier].value;
		}

		const data = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId,
		};

		props.onOrderBurger(data, props.token);
	};

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(
				event.target.value,
				orderForm[inputIdentifier].validation
			),
			touched: true,
		});
		const updatedOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updatedFormElement,
		});

		let formIsValid = true;
		for (const inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	};

	const formElementsArray = [];

	for (const key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key],
		});
	}

	let form = (
		<form>
			{formElementsArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) =>
							inputChangedHandler(event, formElement.id)
						}
					/>
				);
			})}
			<Button
				btnType="Success"
				disabled={!formIsValid}
				clicked={orderHandler}
			>
				ORDER
			</Button>
		</form>
	);
	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className="ContactData">
			<h4>Enter data</h4>
			{form}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
