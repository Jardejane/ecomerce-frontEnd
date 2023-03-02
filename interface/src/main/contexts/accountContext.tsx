import { AllProvidersProps, AuthResponse, AuthProviderData } from "types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const [logged, setLogged] = useState<boolean>(false);

	const login = ({ access_token }: AuthResponse): void => {
		localStorage.setItem("token", access_token);
		setLogged(true);
	};

	const logout = (): void => {
		localStorage.clear();
		setLogged(false);
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

	return (
		<AuthContext.Provider
			value={{
				logged,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthProviderData => useContext(AuthContext);
