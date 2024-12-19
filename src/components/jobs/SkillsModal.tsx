import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  isOpen,
  onClose,
  children,
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
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        {children}
      </div>
    </div>
  );
};

export { SkillsModal };
