import {
	AllProvidersProps,
	AuthResponse,
	AuthProviderData,
	IHeaders,
} from "types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const [logged, setLogged] = useState<boolean>(false);
	const [token, setToken] = useState<string>("");
	const [headers, setHeaders] = useState<IHeaders>({
		headers: {
			Authorization: `Bearer string`,
		},
	});

	const setHeader = (access_token: string): void => {
		const header = {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		};
		setHeaders(header);
	};

	const login = ({ access_token }: AuthResponse): void => {
		localStorage.setItem("token", access_token);
		setLogged(true);
		setToken(access_token);
		setHeader(access_token);
	};

	const logout = (): void => {
		localStorage.clear();
		setLogged(false);
		setToken("");
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
		const currentToken = localStorage.getItem("token");
		if (currentToken) {
			setLogged(true), setHeader(currentToken);
		}
		// if (token) checkTokenExpiration();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				logged,
				login,
				logout,
				token,
				headers,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthProviderData => useContext(AuthContext);
