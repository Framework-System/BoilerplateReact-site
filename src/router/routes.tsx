import { Home } from '@/pages/Home';
import { Interviews } from '@/pages/Interviews';
import { JobVacancyManage } from '@/pages/JobVacancyManage';
import type { PathRouteProps } from 'react-router-dom';

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
