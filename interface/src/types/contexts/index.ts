import { ReactNode } from "react";
import { AuthResponse } from "types";

export interface AllProvidersProps {
	children: ReactNode;
}

export interface AuthProviderData {
	logged: boolean;
	login: (params: AuthResponse) => void;
	logout: () => void;
}