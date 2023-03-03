import { theme } from "presentation/styles/theme";
import styled from "styled-components/macro";

export const SRow = styled.div`
	height: calc(100% - 30px);
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
`;

export const SColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const SCardsConteiner = styled.div`
	display: flex;
	width: 50rem;
	height: 30rem;
	font-size: 2rem;
	background-color: ${theme.colors.baseBg2}99;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	border-radius: 2rem;
	box-shadow: inset 0 0 2rem 0.5rem ${theme.colors.secondaryColor},
		0 0 1.5rem 0rem ${theme.colors.secondaryColor};
	cursor: pointer;
`;

export const SProductOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${theme.colors.baseBg1}99;

	.title,
	.description,
	.category {
		word-wrap: break-word;
		max-width: 90%;
		text-align: center;
	}
	.modal {
		height: 80rem;
		width: 70rem;
		border-radius: 3rem;
		box-shadow: 0 0 3rem 0 ${theme.colors.secondaryColor}77,
			inset 0 0 2rem 1rem ${theme.colors.secondaryColor}cc;
		background: ${theme.colors.baseBg2}dd;
		font-size: 5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		gap: 3rem;
	}
	.modal > div {
		width: 90%;
		height: 9rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.modal > .close {
		height: 7rem;
		width: 7rem;
		align-self: flex-end;
		margin: 0 5rem;
		cursor: pointer;
	}

	.category {
		font-size: 0.5em;
	}
	.modal > .settings {
		justify-content: space-between;
		border-radius: 3rem;
		box-shadow: 0 0 1rem 0.5rem ${theme.colors.primaryColor}33,
			inset 0 0 1rem 0.5rem ${theme.colors.primaryColor}77;
	}
	.modal > .settings > div {
		height: 100%;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 0.8em;
		cursor: pointer;
	}
	.modal > .settings > .delete {
		border-radius: 0 3rem 3rem 0;
		box-shadow: 0 0 1rem 0.5rem ${theme.colors.secondaryColor}33,
			inset 0 0 1rem 0.5rem ${theme.colors.secondaryColor}77;
	}
	.modal > .settings > .update {
		border-radius: 3rem 0 0 3rem;
		box-shadow: 0 0 1rem 0.5rem ${theme.colors.primaryColor}33,
			inset 0 0 1rem 0.5rem ${theme.colors.primaryColor}77;
	}
	.modal > .settings > .delete:hover {
		background: ${theme.colors.secondaryColor}77;
	}
	.modal > .settings > .update:hover {
		background: ${theme.colors.primaryColor}77;
	}
`;
