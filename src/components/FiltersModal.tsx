import React from 'react';
import { X } from 'lucide-react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  onClearFilters: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filtros</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-[#432B4F] text-white rounded-full text-sm">
                Todos
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                Ativo
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                Inativo
              </button>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Empresa
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="localiza">Localiza</option>
            </select>
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departamento
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="desenvolvimento">Desenvolvimento</option>
            </select>
          </div>

          {/* Vaga */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vaga
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="backend">Desenvolvedor Backend</option>
            </select>
          </div>

          {/* Senioridade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senioridade
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="junior">Júnior</option>
              <option value="pleno">Pleno</option>
              <option value="senior">Sênior</option>
            </select>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localização
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="bh">Belo Horizonte - MG</option>
            </select>
          </div>

          {/* Regime de Contrato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regime de Contrato
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="clt">CLT</option>
              <option value="pj">PJ</option>
            </select>
          </div>

          {/* Modelo de trabalho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo de trabalho
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Selecione</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
              <option value="remoto">Remoto</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 space-y-3">
          <button
            onClick={onClearFilters}
            className="w-full py-2 text-gray-600 hover:text-gray-800"
          >
            Remover filtros
          </button>
          <button
            onClick={() => {
              onApplyFilters({});
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

export default FiltersModal;