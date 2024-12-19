import { CustomModal } from '@/components/CustomModal';
import { useUpdateJobStatus } from '@/hooks/jobs/useCreateJob';
import type { Job } from '@/models/Job';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  MoreVertical,
  User,
  Users,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillsModal } from './SkillsModal';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const daysAgo = formatDistanceToNow(new Date(job.dateCreation), {
    addSuffix: true,
    locale: ptBR,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAccOpen, setIsModalAccOpen] = useState(false);
  const { mutate: updateJobStatus } = useUpdateJobStatus();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isReviewer = user?.role.includes('reviewer');

  const handleViewCandidates = () => {
    navigate(`/candidates/${job.id}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`/createJobVacancy/${job.id}`);
    setIsDropdownOpen(false);
  };

  const handleToggleStatus = () => {
    setIsModalAccOpen(true);
  };

  const handleConfirmToggleStatus = () => {
    const newStatus = job.status === 'Ativo' ? 'Inativo' : 'Ativo';
    if (job.id) {
      updateJobStatus(
        { id: job.id.toString(), status: newStatus },
        {
          onSuccess: () => {
            setIsModalAccOpen(false);
            navigate(0);
          },
          onError: (error) => {
            alert(`Erro ao atualizar status: ${error.message}`);
          },
        },
      );
    } else {
      alert('Erro: ID do job não encontrado.');
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          {!isReviewer && <p className="text-sm text-gray-600">{job.department}</p>}
        </div>
        <div className="relative" ref={dropdownRef}>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              job.status === 'Ativo'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {job.status}
          </span>
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={toggleDropdown}
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleEdit}
              >
                Editar
              </button>
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleToggleStatus}
              >
                {job.status === 'Ativo' ? 'Inativar' : 'Ativar'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location || job.workModel}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <GraduationCap className="w-4 h-4" />
          <span>{job.level}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>{job.workModel}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{daysAgo}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{job?.userCreator}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill) => (
          <span key={skill.name} className="skill-badge">
            {skill.name.length > 10
              ? `${skill.name.slice(0, 10)}...`
              : skill.name}
          </span>
        ))}
        {job.skills.length > 3 && (
          <button
            type="button"
            onClick={handleOpenModal}
            className="skill-badge"
          >
            Ver mais
          </button>
        )}
      </div>
      <SkillsModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Todas as Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span key={skill.name} className="skill-badge">
              {skill.name}
            </span>
          ))}
        </div>
      </SkillsModal>

      <button
        type="button"
        className="w-full py-2 border border-[#432B4F] text-[#432B4F] rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
        onClick={handleViewCandidates}
      >
        <Users className="w-4 h-4" />
        <span>Visualizar candidatos ({job.candidates})</span>
      </button>

      <CustomModal
        isOpen={isModalAccOpen}
        onClose={() => setIsModalAccOpen(false)}
        title="Confirmar alteração de status"
        body={
          <div className="flex items-center">
            <span>
              Deseja realmente alterar o status da vaga para{' '}
              {job.status === 'Ativo' ? 'Inativo' : 'Ativo'}?
            </span>
          </div>
        }
        onConfirm={handleConfirmToggleStatus}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export { JobCard };
