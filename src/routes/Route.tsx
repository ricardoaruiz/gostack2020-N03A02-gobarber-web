import React from 'react';
import {
  RouteProps as RouteDOMProps,
  Route as RouteDOM,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface RouteProps extends RouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  // Get authenticated user
  const { user } = useAuth();
  const isSigned = !!user;

  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        if (isPrivate === isSigned) {
          return <Component />;
        }
        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
