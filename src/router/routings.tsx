import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Page404 } from '@/pages/404';

import { RequireAuth } from './require-auth';
import { privateRoutes, routes } from './routes';

export const Routings = memo(() => {
  return (
    <Suspense>
      <Routes>
        {routes.map((routeProps) => (
          <Route {...routeProps} key={routeProps.path as string} />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth
                redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
              >
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
});
