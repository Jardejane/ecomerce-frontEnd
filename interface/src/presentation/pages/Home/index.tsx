import { SHome, ProductsContainer, theme, UpperTab } from "presentation";
import { ERoutePath } from "types";

export const Home = () => {
	return (
		<SHome theme={theme}>
			<UpperTab path={ERoutePath.HOME} />
			<ProductsContainer />
		</SHome>
	);
};
