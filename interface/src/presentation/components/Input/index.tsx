import { Blind, Values } from "presentation";
import { useState } from "react";

interface InputType {
	label: string;
	type: string;
	placeholder: string;
	value: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({
	label,
	type,
	value,
	placeholder,
}: InputType): JSX.Element => {
	const [blind, setBlind] = useState<boolean>(true);

	switch (type) {
		case "password":
			return (
				<Values>
					<label htmlFor={label}>{label}</label>
					<input
						id={`${label}_${type}_input`}
						name={label}
						title={`Choose ${label}`}
						placeholder={placeholder}
						type={blind ? `password` : `text`}
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						onChange={(e): void => {
							e.stopPropagation();
							value(e.target.value);
						}}
					/>
					<Blind
						id="blind"
						onClick={(): void => setBlind(!blind)}
					>
						{blind ? `🔒` : `🔓`}
					</Blind>
				</Values>
			);
		default:
			return (
				<Values>
					<label htmlFor={label}>{label}</label>
					<input
						id={`${label}_${type}_input`}
						name={label}
						title={`Choose ${label}`}
						placeholder={placeholder}
						type={type}
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
						onChange={(e): void => {
							e.stopPropagation();
							value(e.target.value);
						}}
					/>
				</Values>
			);
	}
};
