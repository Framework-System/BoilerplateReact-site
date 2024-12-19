import { useCandidates } from '@/hooks/candidates/useCandidates';
import type { Candidate } from '@/models/Candidate';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Partial<Candidate>) => void;
  onClearFilters: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  const { id } = useParams<{ id: string }>();
  const { data: candidates } = useCandidates(id || '');
  const [selectedClassificar, setSelectedClassificar] =
    useState('Maiores notas');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [dateOptions, setDateOptions] = useState<Array<string>>([]);
  const [seniorityOptions, setSeniorityOptions] = useState<Array<string>>([]);
  const [statusOptions, setStatusOptions] = useState<Array<string>>([]);
  const [classificarOptions] = useState<Array<string>>([
    'Maiores notas',
    'Menores notas',
  ]);

  const extractUniqueOptions = useCallback(
    (candidates: Array<Candidate>, key: keyof Candidate) => {
      return Array.from(
        new Set(candidates.map((candidate) => candidate[key] as string)),
      );
    },
    [],
  );

  const setOptions = useCallback(
    (candidates: Array<Candidate>) => {
      setDateOptions(extractUniqueOptions(candidates, 'creationDate'));
      setSeniorityOptions(extractUniqueOptions(candidates, 'level'));
      setStatusOptions(extractUniqueOptions(candidates, 'status'));
    },
    [extractUniqueOptions],
  );

  useEffect(() => {
    if (candidates) {
      setOptions(candidates);
    }
  }, [candidates, setOptions]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const resetFilters = () => {
    setSelectedClassificar('Maiores notas');
    setSelectedDate('');
    setSelectedSeniority('');
    setSelectedStatus('');
  };

  const handleClearFilters = () => {
    resetFilters();
    onClearFilters();
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      classify: selectedClassificar,
      creationDate: selectedDate,
      level: selectedSeniority,
      status: selectedStatus,
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleClassificarChange = (classificar: string) => {
    setSelectedClassificar(classificar);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleClickOutside}
      onKeyUp={handleKeyUp}
      tabIndex={-1}
    >
      <div className="bg-white w-full max-w-4xl h-auto max-h-full overflow-y-auto rounded-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#432B4F]">Filtros</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="w-full col-span-1">
            <label
              htmlFor="data_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Data
            </label>
            <select
              id="data_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={dateOptions.length === 1}
            >
              <option value="">Selecione</option>
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {format(new Date(date), date.includes('T') ? 'Pp' : 'P', {
                    locale: ptBR,
                  })}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full col-span-1">
            <label
              htmlFor="senioridade_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senioridade
            </label>
            <select
              id="senioridade_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedSeniority}
              onChange={(e) => setSelectedSeniority(e.target.value)}
              disabled={seniorityOptions.length === 1}
            >
              <option value="">Selecione</option>
              {seniorityOptions.map((seniority) => (
                <option key={seniority} value={seniority}>
                  {seniority}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full col-span-1">
            <label
              htmlFor="status_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              id="status_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={statusOptions.length === 1}
            >
              <option value="">Selecione</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full col-span-1" />

          <div className="w-full col-span-1">
            <label
              htmlFor="classificar_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Classificar por
            </label>
            <div className="flex justify-between space-x-2">
              {classificarOptions.map((classificar) => (
                <label
                  key={classificar}
                  className={`flex items-center justify-center w-full h-10 border rounded-full cursor-pointer ${
                    selectedClassificar === classificar
                      ? 'bg-[#432B4F] text-white'
                      : 'border-[#432B4F] text-[#432B4F]'
                  }`}
                  onClick={() => handleClassificarChange(classificar)}
                  onKeyUp={(e) =>
                    e.key === 'Enter' && handleClassificarChange(classificar)
                  }
                >
                  <input
                    type="radio"
                    name="classificar"
                    value={classificar}
                    className="hidden"
                    checked={selectedClassificar === classificar}
                    onChange={() => handleClassificarChange(classificar)}
                  />
                  <span>
                    {classificar.charAt(0).toUpperCase() + classificar.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="flex flex-col md:flex-row md:space-x-3">
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full md:w-1/2 py-2 text-gray-600 hover:text-gray-800"
            >
              Remover filtros
            </button>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="w-full md:w-1/2 py-2 bg-[#432B4F] text-white rounded-lg hover:bg-[#533961] transition-colors"
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FiltersModal };
