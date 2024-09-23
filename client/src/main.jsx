import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom'
import * as ReactDOM from 'react-dom/client'
import App from './App';
import theme from './theme';
import { Provider } from 'react-redux'
import { store } from './redux/store';

// 3. Pass the `theme` prop to the `ChakraProvider`

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>      
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)