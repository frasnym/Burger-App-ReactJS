import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signout } from "../../../store/actions/actions";

class SignOut extends Component {
	componentDidMount() {
		this.props.onSignout();
	}

	render() {
		return <Redirect to="/" />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSignout: () => dispatch(signout()),
	};
};

export default connect(null, mapDispatchToProps)(SignOut);
