import React from 'react';

import GlobalStyles from './styles/global';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';

const App: React.FC = () => (
  <>
    <Signin />
    <SignUp />
    <GlobalStyles />
  </>
);

export default App;
