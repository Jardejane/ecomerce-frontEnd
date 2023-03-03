import axios from "axios";

export const Api = axios.create({
	baseURL: "https://ecommerce-backend-production-d395.up.railway.app",
});
