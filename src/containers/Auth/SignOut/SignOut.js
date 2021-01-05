import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signout } from "../../../store/actions/actions";

const SignOut = (props) => {
	const { onSignout } = props;

	useEffect(() => {
		onSignout();
	}, [onSignout]);

	return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSignout: () => dispatch(signout()),
	};
};

export default connect(null, mapDispatchToProps)(SignOut);
