import { ReactNode } from "react";
import { AuthResponse, IProduct } from "types";

export interface AllProvidersProps {
	children: ReactNode;
}

export interface AuthProviderData {
	logged: boolean;
	login: (params: AuthResponse) => void;
	logout: () => void;
	token: string;
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
}
