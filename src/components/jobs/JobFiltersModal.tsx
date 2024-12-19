import { useJobs } from '@/hooks/jobs/useJobs';
import type { Job } from '@/models/Job';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Partial<Job>) => void;
  onClearFilters: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  const { data: jobs } = useJobs();
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');
  const [responsavelVaga, setResponsavelVaga] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedWorkModel, setSelectedWorkModel] = useState('');

  const [companyOptions, setCompanyOptions] = useState<Array<string>>([]);
  const [dateOptions, setDateOptions] = useState<Array<string>>([]);
  const [jobOptions, setJobOptions] = useState<Array<string>>([]);
  const [seniorityOptions, setSeniorityOptions] = useState<Array<string>>([]);
  const [responsavelOptions, setResponsavelOptions] = useState<Array<string>>(
    [],
  );
  const [locationOptions, setLocationOptions] = useState<Array<string>>([]);
  const [workModelOptions, setWorkModelOptions] = useState<Array<string>>([]);

  const extractUniqueOptions = useCallback(
    (jobs: Array<Job>, key: keyof Job) => {
      return Array.from(new Set(jobs.map((job) => job[key] as string)));
    },
    [],
  );

  const setOptions = useCallback(
    (jobs: Array<Job>) => {
      setCompanyOptions(extractUniqueOptions(jobs, 'company'));
      setDateOptions(extractUniqueOptions(jobs, 'dateCreation'));
      setJobOptions(extractUniqueOptions(jobs, 'title'));
      setSeniorityOptions(extractUniqueOptions(jobs, 'level'));
      setResponsavelOptions(extractUniqueOptions(jobs, 'userCreator'));
      setLocationOptions(extractUniqueOptions(jobs, 'location'));
      setWorkModelOptions(extractUniqueOptions(jobs, 'workModel'));
    },
    [extractUniqueOptions],
  );

  const setSelectedCompanyValue = useCallback((companies: Array<string>) => {
    if (companies.length === 1) {
      setSelectedCompany(companies[0]);
    }
  }, []);

  const setSelectedDateValue = useCallback((dates: Array<string>) => {
    if (dates.length === 1) {
      setSelectedDate(dates[0]);
    }
  }, []);

  const setSelectedJobValue = useCallback((jobTitles: Array<string>) => {
    if (jobTitles.length === 1) {
      setSelectedJob(jobTitles[0]);
    }
  }, []);

  const setSelectedSeniorityValue = useCallback(
    (seniorities: Array<string>) => {
      if (seniorities.length === 1) {
        setSelectedSeniority(seniorities[0]);
      }
    },
    [],
  );

  const setSelectedResponsavelValue = useCallback(
    (responsaveis: Array<string>) => {
      if (responsaveis.length === 1) {
        setResponsavelVaga(responsaveis[0]);
      }
    },
    [],
  );

  const setSelectedLocationValue = useCallback((locations: Array<string>) => {
    if (locations.length === 1) {
      setSelectedLocation(locations[0]);
    }
  }, []);

  const setSelectedWorkModelValue = useCallback((workModels: Array<string>) => {
    if (workModels.length === 1) {
      setSelectedWorkModel(workModels[0]);
    }
  }, []);

  const setSelectedValues = useCallback(
    (
      companies: Array<string>,
      dates: Array<string>,
      jobTitles: Array<string>,
      seniorities: Array<string>,
      responsaveis: Array<string>,
      locations: Array<string>,
      workModels: Array<string>,
    ) => {
      setSelectedCompanyValue(companies);
      setSelectedDateValue(dates);
      setSelectedJobValue(jobTitles);
      setSelectedSeniorityValue(seniorities);
      setSelectedResponsavelValue(responsaveis);
      setSelectedLocationValue(locations);
      setSelectedWorkModelValue(workModels);
    },
    [
      setSelectedCompanyValue,
      setSelectedDateValue,
      setSelectedJobValue,
      setSelectedSeniorityValue,
      setSelectedResponsavelValue,
      setSelectedLocationValue,
      setSelectedWorkModelValue,
    ],
  );

  const setOptionsAndSelectedValues = useCallback(
    (jobs: Array<Job>) => {
      const companies = extractUniqueOptions(jobs, 'company');
      const dates = extractUniqueOptions(jobs, 'dateCreation');
      const jobTitles = extractUniqueOptions(jobs, 'title');
      const seniorities = extractUniqueOptions(jobs, 'level');
      const responsaveis = extractUniqueOptions(jobs, 'userCreator');
      const locations = extractUniqueOptions(jobs, 'location');
      const workModels = extractUniqueOptions(jobs, 'workModel');

      setOptions(jobs);
      setSelectedValues(
        companies,
        dates,
        jobTitles,
        seniorities,
        responsaveis,
        locations,
        workModels,
      );
    },
    [extractUniqueOptions, setOptions, setSelectedValues],
  );

  useEffect(() => {
    if (jobs) {
      setOptionsAndSelectedValues(jobs);
    }
  }, [jobs, setOptionsAndSelectedValues]);

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
    setSelectedStatus('');
    setSelectedCompany('');
    setSelectedDate('');
    setSelectedJob('');
    setSelectedSeniority('');
    setResponsavelVaga('');
    setSelectedLocation('');
    setSelectedWorkModel('');
  };

  const handleClearFilters = () => {
    resetFilters();
    onClearFilters();
    setSelectedStatus('todos');
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      status: selectedStatus,
      company: selectedCompany,
      dateCreation: selectedDate,
      title: selectedJob,
      level: selectedSeniority,
      userCreator: responsavelVaga,
      location: selectedLocation,
      workModel: selectedWorkModel,
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
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
              htmlFor="status_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <div className="flex justify-between space-x-2">
              {['todos', 'ativo', 'inativo'].map((status) => (
                <label
                  key={status}
                  className={`flex items-center justify-center w-full h-10 border rounded-full cursor-pointer ${
                    selectedStatus === status
                      ? 'bg-[#432B4F] text-white'
                      : 'border-[#432B4F] text-[#432B4F]'
                  }`}
                  onClick={() => handleStatusChange(status)}
                  onKeyUp={(e) =>
                    e.key === 'Enter' && handleStatusChange(status)
                  }
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    className="hidden"
                    checked={selectedStatus === status}
                    onChange={() => handleStatusChange(status)}
                  />
                  <span>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full·col-span-1" />
          <div className="w-full col-span-1">
            <label
              htmlFor="empresa_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Empresa
            </label>
            <select
              id="empresa_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              disabled={companyOptions.length === 1}
            >
              <option value="">Selecione</option>
              {companyOptions.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

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
              htmlFor="vaga_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Vaga
            </label>
            <select
              id="vaga_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              disabled={jobOptions.length === 1}
            >
              <option value="">Selecione</option>
              {jobOptions.map((job) => (
                <option key={job} value={job}>
                  {job}
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
              htmlFor="responsavel_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Responsável
            </label>
            <select
              id="responsavel_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={responsavelVaga}
              onChange={(e) => setResponsavelVaga(e.target.value)}
              disabled={responsavelOptions.length === 1}
            >
              <option value="">Selecione</option>
              {responsavelOptions.map((responsavel) => (
                <option key={responsavel} value={responsavel}>
                  {responsavel}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full col-span-1">
            <label
              htmlFor="localizacao_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Localização
            </label>
            <select
              id="localizacao_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              disabled={locationOptions.length === 1}
            >
              <option value="">Selecione</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full col-span-1">
            <label
              htmlFor="modelo_trabalho_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Modelo de trabalho
            </label>
            <select
              id="modelo_trabalho_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedWorkModel}
              onChange={(e) => setSelectedWorkModel(e.target.value)}
              disabled={workModelOptions.length === 1}
            >
              <option value="">Selecione</option>
              {workModelOptions.map((workModel) => (
                <option key={workModel} value={workModel}>
                  {workModel}
                </option>
              ))}
            </select>
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
