import type { Candidate } from '@/models/Candidate';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Calendar,
  CalendarClock,
  Hourglass,
  MoreVertical,
  ShieldQuestion,
  Star,
  ThumbsDown,
  ThumbsUp,
  Verified,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { CustomModal } from '@/components/CustomModal';
import { useUpdateMeetingStatus } from '@/hooks/candidates/useCreateCandidate';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { mutate: updateMeetingStatus } = useUpdateMeetingStatus();
  const { user } = useAuth();
  const isAdmin = user?.role.includes('admin');

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Aguardando':
        return { bgColor: '#FCF6E0', textColor: '#D3870D', Icon: Hourglass };
      case 'Etapa interna':
        return {
          bgColor: '#F9EEFE',
          textColor: '#5F3473',
          Icon: CalendarClock,
        };
      case 'Aprovado':
        return { bgColor: '#E9F4EE', textColor: '#02644A', Icon: ThumbsUp };
      case 'Contratado':
        return { bgColor: '#EBF7FF', textColor: '#0095F6', Icon: Verified };
      case 'Reprovado':
        return { bgColor: '#FEE9EA', textColor: '#B7153E', Icon: ThumbsDown };
      case 'Declinou':
        return { bgColor: '#EFEFEF', textColor: '#4B4B4B', Icon: X };
      default:
        return {
          bgColor: '#FFFFFF',
          textColor: '#000000',
          Icon: ShieldQuestion,
        };
    }
  };

  const { bgColor, textColor, Icon } = getStatusStyles(candidate.status);

  const statusOptions = [
    'Aguardando',
    'Etapa interna',
    'Aprovado',
    'Contratado',
    'Reprovado',
    'Declinou',
  ];

  const filteredStatusOptions = isAdmin
    ? statusOptions
    : statusOptions.filter(
        (status) => !['Aguardando', 'Contratado', 'Declinou'].includes(status),
      );

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedStatus && candidate.id) {
      updateMeetingStatus(
        { id: candidate.id, status: selectedStatus },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            window.location.reload();
          },
          onError: (error) => {
            alert(`Erro ao atualizar status: ${error.message}`);
          },
        },
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="w-full text-center md:text-left">
          <h3 className="text-lg font-semibold">
            <Link to={`/candidatesdetails/${candidate.id}`}>
              {candidate.title}
            </Link>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-2.5">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {format(new Date(candidate.creationDate), 'P', {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <Star className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {candidate.grade}/100
              </span>
            </div>
            <div className="flex items-center space-x-2 justify-center md:justify-end">
              <div
                className="flex items-center space-x-2 rounded-full px-2 py-1"
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{candidate.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-4 md:mt-0 md:self-auto self-end" ref={dropdownRef} style={{ marginTop: '-40px' }}>
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={toggleDropdown}
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {filteredStatusOptions
              .filter((status) => status !== candidate.status)
              .map((status) => (
                <button
                  key={status}
                  type="button"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </button>
              ))}
          </div>
          )}
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar alteração de status"
        body={
          <div className="flex items-center">
            <span>
              Deseja realmente alterar o status do candidato para {selectedStatus}?
            </span>
          </div>
        }
        onConfirm={handleConfirmStatusChange}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export { CandidateCard };
