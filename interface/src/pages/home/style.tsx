import styled ,{ css} from "styled-components";
import theme from "../../assets/styles/theme";

export const Home = styled.section`
${({theme}) => css `
    background-color: ${theme.colors.baseBg1};
    min-width: 100vw;
    min-height: 100vh;
    color: ${theme.colors.textColor};
    display: flex;
    justify-content: space-between;
`}
`;