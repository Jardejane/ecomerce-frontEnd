import { BrowserRouter } from "react-router-dom";
import { AllProvidersProps } from "types";
import { AuthProvider } from "./accountContext";

export * from "./accountContext";

export const Providers = ({ children }: AllProvidersProps): JSX.Element => {
	return (
		<BrowserRouter>
			<AuthProvider>{children}</AuthProvider>
		</BrowserRouter>
	);
};
