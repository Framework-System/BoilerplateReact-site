import type { PathRouteProps } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { JobVacancyManage } from '@/pages/JobVacancyManage';
import { Interviews } from '@/pages/Interviews';

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