import { useEffect, useState } from "react";

const HttpClient = (httpClient) => {
	const [error, setError] = useState(null);

	const reqInterceptor = httpClient.interceptors.request.use((req) => {
		setError(null);
		return req;
	});
	const resInterceptor = httpClient.interceptors.response.use(
		(res) => res,
		(err) => {
			setError(err);
		}
	);

	useEffect(() => {
		return () => {
			httpClient.interceptors.request.eject(reqInterceptor);
			httpClient.interceptors.response.eject(resInterceptor);
		};
	}, [
		httpClient.interceptors.request,
		httpClient.interceptors.response,
		reqInterceptor,
		resInterceptor,
	]);

	const errorConfirmHandler = () => {
		setError(null);
	};

	return [error, errorConfirmHandler];
};
export default HttpClient;
