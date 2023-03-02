import { AllProvidersProps, IProduct, ProductsProviderData } from "types";
import { createContext, useContext, useState } from "react";
import { Api, useAuth } from "main";
import { error, success } from "presentation";

const ProductsContext = createContext<ProductsProviderData>(
	{} as ProductsProviderData,
);

export const ProductsProvider = ({
	children,
}: AllProvidersProps): JSX.Element => {
	const { logged, token } = useAuth();
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

	const createProduct = ({
		name,
		price,
		category,
		description,
	}: IProduct) => {
		if (logged && name && price && category && description) {
			const data = { name, price, category, description };
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			Api.post(`/story/products/create`, data, headers)
				.then((): void => {
					success("Registrated");
				})
				.catch(err => {
					error(err);
				});
		} else {
			error("Invalid data");
		}
	};

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
