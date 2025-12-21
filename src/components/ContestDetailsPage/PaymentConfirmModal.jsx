import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const PaymentConfirmModal = ({ open, onClose, entryFee, onPay }) => {
  const { theme } = useTheme();

  const modalBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 w-96 shadow-xl ${modalBg}`}>
        <h2 className={`text-lg font-bold mb-4 ${textColor}`}>Payment Confirmation</h2>
        <p className={`${textColor} mb-6`}>Entry Fee: ${entryFee}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 border ${borderColor} rounded-md ${hoverBg} transition-colors ${textColor}`}
          >
            Cancel
          </button>
          <button
            onClick={onPay}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmModal;
