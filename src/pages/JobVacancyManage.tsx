import { Pagination } from '@/components/Pagination';
import { JobCard } from '@/components/jobs/JobCard';
import { FiltersModal } from '@/components/jobs/JobFiltersModal';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs } from '@/hooks/jobs/useJobs';
import { Header } from '@/layout/components/Header';
import type { Job } from '@/models/Job';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobVacancyManage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Partial<Job>>({});
  const { data: jobs, isLoading, isError } = useJobs();
  const { user } = useAuth();

  const jobsPerPage = 6;

  const filteredJobs = jobs
  ? filterJobs(
      jobs.filter((job) => user?.role.includes('admin') || 
      job.company?.toUpperCase() === user?.company?.toUpperCase()),
      filters,
      searchQuery
    )
  : [];

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  const handleApplyFilters = (appliedFilters: Partial<Job>) => {
    setFilters(appliedFilters);
  };

  if (isLoading) {
    return <main className="px-6 py-6">Loading...</main>;
  }
  if (isError) {
    return <main className="px-6 py-6">Error fetching jobs</main>;
  }
  return (
    <main className="px-6 py-6">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 mb-6 ml-auto">
        <div className="col-span-1 md:col-span-4 lg:col-span-4" />
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisa titulo e/ou subtitulo"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <button
            type="button"
            onClick={() => setIsFiltersOpen(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Todos os filtros</span>
          </button>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <button
            type="button"
            className="bg-[#432B4F] text-white px-8 py-2 rounded-lg flex items-center justify-center space-x-4 hover:bg-[#533961] transition-colors w-full"
            onClick={() => navigate('/createJobVacancy')}
          >
            <Plus className="w-5 h-5" />
            <span>Criar vaga</span>
          </button>
        </div>
      </div>

      {/* Job Cards Grid */}
      {currentJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-full max-w-md text-left">
            <div className="text-black text-xl whitespace-nowrap">
              Nenhuma vaga criada
            </div>
            <div className="text-gray-500 text-lg whitespace-nowrap">
              Quando novas vagas forem criadas, elas aparecerão aqui.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-500 text-sm">
              {filteredJobs.length} vagas
            </span>
            <div className="flex-1 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        onClearFilters={() => setFilters({})}
      />
    </main>
  );
};

const filterJobs = (
  jobs: Array<Job>,
  filters: Partial<Job>,
  searchQuery: string,
): Array<Job> => {
  return jobs.filter((job) => {
    return matchesFilters(job, filters) && matchesSearchQuery(job, searchQuery);
  });
};

const matchesFilters = (job: Job, filters: Partial<Job>): boolean => {
  return (
    (!filters.status ||
      filters.status.toUpperCase() === 'TODOS' ||
      job.status.toUpperCase() === filters.status.toUpperCase()) &&
    (!filters.company || job.company === filters.company) &&
    (!filters.dateCreation || job.dateCreation === filters.dateCreation) &&
    (!filters.title || job.title === filters.title) &&
    (!filters.level || job.level === filters.level) &&
    (!filters.userCreator || job.userCreator === filters.userCreator) &&
    (!filters.location || job.location === filters.location) &&
    (!filters.workModel || job.workModel === filters.workModel)
  );
};

const matchesSearchQuery = (job: Job, searchQuery: string): boolean => {
  return (
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );
};

export { JobVacancyManage };
