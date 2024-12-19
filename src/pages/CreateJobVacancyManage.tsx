import { CustomModal } from '@/components/CustomModal';
import PesoBadge from '@/components/jobs/PesoBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanyNames } from '@/hooks/companies/useCompanies';
import { useCreateJob } from '@/hooks/jobs/useCreateJob';
import { useJobSkillsById } from '@/hooks/jobs/useJobs';
import { Header } from '@/layout/components/Header';
import type { Job } from '@/models/Job';
import { ArrowLeft, MoreVertical, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface Competencia {
  id: number;
  competencia: string;
  peso: number | '';
}

const CreateJobVacancyManage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: jobData } = useJobSkillsById(id || '');
  const [activeTab, setActiveTab] = useState('info');
  const [competencias, setCompetencias] = useState<Array<Competencia>>([]);
  const [newCompetencia, setNewCompetencia] = useState('');
  const [newPeso, setNewPeso] = useState<number | ''>('');
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSaveOpen, setIsModalSaveOpen] = useState(false);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const nextId = useRef(1);
  const { data: companyNames, isLoading, isError } = useCompanyNames();
  const { user } = useAuth();
  const [empresa, setEmpresa] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [vaga, setVaga] = useState('');
  const [senioridade, setSenioridade] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [modelo, setModelo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [regimeContrato, setRegimeContrato] = useState('');
  const { mutate: createJob } = useCreateJob();
  const [modalContent, setModalContent] = useState({
    title: '',
    body: '',
    onConfirm: () => null,
    onClose: () => null,
  });

  const isReviewer = user?.role.includes('reviewer');

  useEffect(() => {
    if (jobData) {
      setEmpresa(jobData.company || '');
      setDepartamento(jobData.department || '');
      setVaga(jobData.title);
      setSenioridade(jobData.level);
      setResponsavel(jobData.jobContact || '');
      setLocalizacao(jobData.location || '');
      setModelo(jobData.workModel || '');
      setRegimeContrato(jobData.employmentRegime || '');
      setObservacoes(jobData.notes || '');
      setCompetencias(jobData.skills.map((skill, index) => ({
        id: index,
        competencia: skill.name,
        peso: skill.weight,
      })));
    }
  }, [jobData]);

  const isFormValid = () => {
    return (
      (isReviewer || empresa) &&
      (isReviewer || departamento) &&
      vaga &&
      senioridade &&
      responsavel &&
      modelo &&
      (isReviewer || regimeContrato) &&
      competencias.length > 0
    );
  };

  const handleAddCompetencia = () => {
    if (newCompetencia && newPeso !== '') {
      const updatedCompetencias = [...competencias];
      if (editIndex !== null) {
        updatedCompetencias[editIndex] = {
          ...updatedCompetencias[editIndex],
          competencia: newCompetencia,
          peso: newPeso,
        };
        setEditIndex(null);
      } else {
        updatedCompetencias.push({
          id: nextId.current++,
          competencia: newCompetencia,
          peso: newPeso,
        });
      }
      setOpenDropdownIndex(null);
      setCompetencias(updatedCompetencias);
      setNewCompetencia('');
      setNewPeso('');
    }
  };

  const handleEditCompetencia = (index: number) => {
    setOpenDropdownIndex(null);
    const comp = competencias[index];
    setNewCompetencia(comp.competencia);
    setNewPeso(comp.peso);
    setEditIndex(index);
  };

  const handleDeleteCompetencia = (index: number) => {
    setOpenDropdownIndex(null);
    setCompetencias(competencias.filter((_, i) => i !== index));
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRefs.current.every(
        (ref) => ref && !ref.contains(event.target as Node),
      )
    ) {
      setOpenDropdownIndex(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const setDropdownRef = (el: HTMLDivElement | null, index: number) => {
    dropdownRefs.current[index] = el;
  };

  const setButtonRef = (el: HTMLButtonElement | null, index: number) => {
    buttonRefs.current[index] = el;
  };

  const handleCancel = () => {
    if(id){
      navigate('/jobs');
    }
    
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setIsModalOpen(false);
    navigate('/jobs');
  };

  const handleBackOrCancel = (event: React.MouseEvent) => {
    if (
      empresa ||
      departamento ||
      vaga ||
      senioridade ||
      responsavel ||
      localizacao ||
      modelo ||
      regimeContrato ||
      competencias.length > 0
    ) {
      event.preventDefault();
      handleCancel();
    } else {
      navigate('/jobs');
    }
  };

  const handleCreateJob = () => {
    const newJob: Job = {
      company: isReviewer ? user?.company : empresa,
      department: departamento,
      title: vaga,
      level: senioridade,
      location: localizacao,
      employmentRegime: regimeContrato,
      workModel: modelo,
      jobContact: responsavel,
      skills: competencias.map((comp) => ({
        name: comp.competencia,
        weight: comp.peso as number,
      })),
      userCreator: user?.email || 'unknown',
      dateCreation: new Date().toISOString(),
      notes: observacoes,
      status: 'Ativo',
    };

    createJob(newJob, {
      onSuccess: () => {
        setIsModalSaveOpen(true);
        setModalContent({
          title: 'Sucesso',
          body: 'A vaga foi criada com sucesso!',
          onConfirm: () => {
            navigate('/jobs');
            return null;
          },
          onClose: () => {
            navigate('/jobs');
            return null;
          },
        });
      },
      onError: (error) => {
        setIsModalSaveOpen(true);
        setModalContent({
          title: 'Erro',
          body: `Erro ao criar a vaga: ${error.message}`,
          onConfirm: () => {
            setIsModalSaveOpen(false);
            return null;
          },
          onClose: () => {
            setIsModalSaveOpen(false);
            return null;
          },
        });
      },
    });
  };

  const handleUpdateJob = () => {
    if (!id) {
      return;
    }

    const updatedJob: Job = {
      id: id,
      company: isReviewer ? user?.company : empresa,
      department: departamento,
      title: vaga,
      level: senioridade,
      location: localizacao,
      employmentRegime: regimeContrato,
      workModel: modelo,
      jobContact: responsavel,
      skills: competencias.map((comp) => ({
        name: comp.competencia,
        weight: comp.peso as number,
      })),
      userCreator: jobData?.userCreator || 'unknown',
      dateCreation: jobData?.dateCreation || new Date().toISOString(),
      userModifier: user?.email || 'unknown',
      dateModification: new Date().toISOString(),
      notes: observacoes,
      status: jobData?.status || 'Ativo',
    };

    createJob(updatedJob, {
      onSuccess: () => {
        setIsModalSaveOpen(true);
        setModalContent({
          title: 'Sucesso',
          body: 'A vaga foi atualizada com sucesso!',
          onConfirm: () => {
            navigate('/jobs');
            return null;
          },
          onClose: () => {
            navigate('/jobs');
            return null;
          },
        });
      },
      onError: (error) => {
        setIsModalSaveOpen(true);
        setModalContent({
          title: 'Erro',
          body: `Erro ao atualizar a vaga: ${error.message}`,
          onConfirm: () => {
            setIsModalSaveOpen(false);
            return null;
          },
          onClose: () => {
            setIsModalSaveOpen(false);
            return null;
          },
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <Header title={id ? "Atualizar Vaga" : "Criar Vaga"} />
      <div>
        <Link
          to="/jobs"
          className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
          onClick={handleBackOrCancel}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para gestão de vagas
        </Link>
      </div>
      <div className="p-1">
        <div className="flex border-b border-gray-200 mb-4">
          <button
            type="button"
            className={`px-4 py-2 text-lg font-medium custom-button custom-title-button ${activeTab === 'info' ? 'text-[#432B4F] border-b-2 border-[#432B4F]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Informações da Vaga
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-lg font-medium custom-button custom-title-button ${activeTab === 'skills' ? 'text-[#432B4F] border-b-2 border-[#432B4F]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('skills')}
          >
            Competências
          </button>
        </div>
        <div>
          {activeTab === 'info' && (
            <div className="marginbutton30">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {!isReviewer && (
                  <div className="col-span-1 w-full">
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Empresa
                    </label>
                    <select
                      id="empresa"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      disabled={isLoading || isError}
                    >
                      <option value="">Selecione</option>
                      {companyNames?.map((company) => (
                        <option key={company.toLowerCase()} value={company.toLowerCase()}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {!isReviewer && (
                  <div className="col-span-1 w-full">
                    <label
                      htmlFor="departamento"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Departamento
                    </label>
                    <select
                      id="departamento"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="TI">TI</option>
                      <option value="RH">RH</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Vendas">Vendas</option>
                    </select>
                  </div>
                )}
                <div className="col-span-1 md:col-span-2 w-full">
                  <label
                    htmlFor="vaga"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Vaga
                  </label>
                  <input
                    type="text"
                    id="vaga"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={vaga}
                    onChange={(e) => setVaga(e.target.value)}
                  />
                </div>
                <div className="col-span-1 w-full">
                  <label
                    htmlFor="senioridade"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Senioridade
                  </label>
                  <select
                    id="senioridade"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={senioridade}
                    onChange={(e) => setSenioridade(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="junior">Júnior</option>
                    <option value="pleno">Pleno</option>
                    <option value="senior">Sênior</option>
                    <option value="especialista">Especialista</option>
                  </select>
                </div>
                <div className="col-span-1 w-full">
                  <label
                    htmlFor="modelo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Modelo de trabalho
                  </label>
                  <select
                    id="modelo"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={modelo}
                    onChange={(e) => {
                      setModelo(e.target.value);
                      setLocalizacao('');
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div className="col-span-1 w-full">
                  <label
                    htmlFor="localizacao"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Localização
                  </label>
                  <select
                    id="localizacao"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    disabled={modelo === 'Remoto' || modelo === ''}
                  >
                    <option value="">Selecione</option>
                    <option value="São Paulo">São Paulo</option>
                    <option value="Rio de Janeiro">Rio de Janeiro</option>
                    <option value="Belo Horizonte">Belo Horizonte</option>
                    <option value="Curitiba">Curitiba</option>
                  </select>
                </div>
                {!isReviewer && (
                  <div className="col-span-1 w-full">
                    <label
                      htmlFor="regimeContrato"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Regime do Contrato
                    </label>
                    <select
                      id="regimeContrato"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={regimeContrato}
                      onChange={(e) => setRegimeContrato(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="CLT">CLT</option>
                      <option value="CLT Flex">CLT Flex</option>
                      <option value="PJ">PJ</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Estágio">Estágio</option>
                    </select>
                  </div>
                )}
                <div className="col-span-1 w-full">
                  <label
                    htmlFor="responsavel"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Responsável da vaga
                  </label>
                  <select
                    id="responsavel"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="João Silva">João Silva</option>
                    <option value="Maria Oliveira">Maria Oliveira</option>
                    <option value="Carlos Souza">Carlos Souza</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full" />
                <div className="col-span-1 md:col-span-2 lg:col-span-2 w-full">
                  <label
                    htmlFor="observacoes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Observações
                  </label>
                  <textarea
                    id="observacoes"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                  <span className="text-xs text-gray-400 mb-1 block">
                    Opcional
                  </span>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'skills' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="competencia"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Competência
                  </label>
                  <input
                    id="competencia"
                    type="text"
                    placeholder="Competência"
                    value={newCompetencia}
                    onChange={(e) => setNewCompetencia(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="peso"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Peso
                  </label>
                  <select
                    id="peso"
                    value={newPeso}
                    onChange={(e) => setNewPeso(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Selecione</option>
                    <option value="0">Diferencial</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={handleAddCompetencia}
                    className="bg-[#432B4F] text-white px-4 py-2 rounded-lg hover:bg-[#533961] transition-colors w-full"
                    disabled={!newCompetencia || newPeso === ''}
                  >
                    {editIndex !== null ? 'Atualizar' : 'Adicionar'}
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-300 mt-3 w-full marginTopandBottom" />
              <h3 className="custom-heading mb-2">
                Competências adicionadas ({competencias.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 table-rounded marginbutton30">
                  <thead>
                    <tr>
                      <th className="table-header p-2 w-10/12">Competência</th>
                      <th className="table-header p-2 w-1/12">Peso</th>
                      <th className="table-header p-2 w-1/12" />
                    </tr>
                  </thead>
                  <tbody>
                    {competencias.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-gray-300 p-2 text-center rounded-b-lg"
                        >
                          <div className="flex flex-col items-center marginTopandBottom">
                            <span className="block text-lg font-semibold">
                              Nenhuma competência adicionada
                            </span>
                            <span className="block text-sm text-gray-500">
                              Quando novas competências forem adicionadas, elas
                              aparecerão aqui.
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      competencias.map((comp, index) => (
                        <tr key={comp.id}>
                          <td className="table-cell p-2">{comp.competencia}</td>
                          <td className="table-cell p-2">
                            <PesoBadge
                              peso={comp.peso === 0 ? 'Diferencial' : comp.peso}
                            />
                          </td>
                          <td className="table-cell p-2 text-center relative">
                            <button
                              type="button"
                              ref={(el) => setButtonRef(el, index)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                              onClick={() => toggleDropdown(index)}
                            >
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                            {openDropdownIndex === index && (
                              <div
                                ref={(el) => setDropdownRef(el, index)}
                                className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-50"
                                style={{
                                  top:
                                    buttonRefs.current[
                                      index
                                    ]?.getBoundingClientRect().bottom ?? 0,
                                  left: Math.min(
                                    buttonRefs.current[
                                      index
                                    ]?.getBoundingClientRect().left ?? 0,
                                    window.innerWidth - 100,
                                  ),
                                }}
                              >
                                <button
                                  type="button"
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleEditCompetencia(index)}
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleDeleteCompetencia(index)}
                                >
                                  Excluir
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="margin-bottom-120" />
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={handleBackOrCancel}
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-40 sm:w-48"
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg transition-colors w-full sm:w-40 sm:w-48 ${
              isFormValid()
                ? 'bg-[#432B4F] text-white hover:bg-[#533961]'
                : 'bg-[#46265480] text-[#FFFFFF] cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
            onClick={id ? handleUpdateJob : handleCreateJob}
          >
            {id ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cancelar criação da vaga"
        body={
          <div className="flex items-center">
            <X className="w-10 h-10 text-[#D3870D] mr-2" />
            <span>
              Deseja realmente cancelar a criação desta vaga? Todas as
              informações preenchidas até agora serão perdidas e não poderão ser
              recuperadas.
            </span>
          </div>
        }
        onConfirm={handleConfirmCancel}
        confirmText="Cancelar criação"
        cancelText="Voltar"
      />
      <CustomModal
        isOpen={isModalSaveOpen}
        onClose={modalContent.onClose}
        title={modalContent.title}
        body={
          <div className="flex items-center">
            <span>{modalContent.body}</span>
          </div>
        }
        onConfirm={modalContent.onConfirm}
        confirmText="OK"
        cancelText="Fechar"
      />
    </div>
  );
};

export { CreateJobVacancyManage };
