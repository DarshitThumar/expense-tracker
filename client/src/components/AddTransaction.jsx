import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate, useParams } from 'react-router-dom';

const AddTransaction = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  
  const { addTransaction, updateTransaction, transactions } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL for editing

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const transactionToEdit = transactions.find(t => t._id === id);
      if (transactionToEdit) {
        setDescription(transactionToEdit.description);
        // Always show a positive amount in the form
        setAmount(Math.abs(transactionToEdit.amount));
        setType(transactionToEdit.type);
        setCategory(transactionToEdit.category);
        setDate(new Date(transactionToEdit.date).toISOString().slice(0, 10));
      }
    }
  }, [id, transactions, isEditing]);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      description,
      amount: +amount, // Convert amount string to number
      type,
      category,
      date,
    };

    if (isEditing) {
      updateTransaction(id, newTransaction);
    } else {
      addTransaction(newTransaction);
    }

    navigate('/history'); // Redirect to history after submitting
  };
  
  const categories = ["Food", "Shopping", "Transport", "Entertainment", "Health", "Utilities", "Salary", "Freelance", "Other"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto border border-gray-100">
        <form onSubmit={onSubmit}>
          {/* Transaction Type */}
          <div className="mb-6 flex justify-center space-x-4">
            <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer w-full justify-center ${type === 'income' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
              <input type="radio" name="type" value="income" checked={type === 'income'} onChange={(e) => setType(e.target.value)} className="hidden" />
              <span className="font-semibold text-gray-700">Income</span>
            </label>
            <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer w-full justify-center ${type === 'expense' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
              <input type="radio" name="type" value="expense" checked={type === 'expense'} onChange={(e) => setType(e.target.value)} className="hidden" />
              <span className="font-semibold text-gray-700">Expense</span>
            </label>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 mb-1">Description</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description..." required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-600 mb-1">Amount</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Category */}
          <div className="mb-4">
             <label htmlFor="category" className="block text-gray-600 mb-1">Category</label>
             <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
          </div>
          
          {/* Date */}
          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-600 mb-1">Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md">
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
