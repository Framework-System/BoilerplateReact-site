import { Suspense, lazy } from 'react';
import type { PathRouteProps } from 'react-router-dom';

const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home })),
);
const Interviews = lazy(() =>
  import('@/pages/Interviews').then((module) => ({
    default: module.Interviews,
  })),
);
const JobVacancyManage = lazy(() =>
  import('@/pages/JobVacancyManage').then((module) => ({
    default: module.JobVacancyManage,
  })),
);
const Login = lazy(() =>
  import('@/pages/Login').then((module) => ({ default: module.Login })),
);

export const routes: Array<PathRouteProps> = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <Login />
      </Suspense>
    ),
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/jobs',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <JobVacancyManage />
      </Suspense>
    ),
  },
  {
    path: '/interviews',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <Interviews />
      </Suspense>
    ),
  },
];
