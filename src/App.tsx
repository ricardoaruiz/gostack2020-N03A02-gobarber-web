import React from 'react';

import Signin from './pages/Signin';
import GlobalStyles from './styles/global';
import AppContextProvider from './context/appContextProvider';

const App: React.FC = () => (
  <>
    <AppContextProvider>
      <Signin />
    </AppContextProvider>
    <GlobalStyles />
  </>
);

export default App;
