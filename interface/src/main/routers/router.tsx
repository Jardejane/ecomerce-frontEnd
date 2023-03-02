import { useAuth } from "main";
import { Home, Login } from "presentation";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePath } from "types";

export const Router = (): JSX.Element => {
	const { logged } = useAuth();
	return (
		<Routes>
			<Route
				path={RoutePath.HOME}
				element={!logged ? <Login /> : <Home />}
			/>
			{logged && (
				<Route
					path={RoutePath.SETTINGS}
					element={<div>Settings</div>}
				/>
			)}
			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	);
};
