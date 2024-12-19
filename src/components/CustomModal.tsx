import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: ReactNode;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white px-0 py-4 rounded-lg shadow-lg max-w-2xl w-full relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 mt-3.25"
          style={{ marginTop: '13px' }}
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-[#5F3473] mb-4 ml-4 mr-auto">
          {title}
        </h2>
        <hr className="border-gray-300 my-4 w-full" />
        <div className="m-4">{body}</div>
        <hr className="border-gray-300 my-4 w-full" />
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 px-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-[#5F3473] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-40"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#5F3473] text-white px-4 py-2 rounded-lg hover:bg-[#533961] transition-colors w-full sm:w-40"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CustomModal };
