import React from "react";

import Modal from "../../UI/Modal/Modal";
import useHttpErrorHandler from "../../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [error, errorConfirmHandler] = useHttpErrorHandler(axios);

		return (
			<>
				<Modal show={error} modalClose={errorConfirmHandler}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export default withErrorHandler;
