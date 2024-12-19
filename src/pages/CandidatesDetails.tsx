import { Header } from '@/layout/components/Header';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import { useMeetingById, useMediaFile } from '@/hooks/candidates/useCandidates';
import { useJobSkillsById } from '@/hooks/jobs/useJobs';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import {
  CalendarClock,
  Hourglass,
  ThumbsDown,
  ThumbsUp,
  Verified,
  X,
  ArrowLeft, 
  Printer,
  ChevronDown, 
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import { CustomModal } from '@/components/CustomModal';
import { useUpdateMeetingStatus } from '@/hooks/candidates/useCreateCandidate';

const CandidatesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: candidate, isLoading, isError } = useMeetingById(id || '');
  const { data: job } = useJobSkillsById(candidate?.jobSkillsId || '');
  const { data: videoBlob, isLoading: isVideoLoading } = useMediaFile(candidate?.mediaInterview ?? { bucketName: '', key: '' });
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: updateMeetingStatus } = useUpdateMeetingStatus();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : '';

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    setIsModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedStatus && candidate?.id) {
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
  
  const handleCancelStatusChange = () => {
    setSelectedStatus('');
    setIsModalOpen(false);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Aguardando':
        return { bgColor: '#FCF6E0', textColor: '#D3870D', Icon: Hourglass };
      case 'Etapa interna':
        return { bgColor: '#F9EEFE', textColor: '#5F3473', Icon: CalendarClock };
      case 'Aprovado':
        return { bgColor: '#E9F4EE', textColor: '#02644A', Icon: ThumbsUp };
      case 'Contratado':
        return { bgColor: '#EBF7FF', textColor: '#0095F6', Icon: Verified };
      case 'Reprovado':
        return { bgColor: '#FEE9EA', textColor: '#B7153E', Icon: ThumbsDown };
      case 'Declinou':
        return { bgColor: '#EFEFEF', textColor: '#4B4B4B', Icon: X  };
      default:
        return { bgColor: '#FFFFFF', textColor: '#000000', Icon: X  };
    }
  };

  if (isLoading) {
    return <main className="px-6 py-6">Loading...</main>;
  }
  if (isError || !candidate) {
    return (
      <main className="px-6 py-6">
        Candidato não encontrado.
        <Link to="/jobs" className="text-blue-500 hover:underline">
          Voltar para gestão de vagas
        </Link>
      </main>
    );
  }

  const { bgColor, textColor, Icon } = getStatusStyles(candidate.status);
  
  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <Header title="Entrevista" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Link
          to={`/candidates/${candidate?.jobSkillsId}`}
          className="flex items-center text-gray-700 hover:text-gray-900 mb-2 md:mb-0"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para candidatos
        </Link>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center text-black bg-transparent hover:bg-gray-200 p-2 rounded"
          >
            <Printer className="w-5 h-5 mr-2" />
            <span className="text-[#5F3473]">Imprimir</span>
          </button>
          <div
            className="flex items-center space-x-2 rounded-full px-2 py-1"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{candidate.status}</span>
          </div>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full md:w-48 h-10 p-2 bg-[#5F3473] text-white rounded hover:bg-[#432B4F] transition-colors text-center appearance-none mt-2 md:mt-0"
          >
            <option value="" disabled>
              Alterar status
            </option>
            {['Aguardando', 'Etapa interna', 'Aprovado', 'Contratado', 'Reprovado', 'Declinou']
              .filter((status) => status !== candidate.status)
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="w-full">
        {!isAccordionOpen && (
          <button
            type="button"
            onClick={toggleAccordion}
            className="w-full bg-white text-left p-4 rounded-lg border border-[#CACACA] focus:outline-none flex justify-between items-center"
          >
            <b>Informações básicas</b>
            <ChevronDown className="w-5 h-5" />
          </button>
        )}
        <Collapse isOpened={isAccordionOpen}>
          <div className="p-4 border border-[#CACACA] rounded-lg bg-white w-full">
            <div className="w-full">
              <button
                type="button"
                onClick={toggleAccordion}
                className="w-full bg-transparent text-left p-0 focus:outline-none flex justify-between items-center mb-4"
                style={{ border: 'none' }}
              >
                <b>Informações básicas</b>
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <b className="block text-sm text-gray-900">Nome do candidato</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{candidate.title}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Vaga</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{job?.title}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Senioridade</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{candidate.level}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Modelo de contrato</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{job?.workModel}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Localização</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{job?.location}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Responsável da vaga</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{job?.userCreator}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Data da entrevista</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{format(new Date(candidate.creationDate), 'P', { locale: ptBR })}</span>
              </div>
              <div>
                <b className="block text-sm text-gray-900">Resultado da avaliação</b>
                <span className="block font-medium text-gray-700 mb-2 font-bold">{candidate?.grade}/100</span>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
      {isVideoLoading ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center items-center">
          <span>Carregando vídeo...</span>
        </div>
      ) : (
        videoUrl && (
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <video controls className="w-full">
              <source src={videoUrl} type="video/mp4" />
              <track
                kind="captions"
                srcLang="en"
                src="/path/to/captions.vtt"
                label="English"
                default
              />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        )
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCancelStatusChange}
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

export { CandidatesDetails };