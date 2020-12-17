import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-burger-app-8fca6-default-rtdb.firebaseio.com",
});

export default instance;
