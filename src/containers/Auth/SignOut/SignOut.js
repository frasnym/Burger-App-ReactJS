import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signout } from "../../../store/actions/actions";

const SignOut = (props) => {
	useEffect(() => {
		props.onSignout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSignout: () => dispatch(signout()),
	};
};

export default connect(null, mapDispatchToProps)(SignOut);
