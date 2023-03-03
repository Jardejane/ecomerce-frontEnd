import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	Input,
	SLogoContainer,
	SMenuContainer,
	SMenuContent,
	SMenuOptions,
	SContentSeach,
} from "presentation";
import { useAuth, useProducts } from "main";
import { ERoutePath, IProduct, MenuProps } from "types";

export const UpperTab = ({ path }: MenuProps): JSX.Element => {
	const navigate: NavigateFunction = useNavigate();

	const { logout } = useAuth();
	const { getProductById, products, getAllProducts, modal, setModal } = useProducts();
	const [allProductsSwitch, setAllProductsSwitch] = useState<IProduct[]>([]);
	const [active, setActive] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search.length > 0) {
			setAllProductsSwitch(products);
		} else {
			setAllProductsSwitch([]);
		}
	}, [search]);

	return (
		<SMenuContainer>
			<SMenuContent>
				<SLogoContainer></SLogoContainer>
				{Boolean(path === "/") && (
					<SContentSeach>
						<Input
							label="search"
							type="text"
							placeholder="Pesquisa"
							value={setSearch}
						/>
						{allProductsSwitch
							.filter((e: IProduct) =>
								e.name
									.toLowerCase()
									.includes(search.toLowerCase()),
							)
							.map((e: IProduct, i: number) => {
								return (
									<span
										key={i}
										onClick={(): void => {
											if (e._id) {
												getProductById(e._id);
												setModal(!modal);
											}
											// setTimeout(
											// 	() => navigate(`/game/${e.id}`),
											// 	2000,
											// );
										}}
									>
										{e.name}
									</span>
								);
							})}
					</SContentSeach>
				)}
				<div
					onClick={() => {
						setActive(!active);
					}}
				>
					menu
				</div>
				{active ? (
					<SMenuOptions active={active}>
						<li
							onClick={(): void => {
								navigate(ERoutePath.HOME);
								getAllProducts();
								setActive(!active);
							}}
						>
							Home
						</li>
						<li
							onClick={(): void => {
								navigate(ERoutePath.SETTINGS);
								setActive(!active);
							}}
						>
							Settings
						</li>
						<li
							onClick={(): void => {
								logout();
								setActive(!active);
							}}
						>
							Logout
						</li>
					</SMenuOptions>
				) : (
					<></>
				)}
			</SMenuContent>
		</SMenuContainer>
	);
};
