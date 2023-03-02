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
`;

export const SCardsConteiner = styled.div`
	display: flex;
	flex-wrap: wrap;
	border: solid 1px;
`;
