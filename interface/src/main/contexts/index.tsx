import { BrowserRouter } from "react-router-dom";
import { AllProvidersProps } from "types";
import { AuthProvider } from "./accountContext";
import { ProductsProvider } from "./productsContext";

export * from "./accountContext";
export * from "./productsContext";

export const Providers = ({ children }: AllProvidersProps): JSX.Element => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProductsProvider>{children}</ProductsProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
