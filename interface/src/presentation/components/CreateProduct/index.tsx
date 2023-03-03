import { useProducts } from "main";
import { Input, SProductOverlay } from "presentation";
import { useState } from "react";

export const CreateProduct = (): JSX.Element => {
	const { createProduct } = useProducts();
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	return (
		<SProductOverlay>
			<div className="modal">
				<div className="UpdateItens">
					<div>Update Product</div>
					<Input
						key={"1"}
						label="Title"
						placeholder="Product Name"
						type="text"
						value={setName}
					/>
					<Input
						key={"1"}
						label="Description"
						placeholder="Product Description"
						type="text"
						value={setDescription}
					/>
					<Input
						key={"1"}
						label="Price"
						placeholder="Product Price"
						type="number"
						value={setPrice}
					/>
					<Input
						key={"1"}
						label="Category"
						placeholder="Product Category"
						type="text"
						value={setCategory}
					/>
				</div>

				<div className="settings">
					<div
						className="create"
						onClick={(): void => {
							createProduct({
								name,
								description,
								category,
								price: Number(price),
							});
						}}
					>
						New Product
					</div>
				</div>
			</div>
		</SProductOverlay>
	);
};
