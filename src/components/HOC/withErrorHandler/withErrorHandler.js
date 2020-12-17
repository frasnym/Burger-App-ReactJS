import React, { Component } from "react";

import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		errorConfirmHandler = () => {
			this.setState({ error: null });
		};

		render() {
			axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({ error: error });
				}
			);

			return (
				<>
					<Modal
						show={this.state.error}
						modalClose={this.errorConfirmHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};

export default withErrorHandler;