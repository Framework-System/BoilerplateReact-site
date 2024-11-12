import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const JobVacancyManage = React.lazy(() => import('../pages/JobVacancyManage'));
const Interviews = React.lazy(() => import('../pages/Interviews'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/jobs',
    element: <JobVacancyManage />,
  },
  {
    path: '/interviews',
    element: <Interviews />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];