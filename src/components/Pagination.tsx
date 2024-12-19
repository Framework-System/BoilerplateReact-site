import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        type="button"
        onClick={handlePreviousPage}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={`page-${pageNumber}`}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg ${
              currentPage === pageNumber
                ? 'bg-[#432B4F] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        type="button"
        onClick={handleNextPage}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};
