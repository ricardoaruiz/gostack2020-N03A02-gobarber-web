import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signin from '../pages/Signin';
import SignUp from '../pages/Signup';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
