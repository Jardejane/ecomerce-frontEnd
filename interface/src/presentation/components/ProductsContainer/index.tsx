import { useProducts } from "main";
import {
	SColumn,
	SHomeComponentsRow,
	SHomeComponentsTitle,
	SHomeComponentsContainer,
	SCardsConteiner,
	SProductOverlay,
	error,
	Input,
} from "presentation";
import { useEffect, useState } from "react";
import { IProduct } from "types";

export const ProductsContainer = (): JSX.Element => {
	const {
		products,
		currentProduct,
		getAllProducts,
		getProductByCategory,
		getProductById,
		deleteProduct,
		updateProduct,
	} = useProducts();

	const [selector, setSelector] = useState<boolean>(true);
	const [modal, setModal] = useState<boolean>(false);
	const [editing, setEditing] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	useEffect(() => {
		if (selector) {
			getAllProducts();
		} else {
			getProductByCategory("test");
		}
	}, [selector]);

	return (
		<>
			<SHomeComponentsContainer>
				<SColumn>
					<SHomeComponentsTitle
						onClick={(): void => {
							setSelector(!selector);
						}}
					>
						Produtos
					</SHomeComponentsTitle>
					<SHomeComponentsRow type="overflow">
						{products ? (
							products.map((product: IProduct, key: number) => (
								<SCardsConteiner
									key={key}
									onClick={(): void => {
										if (product._id) {
											getProductById(product._id);
											setModal(!modal);
										}
									}}
								>
									<h1>{product.name}</h1>
									<h6>{product.category}</h6>
									<p>{product.description}</p>
									<span>{product.price.toFixed(2)}</span>
								</SCardsConteiner>
							))
						) : (
							<></>
						)}
					</SHomeComponentsRow>
				</SColumn>
			</SHomeComponentsContainer>
			{modal && (
				<SProductOverlay>
					<div className="modal">
						<div
							className="close"
							onClick={(): void => {
								setModal(!modal);
							}}
						>
							❌
						</div>
						{editing && (
							<div className="UpdateItens">
								<div>Update Product</div>
								<Input
									key={currentProduct.name}
									label="Title"
									placeholder={currentProduct.name}
									type="text"
									value={setName}
								/>
								<Input
									key={currentProduct.name}
									label="Description"
									placeholder={currentProduct.description}
									type="text"
									value={setDescription}
								/>
								<Input
									key={currentProduct.name}
									label="Price"
									placeholder={currentProduct.price
										.toFixed(2)
										.toString()}
									type="number"
									value={setPrice}
								/>
								<Input
									key={currentProduct.name}
									label="Category"
									placeholder={currentProduct.category}
									type="text"
									value={setCategory}
								/>
							</div>
						)}
						{!editing && (
							<>
								<h1 className="title">{currentProduct.name}</h1>
								<p className="description">
									{currentProduct.description}
								</p>
								<div className="footer">
									<span className="price">
										Price: <br />
										{currentProduct.price.toFixed(2)}
									</span>
									<span className="category">
										category: <br />
										{currentProduct.category}
									</span>
								</div>
							</>
						)}

						<div className="settings">
							<div
								className="update"
								onClick={(): void => {
									setEditing(!editing);
								}}
							>
								{!editing && "Update"}
								{editing && "Back"}
							</div>
							{!editing && (
								<div
									className="delete"
									onClick={(): void => {
										if (currentProduct._id) {
											deleteProduct(currentProduct._id);
											getAllProducts();
										} else {
											error("Cannot find Product");
										}
									}}
								>
									Delete
								</div>
							)}
							{editing && (
								<div
									className="delete"
									onClick={(): void => {
										if (currentProduct._id) {
											updateProduct(
												{
													name,
													description,
													price: Number(price),
													category,
												},
												currentProduct._id,
											);
											setModal(!modal);
											getAllProducts();
										} else {
											error("Cannot delete");
										}
									}}
								>
									Submit Update
								</div>
							)}
						</div>
					</div>
				</SProductOverlay>
			)}
		</>
	);
};
