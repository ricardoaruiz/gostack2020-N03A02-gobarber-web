import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContextProvider from './context/appContextProvider';
import Routes from './routes';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <AppContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppContextProvider>
    <GlobalStyles />
  </>
);

export default App;
