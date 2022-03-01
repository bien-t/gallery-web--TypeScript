import { createGlobalStyle } from "styled-components";
import normalize from 'normalize.css'
import {colors} from './Variables'

const GlobalStyle = createGlobalStyle`
    ${normalize}
    @font-face {
      font-family: 'Athiti';
      font-style: normal;
      font-weight: 300;
      font-display: fallback;
      src: url(https://fonts.gstatic.com/s/athiti/v5/pe0sMISdLIZIv1wAoDBCEfe_O98.woff2) format('woff2');
      unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

      html {
        box-sizing: border-box;
        font-size: 62.5%;
        
      }
      body {
        font-size: 1.6rem;
        font-family: 'Athiti', sans-serif;
        background-color:${colors.backgroundMain};                    
        color:${colors.fontMain};
      }

      #root {
        height:100vh;
      }
`
export default GlobalStyle