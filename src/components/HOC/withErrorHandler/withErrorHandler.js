import React, { Component } from "react";

import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentWillUnmount() {
			console.log(
				"componentWillUnmount",
				this.reqInterceptor,
				this.resInterceptor
			);
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmHandler = () => {
			this.setState({ error: null });
		};

		render() {
			this.reqInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
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
