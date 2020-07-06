import React from 'react';

import ToastContainer from './components/ToastContainer';
import { AuthContextProvider } from './context/authContext';
import Signin from './pages/Signin';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <AuthContextProvider>
      <Signin />
    </AuthContextProvider>
    <ToastContainer />
    <GlobalStyles />
  </>
);

export default App;
