import { BrowserRouter } from "react-router-dom";
import { AllProvidersProps } from "types";
import { AuthProvider } from "./accountContext";
import { ProductsProvider } from "./productsContext";
import { UserProvider } from "./userContext";

export * from "./accountContext";
export * from "./productsContext";
export * from "./userContext";

export const Providers = ({ children }: AllProvidersProps): JSX.Element => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<ProductsProvider>{children}</ProductsProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
