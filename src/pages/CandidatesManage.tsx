import { Pagination } from '@/components/Pagination';
import { CandidateCard } from '@/components/candidates/CandidateCard';
import { FiltersModal } from '@/components/candidates/CandidateFiltersModal';
import { useCandidates } from '@/hooks/candidates/useCandidates';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/layout/components/Header';
import type { Candidate } from '@/models/Candidate';
import { ArrowLeft, Search, Plus, SlidersHorizontal } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CandidatesManage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: candidates, isLoading, isError } = useCandidates(id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Partial<Candidate>>({});
  const { user } = useAuth();

  const candidatesPerPage = 24;
  const filteredCandidates = candidates
    ? filterCandidates(candidates, filters, searchQuery)
    : [];

  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  const currentCandidates = filteredCandidates.slice(
    (currentPage - 1) * candidatesPerPage,
    currentPage * candidatesPerPage,
  );

  const handleApplyFilters = (appliedFilters: Partial<Candidate>) => {
    setFilters(appliedFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  if (isLoading) {
    return <main className="px-6 py-6">Loading...</main>;
  }
  if (isError) {
    return <main className="px-6 py-6">Error fetching candidates</main>;
  }
  return (
    <main className="px-6 py-6">
      <Header title="Candidatos" />
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 mb-6 ml-auto">
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <Link to="/jobs" style={{ color: '#4B4B4B', textDecoration: 'none' }}>
            <ArrowLeft className="w-5 h-5 inline-block" /> Voltar para gestão de
            vagas
          </Link>
        </div>
        {!user?.role.includes('admin') && (
          <div className="col-span-1 md:col-span-2 lg:col-span-2" />
        )}
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisa candidatos"
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
        {user?.role.includes('admin') && (
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <button
              type="button"
              className="bg-[#432B4F] text-white px-8 py-2 rounded-lg flex items-center justify-center space-x-4 hover:bg-[#533961] transition-colors w-full"
            >
              <Plus className="w-5 h-5" />
              <span>Criar vaga</span>
            </button>
          </div>
        )}
      </div>

      {currentCandidates.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-full max-w-md text-left">
            <div className="text-black text-xl whitespace-nowrap">
              Nenhum candidato encontrado
            </div>
            <div className="text-gray-500 text-lg whitespace-nowrap">
              Quando novos candidatos forem adicionados, eles aparecerão aqui.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {currentCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-500 text-sm">
              {filteredCandidates.length} candidatos
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

      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </main>
  );
};

const filterCandidates = (
  candidates: Array<Candidate>,
  filters: Partial<Candidate>,
  searchQuery: string,
): Array<Candidate> => {
  const filteredCandidates = candidates.filter((candidate) => {
    return (
      matchesFilters(candidate, filters) &&
      matchesSearchQuery(candidate, searchQuery)
    );
  });

  if (filters.classify === 'Maiores notas') {
    filteredCandidates.sort((a, b) => b.grade - a.grade);
  } else if (filters.classify === 'Menores notas') {
    filteredCandidates.sort((a, b) => a.grade - b.grade);
  }

  return filteredCandidates;
};

const matchesFilters = (
  candidate: Candidate,
  filters: Partial<Candidate>,
): boolean => {
  return (
    (!filters.status ||
      filters.status.toUpperCase() === 'TODOS' ||
      candidate.status.toUpperCase() === filters.status.toUpperCase()) &&
    (!filters.creationDate ||
      candidate.creationDate === filters.creationDate) &&
    (!filters.level || candidate.level === filters.level)
  );
};

const matchesSearchQuery = (
  candidate: Candidate,
  searchQuery: string,
): boolean => {
  return candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
};

export { CandidatesManage };
