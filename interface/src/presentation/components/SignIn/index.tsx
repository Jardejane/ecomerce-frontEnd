import {
	SBackgroundForm,
	SSubmitButtom,
	SSwicherContainer,
	SSwicherButtom,
	SContainerVerification,
	SVerificationResponse,
} from "presentation";
import { useEffect, useState } from "react";
import {
	error,
	Input,
	isPw,
	validateEmail,
	validateName,
	validatePassword,
} from "presentation";
import { Api, useAuth } from "main";
import { IUser } from "types";

export const SigIn = (): JSX.Element => {
	const { login } = useAuth();

	const [mode, setMode] = useState(true);
	const [valueName, setValueName] = useState("");
	const [valueEmail, setValueEmail] = useState("");
	const [valuePassword, setValuePassword] = useState("");
	const [validPasswordCharacters, setValidPasswordCharacters] =
		useState(false);
	const [validPasswordLength, setValidPasswordLength] = useState(false);

	const action = async (): Promise<void> => {
		const isValidEmail = validateEmail(valueEmail);
		const isValidPassword = validatePassword(valuePassword);

		if (isValidEmail && isValidPassword) {
			const data: IUser = {
				username: valueName,
				email: valueEmail,
				password: valuePassword,
				roles: ["user"],
			};

			switch (mode) {
				case false:
					const isValidName = validateName(valueName);
					if (isValidName) {
						data.username = valueName;
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
							case 200:
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

	useEffect(() => {
		setValidPasswordCharacters(isPw.test(valuePassword));
		setValidPasswordLength(valuePassword.length > 7);
	}, [valuePassword]);

	return (
		<SBackgroundForm>
			<h1>{!mode ? `Register` : `SignIn`}</h1>
			<form name="Gate">
				<div>
					{!mode && (
						<>
							<Input
								label="name"
								placeholder="User Name"
								type="text"
								value={setValueName}
							/>
						</>
					)}
					<Input
						label="email"
						placeholder="username2022@email.com"
						type="email"
						value={setValueEmail}
					/>
					<Input
						label="password"
						placeholder="********"
						type="password"
						value={setValuePassword}
					/>
					<SContainerVerification>
						<SVerificationResponse>
							{validPasswordLength ? "✅" : "⛔️"} 8 characters
						</SVerificationResponse>
						<SVerificationResponse>
							{validPasswordCharacters ? "✅" : "⛔️"} Uppercase |
							Lowercase | Symbol | Number
						</SVerificationResponse>
					</SContainerVerification>
				</div>
				<SSubmitButtom
					onClick={(e: any): void => {
						action();
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					{!mode ? `Register` : `SignIn`}
				</SSubmitButtom>
			</form>
			<SSwicherContainer>
				<p>
					{mode
						? `Don't have an account?`
						: `Alread have an account?`}
				</p>

				<SSwicherButtom
					onClick={(): void => {
						setMode(!mode);
					}}
				>
					{mode ? `Register` : `SignIn`}
				</SSwicherButtom>
			</SSwicherContainer>
		</SBackgroundForm>
	);
};