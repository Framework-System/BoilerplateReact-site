import { useCreateUsers } from '@/hooks/user/useCreateUsers';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, X, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { CustomModal } from '@/components/CustomModal';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChangePasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<ChangePasswordFormInputs>();
  const { mutate: updateUser } = useCreateUsers();
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: ChangePasswordFormInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'As senhas não coincidem' });
      return;
    }

    if (data.newPassword === data.currentPassword) {
      setError('newPassword', { type: 'manual', message: 'A nova senha não pode ser igual à senha atual' });
      return;
    }

    if (!user) {
      setModalContent({ title: 'Erro', body: 'Usuário não autenticado' });
      setIsSuccessModalOpen(true);
      return;
    }

    updateUser({ id: user.id, senha: data.newPassword, senhaAntiga: data.currentPassword }, {
      onSuccess: () => {
        setModalContent({ title: 'Sucesso', body: 'Senha atualizada com sucesso' });
        setIsSuccessModalOpen(true);
      },
      onError: (error) => {
        setModalContent({ title: 'Erro', body: `Erro ao atualizar a senha: ${error.message}` });
        setIsSuccessModalOpen(true);
      },
    });
  };

  useEffect(() => {
    setIsSuccessModalOpen(false);
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      reset();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <button type="button" onClick={onClose} className="absolute top-2 right-2">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-[#5F3473] mb-4">Trocar Senha</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Senha Atual</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  {...register('currentPassword', { required: 'Senha atual é obrigatória' })}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nova Senha</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword', { required: 'Nova senha é obrigatória' })}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', { required: 'Confirmação de senha é obrigatória' })}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-white text-[#5F3473] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Cancelar</button>
              <button type="submit" className="bg-[#5F3473] text-white px-4 py-2 rounded-lg hover:bg-[#533961] transition-colors">Trocar Senha</button>
            </div>
          </form>
        </div>
      </div>
      <CustomModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={modalContent.title}
        body={<div>{modalContent.body}</div>}
        onConfirm={() => setIsSuccessModalOpen(false)}
        confirmText="OK"
        cancelText="Fechar"
      />
    </>
  );
};

export { ChangePasswordModal };