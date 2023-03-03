import { useProducts } from "main";
import {
	SColumn,
	HomeComponentsRow,
	HomeComponentsTitle,
	SHomeComponentsContainer,
	SCardsConteiner,
} from "presentation";
import { useEffect, useState } from "react";
import { IProduct } from "types";

export const ProductsContainer = (): JSX.Element => {
	const { products, currentProduct, getAllProducts, getProductByCategory } =
		useProducts();

	const [selector, setSelector] = useState<boolean>(true);

	useEffect(() => {
		if (selector) {
			getAllProducts();
		} else {
			getProductByCategory("test");
		}
	}, [selector]);

	return (
		<SHomeComponentsContainer>
			<SColumn>
				<HomeComponentsTitle
					onClick={() => {
						setSelector(!selector);
					}}
				>
					Produtos
				</HomeComponentsTitle>
				<HomeComponentsRow type="overflow">
					{products ? (
						products.map((product: IProduct, key: number) => (
							<SCardsConteiner key={key}>
								<h1>{product.name}</h1>
								<h6>{product.category}</h6>
								<p>{product.description}</p>
								<span>{product.price}</span>
							</SCardsConteiner>
							// <Card
							// 	key={key}
							// 	product={product}
							// 	currentKey={key}
							// />
						))
					) : (
						<></>
					)}
				</HomeComponentsRow>
			</SColumn>
		</SHomeComponentsContainer>
	);
};
