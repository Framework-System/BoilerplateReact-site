import type { Job } from '@/types';
import { ArrowLeft } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateJob: (jobData: Job) => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose,
  onCreateJob,
}) => {
  const [activeTab, setActiveTab] = useState('info');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Job>();

  const onSubmit: SubmitHandler<Job> = (data) => {
    onCreateJob(data);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white h-full w-full overflow-y-auto">
        {/* Header */}
        <header className="bg-[#432B4F] text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-[#533961] rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold">Criar vaga</h1>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                type="button"
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'info'
                    ? 'border-[#432B4F] text-[#432B4F]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Informações da vaga
              </button>
              <button
                type="button"
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'skills'
                    ? 'border-[#432B4F] text-[#432B4F]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('skills')}
              >
                Competências
              </button>
            </nav>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-5xl mx-auto px-4 py-6"
        >
          {activeTab === 'info' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="departamento_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Departamento
                </label>
                <select
                  id="departamento_id"
                  {...register('department', {
                    required: 'Department is required',
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione</option>
                  <option value="desenvolvimento">Desenvolvimento</option>
                  <option value="design">Design</option>
                  <option value="produto">Produto</option>
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="vaga_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Vaga
                </label>
                <select
                  id="vaga_id"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione</option>
                  <option value="backend">Desenvolvedor Backend</option>
                  <option value="frontend">Desenvolvedor Frontend</option>
                  <option value="fullstack">Desenvolvedor Fullstack</option>
                </select>
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senioridade_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Senioridade
                </label>
                <select
                  id="senioridade_id"
                  {...register('level', { required: 'Level is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione</option>
                  <option value="junior">Júnior</option>
                  <option value="pleno">Pleno</option>
                  <option value="senior">Sênior</option>
                </select>
                {errors.level && (
                  <p className="text-red-500 text-sm">{errors.level.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Localização
                </label>
                <select
                  id="location_id"
                  {...register('location', {
                    required: 'Location is required',
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione</option>
                  <option value="bh">Belo Horizonte - MG</option>
                  <option value="sp">São Paulo - SP</option>
                  <option value="rj">Rio de Janeiro - RJ</option>
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="regime_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Regime do Contrato
                </label>
                <select
                  id="regime_id"
                  {...register('type', { required: 'Type is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione</option>
                  <option value="clt">CLT</option>
                  <option value="pj">PJ</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="modelo_trabalho_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Modelo de trabalho
                </label>
                <select
                  id="modelo_trabalho_id"
                  {...register('type', { required: 'Type is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="remoto">Remoto</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Add skills section here */}
              <p className="text-gray-500">
                Competências section to be implemented
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-5xl mx-auto flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#432B4F] text-white rounded-lg hover:bg-[#533961] transition-colors"
              >
                Criar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateJobModal };
