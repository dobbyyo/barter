import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const whiteTheme: DefaultTheme = {
  accent: '#6400B8',
  blue: '#0a80ff',
  bgColor: '#FAFAFA',
  fontColor: 'rgb(38, 38, 38)',
  borderColor: 'rgb(219, 219, 219)',
  red: '#ff0000',
};
export const darkTheme: DefaultTheme = {
  accent: '#6400B8',
  blue: '#0a80ff',
  bgColor: '#333',
  fontColor: '#fff',
  borderColor: 'rgb(219, 219, 219)',
  red: '#ff0000',
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        color:${(props) => props.theme.fontColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
    }
    a {
      text-decoration: none;
    }
`;
