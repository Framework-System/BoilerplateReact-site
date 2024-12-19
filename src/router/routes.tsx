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
const CandidatesManage = lazy(() =>
  import('@/pages/CandidatesManage').then((module) => ({
    default: module.CandidatesManage,
  })),
);
const CreateJobVacancyManage = lazy(() =>
  import('@/pages/CreateJobVacancyManage').then((module) => ({
    default: module.CreateJobVacancyManage,
  })),
);
const CandidatesDetails = lazy(() =>
  import('@/pages/CandidatesDetails').then((module) => ({
    default: module.CandidatesDetails,
  })),
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
  {
    path: '/createJobVacancy/:id?',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <CreateJobVacancyManage />
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
  {
    path: '/candidates/:id',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <CandidatesManage />
      </Suspense>
    ),
  },
  {
    path: '/candidatesdetails/:id',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <CandidatesDetails />
      </Suspense>
    ),
  },
];
