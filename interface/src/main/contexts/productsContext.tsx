import { AllProvidersProps, IProduct, ProductsProviderData } from "types";
import { createContext, useContext, useState } from "react";
import { Api, useAuth } from "main";
import { error, success } from "presentation";
import { EProductsEndpoints } from "types/api";

const ProductsContext = createContext<ProductsProviderData>(
	{} as ProductsProviderData,
);

export const ProductsProvider = ({
	children,
}: AllProvidersProps): JSX.Element => {
	const { logged, headers } = useAuth();
	const [modal, setModal] = useState<boolean>(false);

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

	const [products, setProducts] = useState<IProduct[]>(allProducts);
	const [currentProduct, setCurrentProduct] = useState<IProduct>(
		allProducts[0],
	);

	const createProduct = ({
		name,
		price,
		category,
		description,
	}: IProduct): void => {
		if (logged && name && price && category && description) {
			const data = { name, price, category, description };
			Api.post(EProductsEndpoints.CREATE, data, headers)
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
	const updateProduct = (
		{ name, price, category, description }: IProduct,
		id: string,
	): void => {
		if (logged) {
			const data = { name, price, category, description };
			Api.put(EProductsEndpoints.BASE + "/" + id, data, headers)
				.then((): void => {
					success("Updated(reload your page)");
				})
				.catch(err => {
					error(err);
				});
		} else {
			error("Invalid data");
		}
	};
	const deleteProduct = (id: string): void => {
		Api.delete(EProductsEndpoints.BASE + "/" + id, headers)
			.then((): void => {
				success("Deleted");
			})
			.catch(err => {
				error(err);
			});
	};

	const getAllProducts = (): void => {
		Api.get(EProductsEndpoints.BASE, headers)
			.then(res => setProducts(res.data))
			.catch(err => {
				error(err);
			});
	};
	const getProductById = (id: string): void => {
		Api.get(EProductsEndpoints.BASE + "/" + id, headers)
			.then(res => setCurrentProduct(res.data))
			.catch(err => {
				error(err);
			});
	};
	const getProductByCategory = (category: string): void => {
		Api.get(EProductsEndpoints.GETBYCAT + "/" + category, headers)
			.then(res => setProducts(res.data))
			.catch(err => {
				error(err);
			});
	};

	return (
		<ProductsContext.Provider
			value={{
				products,
				currentProduct,
				createProduct,
				updateProduct,
				deleteProduct,
				getProductByCategory,
				getProductById,
				getAllProducts,
				modal,
				setModal,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProducts = (): ProductsProviderData =>
	useContext(ProductsContext);
