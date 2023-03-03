import { useProducts } from "main";
import {
	CreateProduct,
	SHome,
	ProductsContainer,
	theme,
	UpperTab,
} from "presentation";
import { ERoutePath } from "types";

export const Home = (): JSX.Element => {
	const { createOn } = useProducts();
	return (
		<SHome theme={theme}>
			<UpperTab path={ERoutePath.HOME} />
			<ProductsContainer />
			{createOn && <CreateProduct />}
		</SHome>
	);
};
