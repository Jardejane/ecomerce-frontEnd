import { SHome, theme, UpdateUser, UpperTab } from "presentation";
import { CreateProduct } from "presentation/components/CreateProduct";
import { useState } from "react";
import { ERoutePath } from "types";

export const Settings = (): JSX.Element => {
	const [select, setSelect] = useState(false);
	return (
		<SHome theme={theme}>
			<UpperTab path={ERoutePath.SETTINGS} />
			{!select && <UpdateUser />}
			{select && <CreateProduct />}
			<div
				className="selector"
				onClick={(): void => {
					setSelect(!select);
				}}
			>
				{select ? "UPDATE USER" : "CREATE NEW PRODUCT"}
			</div>
		</SHome>
	);
};
