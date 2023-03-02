import { ReactNode } from "react";
import { AuthResponse, IProduct } from "types";

export interface AllProvidersProps {
	children: ReactNode;
}

export interface AuthProviderData {
	logged: boolean;
	login: (params: AuthResponse) => void;
	logout: () => void;
}

export interface ProductsProviderData {
	allProducts: IProduct[];
	genresProducts: IProduct[];
}
