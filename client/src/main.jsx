import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom'
import * as ReactDOM from 'react-dom/client'
import App from './App';
import theme from './theme';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// 3. Pass the `theme` prop to the `ChakraProvider`

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
    </PersistGate>      
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)