/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	AllProvidersProps,
	EUserEndpoints,
	IUser,
	IUserApi,
	UserProviderData,
} from "types";
import { createContext, useContext, useState } from "react";
import {
	error,
	success,
	validateEmail,
	validateName,
	validatePassword,
} from "presentation";
import { Api, useAuth } from "main";

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const { login, headers, logged } = useAuth();

	const [users, setUsers] = useState<IUserApi[]>([]);
	const [user, setUser] = useState<IUserApi | undefined>();

	const [valueName, setValueName] = useState("");
	const [valueEmail, setValueEmail] = useState("");
	const [valuePassword, setValuePassword] = useState("");
	const [mode, setMode] = useState(true);

	const [validPasswordCharacters, setValidPasswordCharacters] =
		useState(false);
	const [validPasswordLength, setValidPasswordLength] = useState(false);

	const action = async (): Promise<void> => {
		const isValidName = validateName(valueName);
		const isValidPassword = validatePassword(valuePassword);
		if (isValidName && isValidPassword) {
			const data: IUser = {
				username: valueName,
				password: valuePassword,
			};
			switch (mode) {
				case false:
					const isValidEmail = validateEmail(valueEmail);
					if (isValidEmail) {
						data.email = valueEmail;
						data.roles = ["user"];
						const register = await Api.post(
							`/auth/register`,
							data,
						).then((res: any) => res);
						switch (register.status) {
							case 201:
								delete data.email;
								delete data.roles;
								console.log(data);
								const loginAfterRegister = await Api.post(
									`/auth/login`,
									data,
								).then((res: any) => res);
								switch (loginAfterRegister.status) {
									case 201:
										login(loginAfterRegister.data);
										break;

									default:
										error("couldn't login after register");
										break;
								}
								break;

							default:
								error("couldn't register");
								break;
						}
					}
					break;

				case true:
					try {
						const sigin = await Api.post(`/auth/login`, data).then(
							(res: any) => res,
						);
						switch (sigin.status) {
							case 201:
								login(sigin.data);
								break;

							default:
								error("Try again with correct credentials");
								break;
						}
					} catch (err) {
						error("Try again with correct credentials");
					}
					break;
			}
		}
	};

	const getUsers = (): void => {
		Api.get(EUserEndpoints.BASE, headers)
			.then(res => setUsers(res.data))
			.catch(err => {
				error(err);
			});
		setUser(users.find(e => e.username === valueName));
	};

	const updateUser = (data: IUser, id: string): void => {
		if (logged) {
			Api.put(EUserEndpoints.BASE + "/" + id, data, headers)
				.then((): void => {
					success("Updated");
				})
				.catch(err => {
					error(err);
				});
		} else {
			error("Invalid data");
		}
	};

	const deleteUser = (id: string): void => {
		Api.delete(EUserEndpoints.BASE + "/" + id, headers)
			.then((): void => {
				success("Deleted");
			})
			.catch(err => {
				error(err);
			});
	};

	return (
		<UserContext.Provider
			value={{
				user,
				valueName,
				valueEmail,
				valuePassword,
				mode,
				validPasswordCharacters,
				validPasswordLength,
				setValueName,
				setValueEmail,
				setValuePassword,
				setMode,
				setValidPasswordCharacters,
				setValidPasswordLength,
				action,
				getUsers,
				updateUser,
				deleteUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserProviderData => useContext(UserContext);
