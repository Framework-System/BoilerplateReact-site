import type { Job } from '@/types';
import { X } from 'lucide-react';
import type React from 'react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Job) => void;
  onClearFilters: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filtros</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Status */}
          <div>
            <label
              htmlFor="status_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="todos"
                    className="form-radio text-purple-600"
                  />
                  <span className="ml-2">Todos</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="ativo"
                    className="form-radio text-purple-600"
                  />
                  <span className="ml-2">Ativo</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inativo"
                    className="form-radio text-purple-600"
                  />
                  <span className="ml-2">Inativo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <label
              htmlFor="empresa_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Empresa
            </label>
            <select
              id="empresa_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="localiza">Localiza</option>
            </select>
          </div>

          {/* Data */}
          <div>
            <label
              htmlFor="data_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Data
            </label>
            <input
              type="date"
              id="data_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Departamento */}
          <div>
            <label
              htmlFor="departamento_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Departamento
            </label>
            <select
              id="departamento_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="desenvolvimento">Desenvolvimento</option>
            </select>
          </div>

          {/* Vaga */}
          <div>
            <label
              htmlFor="vaga_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Vaga
            </label>
            <select
              id="vaga_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="backend">Desenvolvedor Backend</option>
            </select>
          </div>

          {/* Senioridade */}
          <div>
            <label
              htmlFor="senioridade_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senioridade
            </label>
            <select
              id="senioridade_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="junior">Júnior</option>
              <option value="pleno">Pleno</option>
              <option value="senior">Sênior</option>
            </select>
          </div>

          {/* Localização */}
          <div>
            <label
              htmlFor="localizacao_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Localização
            </label>
            <select
              id="localizacao_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="Belo Horizonte - MG">Belo Horizonte - MG</option>
              <option value="São Paulo - SP">São Paulo - SP</option>
            </select>
          </div>

          {/* Regime de Contrato */}
          <div>
            <label
              htmlFor="regime_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Regime de Contrato
            </label>
            <select
              id="regime_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="clt">CLT</option>
              <option value="pj">PJ</option>
              <option value="hibrido">Hibrido</option>
            </select>
          </div>

          {/* Modelo de trabalho */}
          <div>
            <label
              htmlFor="modelo_trabalho_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Modelo de trabalho
            </label>
            <select
              id="modelo_trabalho_id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
              <option value="remoto">Remoto</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 space-y-3">
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full py-2 text-gray-600 hover:text-gray-800"
          >
            Remover filtros
          </button>
          <button
            type="button"
            onClick={() => {
              onApplyFilters({
                id: 0,
                title: '',
                department: '',
                location: '',
                type: '',
                level: '',
                company: '',
                status: '',
                postedDate: '',
                skills: [],
                candidates: 0,
              });
              onClose();
            }}
            className="w-full py-2 bg-[#432B4F] text-white rounded-lg hover:bg-[#533961] transition-colors"
          >
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
};

export { FiltersModal };
