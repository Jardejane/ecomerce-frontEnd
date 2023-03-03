/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	SBackgroundForm,
	SSubmitButtom,
	SContainerVerification,
	SVerificationResponse,
	error,
} from "presentation";
import { useEffect } from "react";
import { Input, isPw } from "presentation";
import { useUser } from "main";
import { IUser } from "types";

export const UpdateUser = (): JSX.Element => {
	const {
		user,
		valueName,
		valueEmail,
		valuePassword,
		setValuePassword,
		setValueEmail,
		setValueName,
		validPasswordLength,
		validPasswordCharacters,
		setValidPasswordCharacters,
		setValidPasswordLength,
		updateUser,
		deleteUser,
		getUsers,
	} = useUser();

	useEffect(() => {
		setValidPasswordCharacters(isPw.test(valuePassword));
		setValidPasswordLength(valuePassword.length > 7);
	}, [valuePassword]);

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<SBackgroundForm active={true}>
			<h1>Update User</h1>
			<form name="Gate">
				<div>
					<Input
						label="Email"
						placeholder="mail@email.com"
						type="email"
						value={setValueEmail}
					/>
					<Input
						label="Name"
						placeholder="username"
						type="text"
						value={setValueName}
					/>
					<Input
						label="Password"
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
						if (user) {
							const data: IUser = {};
							if (valueName) {
								data.username = valueName;
							}
							if (valueEmail) {
								data.email = valueEmail;
							}
							if (valuePassword) {
								data.password = valuePassword;
							}
							updateUser(data, user._id);
						} else {
							error("Login again before to change your data");
						}
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					Update
				</SSubmitButtom>
			</form>
			<SSubmitButtom
				onClick={(e: any): void => {
					if (user) deleteUser(user._id);
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				Delete User
			</SSubmitButtom>
		</SBackgroundForm>
	);
};
