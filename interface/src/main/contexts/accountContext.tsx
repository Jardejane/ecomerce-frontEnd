import { AllProvidersProps, AuthResponse, AuthProviderData } from "types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const [logged, setLogged] = useState<boolean>(false);
	const [token, setToken] = useState<string>("");

	const login = ({ access_token }: AuthResponse): void => {
		localStorage.setItem("token", access_token);
		setLogged(true);
		setToken(access_token);
	};

	const logout = (): void => {
		localStorage.clear();
		setLogged(false);
		setToken("")
	};

	// const checkTokenExpiration = (): void => {
	// 	const token = localStorage.getItem("token");

	// 	const headers = {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	};

	// 	Api.get(`/users/${user.id}`, headers)
	// 		.then(res => {
	// 			const data = res.data;
	// 			setLogged(true);
	// 			if (token) {
	// 				setCurrentUser({
	// 					token,
	// 					user: data,
	// 				});
	// 				localStorage.setItem("user", JSON.stringify(data));
	// 			}
	// 		})
	// 		.catch(() => {
	// 			logout();
	// 		});
	// };

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) setLogged(true);
		// if (token) checkTokenExpiration();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				logged,
				login,
				logout,
				token
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthProviderData => useContext(AuthContext);
