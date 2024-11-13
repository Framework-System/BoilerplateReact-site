import { Home } from '@/pages/Home';
import { Interviews } from '@/pages/Interviews';
import { JobVacancyManage } from '@/pages/JobVacancyManage';
import { Login } from '@/pages/Login';
import type { PathRouteProps } from 'react-router-dom';

export const routes: Array<PathRouteProps> = [
  {
    path: '/login',
    element: <Login />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
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