import { ReactNode } from "react";
import { AuthResponse, IProduct, IUser, IUserApi } from "types";

export interface AllProvidersProps {
	children: ReactNode;
}

export interface AuthProviderData {
	logged: boolean;
	login: (params: AuthResponse) => void;
	logout: () => void;
	token: string;
	headers: IHeaders;
}

export interface IHeaders {
	headers: {
		Authorization: string;
	};
}

export interface UserProviderData {
	user: IUserApi | undefined;
	valueName: string;
	valueEmail: string;
	valuePassword: string;
	mode: boolean;
	validPasswordCharacters: boolean;
	validPasswordLength: boolean;
	setValueName: React.Dispatch<React.SetStateAction<string>>;
	setValueEmail: React.Dispatch<React.SetStateAction<string>>;
	setValuePassword: React.Dispatch<React.SetStateAction<string>>;
	setMode: React.Dispatch<React.SetStateAction<boolean>>;
	setValidPasswordCharacters: React.Dispatch<React.SetStateAction<boolean>>;
	setValidPasswordLength: React.Dispatch<React.SetStateAction<boolean>>;
	action: () => Promise<void>;
	getUsers: () => void;
	updateUser: (data: IUser, id: string) => void;
	deleteUser: (id: string) => void;
}

export interface ProductsProviderData {
	products: IProduct[];
	currentProduct: IProduct;
	createProduct: (data: IProduct) => void;
	updateProduct: (data: IProduct, id: string) => void;
	deleteProduct: (id: string) => void;
	getProductByCategory: (category: string) => void;
	getProductById: (id: string) => void;
	getAllProducts: () => void;
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
