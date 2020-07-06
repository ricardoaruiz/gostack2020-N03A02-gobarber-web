import React from 'react';

import { AuthContextProvider } from './context/authContext';
import Signin from './pages/Signin';
import GlobalStyles from './styles/global';
import { ToastContextProvider } from './context/toastContext';

const App: React.FC = () => (
  <>
    <ToastContextProvider>
      <AuthContextProvider>
        <Signin />
      </AuthContextProvider>
    </ToastContextProvider>
    <GlobalStyles />
  </>
);

export default App;
