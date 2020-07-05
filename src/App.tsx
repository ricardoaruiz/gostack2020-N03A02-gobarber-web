import React from 'react';

import GlobalStyles from './styles/global';
import Signin from './pages/Signin';

import AuthContext from './context/authContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Ricardo' }}>
      <Signin />
    </AuthContext.Provider>
    <GlobalStyles />
  </>
);

export default App;
