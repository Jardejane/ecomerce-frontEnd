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

const data: IProduct[] = [
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

export const ProductsContainer = (): JSX.Element => {
	const { allProducts, genresProducts } = useProducts();

	const [data, setData] = useState<IProduct[]>(allProducts);
	const [selector, setSelector] = useState<boolean>(true);

	useEffect(() => {
		if (selector) {
			setData(allProducts);
		} else {
			setData(genresProducts);
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
					{data ? (
						data.map((product: IProduct, key: number) => (
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
