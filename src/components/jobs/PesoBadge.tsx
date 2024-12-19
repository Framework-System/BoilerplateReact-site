import type React from 'react';

const PesoBadge: React.FC<{ peso: number | string }> = ({ peso }) => {
  let bgColor = '';
  let textColor = '';

  switch (peso) {
    case 1:
      bgColor = '#E9F4EE';
      textColor = '#083F18';
      break;
    case 2:
      bgColor = '#FEF7E7';
      textColor = '#644508';
      break;
    case 3:
      bgColor = '#FEE9EA';
      textColor = '#B7153E';
      break;
    case 'Diferencial':
      bgColor = '#F4EAFF';
      textColor = '#5F3473';
      break;
    default:
      bgColor = '#FFFFFF';
      textColor = '#000000';
      break;
  }

  return (
    <div
      className="flex items-center justify-center rounded-full w-full h-full"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {peso}
    </div>
  );
};

export default PesoBadge;
