import React from 'react';

import GlobalStyles from './styles/global';
import Signin from './pages/Signin';

import { AuthContextProvider } from './context/authContext';

const App: React.FC = () => (
  <>
    <AuthContextProvider>
      <Signin />
    </AuthContextProvider>
    <GlobalStyles />
  </>
);

export default App;
