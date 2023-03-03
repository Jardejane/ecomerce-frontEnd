import styled, { css } from "styled-components/macro";

export const SHome = styled.section`
	${({ theme }) => css`
		background-color: ${theme.colors.baseBg1};
		width: 100vw;
		min-height: 100vh;
		color: ${theme.colors.textColor};
		display: flex;
		justify-content: center;
		align-items: center;
	`}
`;
