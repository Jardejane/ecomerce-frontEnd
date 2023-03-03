/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled, { css } from "styled-components/macro";

export const SHome = styled.section`
	${({ theme }) => css`
		position: relative;
		background-color: ${theme.colors.baseBg1};
		width: 100vw;
		min-height: 89vh;
		color: ${theme.colors.textColor};
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 11vh;
	`}
`;
