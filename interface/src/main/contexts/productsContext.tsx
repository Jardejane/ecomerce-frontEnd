import { AllProvidersProps, IProduct, ProductsProviderData } from "types";
import { createContext, useContext, useEffect, useState } from "react";
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
	const [createOn, setCreateOn] = useState(false);
	const allProducts: IProduct[] = [
		{
			name: "Best",
			description: "the best product",
			price: 10.5,
			category: "new",
			image: "",
		},
		{
			name: "Not Too  Best",
			description: "the not so best product",
			price: 5.25,
			category: "usual",
			image: "",
		},
	];

	const [products, setProducts] = useState<IProduct[]>(allProducts);
	const [categories, setCategories] = useState<string[]>([]);
	const [currentProduct, setCurrentProduct] = useState<IProduct>(
		allProducts[0],
	);

	const createProduct = ({
		name,
		price,
		category,
		description,
		image,
	}: IProduct): void => {
		if (logged && name && price && category && description && image) {
			const data = { name, price, category, description, image };
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
		{ name, price, category, description, image }: IProduct,
		id: string,
	): void => {
		if (logged) {
			const data = { name, price, category, description, image };
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

	const getAllCategories = (): void => {
		const c = products.map(({ category }) => {
			return category;
		});
		const cat = c.filter((e, i, a) => {
			return i === a.indexOf(e);
		});
		setCategories(cat);
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

	useEffect((): void => {
		getAllProducts();
	}, []);

	useEffect((): void => {
		getAllCategories();
	}, [products]);

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
				categories,
				modal,
				setModal,
				createOn,
				setCreateOn,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProducts = (): ProductsProviderData =>
	useContext(ProductsContext);
