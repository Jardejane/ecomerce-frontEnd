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
	SHomeComponentsSelectors,
} from "presentation";
import { useState } from "react";
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
		modal,
		setModal,
		categories,
	} = useProducts();

	const [editing, setEditing] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [image, setImage] = useState<string>("");

	return (
		<>
			<SHomeComponentsContainer>
				<SColumn>
					<SHomeComponentsSelectors>
						<SHomeComponentsTitle
							onClick={(): void => {
								getAllProducts();
							}}
						>
							All
						</SHomeComponentsTitle>
						{categories.map((e: string, i: number) => {
							return (
								<SHomeComponentsTitle
									key={i}
									onClick={(): void => {
										getProductByCategory(e);
									}}
								>
									{e}
								</SHomeComponentsTitle>
							);
						})}
					</SHomeComponentsSelectors>
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
									<img
										alt={product.name}
										src={product.image}
									></img>
									<h1 className="mini">{product.name}</h1>
									<h6 className="mini">{product.category}</h6>
									<p className="mini">
										{product.description}
									</p>
									<span className="mini">
										{product.price.toFixed(2)}
									</span>
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
								<Input
									key={currentProduct.image}
									label="Image"
									placeholder={currentProduct.image}
									type="text"
									value={setImage}
								/>
							</div>
						)}
						{!editing && (
							<>
								<img
									src={currentProduct.image}
									alt={currentProduct.name}
								/>
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
											setModal(!modal);
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
													image,
												},
												currentProduct._id,
											);
											getAllProducts();
											setModal(!modal);
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
