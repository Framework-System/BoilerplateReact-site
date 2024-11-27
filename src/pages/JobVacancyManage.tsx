import { CreateJobModal } from '@/components/jobs/CreateJobModal';
import { FiltersModal } from '@/components/FiltersModal';
import { JobCard } from '@/components/jobs/JobCard';
import { useCreateJob } from '@/hooks/jobs/useCreateJob';
import { useJobs } from '@/hooks/jobs/useJobs';
import { log } from '@/logger';
import type { Job } from '@/types';
import { Filter, Plus, Search } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

const JobVacancyManage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  const { data: jobs, isLoading, isError } = useJobs();
  const { mutate: createJob } = useCreateJob();

  const filteredJobs =
    jobs?.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const handleApplyFilters = () => {
    log.info('Filters applied:');
  };

  const handleCreateJob = (jobData: Partial<Job>) => {
    createJob(jobData);
  };

  if (isLoading) {
    return <main className="px-6 py-6">Loading...</main>;
  }
  if (isError) {
    return <main className="px-6 py-6">Error fetching jobs</main>;
  }

  return (
    <main className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Vagas ({filteredJobs.length})</h2>
        <button
          type="button"
          onClick={() => setIsCreateJobOpen(true)}
          className="bg-[#432B4F] text-white px-8 py-2 rounded-lg flex items-center space-x-4 hover:bg-[#533961] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Criar vaga</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisa"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          <span>Todos os filtros</span>
        </button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Modals */}
      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        onClearFilters={() => console.log('Filters cleared')}
      />
      <CreateJobModal
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        onCreateJob={handleCreateJob}
      />
    </main>
  );
};

export { JobVacancyManage };
