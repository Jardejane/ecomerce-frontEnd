import { AllProvidersProps, IProduct, ProductsProviderData } from "types";
import { createContext, useContext, useState } from "react";

const ProductsContext = createContext<ProductsProviderData>(
	{} as ProductsProviderData,
);

export const ProductsProvider = ({
	children,
}: AllProvidersProps): JSX.Element => {
	const allProducts: IProduct[] = [
		{
			name: "Best",
			description: "the best product",
			price: 10.5,
			category: "new",
		},
		{
			name: "Not Too  Best",
			description: "the not so best product",
			price: 5.25,
			category: "usual",
		},
	];
	const genresProducts: IProduct[] = [
		{
			name: "Best genre",
			description: "the best product",
			price: 10.5,
			category: "new",
		},
		{
			name: "Not Too Best genre",
			description: "the not so best product",
			price: 5.25,
			category: "usual",
		},
	];

	// useEffect(() => {
	// }, []);

	return (
		<ProductsContext.Provider value={{ allProducts, genresProducts }}>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProducts = (): ProductsProviderData =>
	useContext(ProductsContext);
