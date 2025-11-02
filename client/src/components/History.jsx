import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  // Shows transaction history with edit/delete actions
  const { transactions, deleteTransaction, loading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Navigate to edit page for given transaction id
    navigate(`/edit/${id}`);
  };

  const formatCurrency = (amount) => {
    // Format numbers as Indian Rupees
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Transaction History</h2>
      <div className="bg-white rounded-xl shadow-md">
        <ul className="divide-y divide-gray-200">
      {transactions.map(transaction => (
            <li key={transaction._id} className="p-4 flex justify-between items-center group hover:bg-gray-50 transition">
                <div>
                    <p className="font-semibold text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()} - <span className="font-medium">{transaction.category}</span></p>
                </div>
              <div className="flex items-center">
                <span className={`font-bold text-lg mr-6 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                </span>
        {/* Edit / Delete buttons (appear on hover) */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => handleEdit(transaction._id)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
            <Edit size={18} />
          </button>
          <button onClick={() => deleteTransaction(transaction._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full">
            <Trash2 size={18} />
          </button>
        </div>
              </div>
            </li>
          ))}
        </ul>
        {transactions.length === 0 && <p className="text-center text-gray-500 p-8">No transaction history found.</p>}
      </div>
    </div>
  );
};

export default History;
