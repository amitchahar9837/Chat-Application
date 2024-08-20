import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App';
import theme from './theme';


// 3. Pass the `theme` prop to the `ChakraProvider`

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)