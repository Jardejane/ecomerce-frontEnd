// import { theme } from "presentation";
import styled, { css, Interpolation } from "styled-components/macro";

export interface IHomeComponentsContainer {
	scroll?: "side" | "down";
}

export interface IHomeComponentsRow {
	type?: "overflow" | "mini";
	align?: "start" | "center";
}

export const SHomeComponentsContainer = styled.div<IHomeComponentsContainer>`
	box-shadow: inset 0 0 0.25rem 0.5rem #00000022;
	width: 100%;
	min-height: 50vh;
	padding: 2rem;
	border-radius: 8px;
	margin-bottom: 1rem;

	${({ scroll }): Interpolation<IHomeComponentsContainer> => {
		switch (scroll) {
			case "side":
				return (
					scroll &&
					css`
						display: flex;
						overflow-x: hidden;
						flex-direction: column;
						justify-content: space-around;
						align-items: flex-start;
					`
				);
			case "down":
				break;

			default:
				return css`
					display: flex;
				`;
		}
	}}
`;

export const HomeComponentsTitle = styled.h2`
	font-size: 20px;
	margin-bottom: 10px;
`;

export const HomeComponentsRow = styled.div<IHomeComponentsRow>`
	height: calc(100% - 30px);
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	justify-content: flex-start;
	padding-bottom: 2rem;

	${({ type, align }): Interpolation<IHomeComponentsRow> => {
		switch (type) {
			case "mini":
				return css`
					flex-wrap: wrap;
					}
				`;

			case "overflow":
				return css`
					${align === "start" &&
					css`
						justify-content: flex-start;
					`}
					${align === "center" &&
					css`
						justify-content: space-between;
					`}
					overflow-x: auto;
					&::-webkit-scrollbar-track {
						background-color: #3333cc;
					}
					&::-webkit-scrollbar {
						width: 0.8vw;
						background: #3333cc;
					}
					&::-webkit-scrollbar-thumb {
						background: #5353ec;
						box-shadow: 0 0 3rem 0 #3333cc,
							inset 0 0 1.8rem 0.5rem #ffffff33;
						border-radius: 20px;
					}
				`;

			default:
				return css`
					flex-wrap: wrap;
				`;
		}
	}}
	overflow-x: auto;

	&::-webkit-scrollbar-track {
		background-color: #3333cc;
	}
	&::-webkit-scrollbar {
		height: 1vh;
		background: #5353ec;
	}
	&::-webkit-scrollbar-thumb {
		background: #5353ec;
		box-shadow: 0 0 3rem 0 #3333cc, inset 0 0 1.8rem 0.5rem #3333cc33;
		border-radius: 20px;
	}
`;

export const ArrowBack = styled.div`
	font-size: 40px;
	border: solid 1px #fff;
	border: none;
	cursor: pointer;
`;

export const ArrowFoward = styled.div`
	font-size: 40px;
	border: solid 1px #fff;
	border: none;
	cursor: pointer;
`;
