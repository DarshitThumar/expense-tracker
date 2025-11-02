import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Dashboard = () => {
  const { transactions, loading } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 5);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-gray-500 font-medium">Your Balance</h4>
          <p className="text-3xl font-bold text-gray-800">{formatCurrency(total)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-green-500 font-medium">Income</h4>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(income)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-red-500 font-medium">Expenses</h4>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(expense)}</p>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <h3 className="text-xl font-bold mb-4 text-gray-700">Recent Transactions</h3>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <ul className="divide-y divide-gray-200">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <li key={transaction._id} className="py-4 flex justify-between items-center">
                <div className="flex items-center">
                    {transaction.amount > 0 ? 
                        <ArrowUpRight className="text-green-500 mr-3"/> : 
                        <ArrowDownLeft className="text-red-500 mr-3"/>
                    }
                    <div>
                        <p className="font-semibold text-gray-800">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 py-4">No recent transactions. <Link to="/add" className="text-indigo-600 hover:underline">Add one!</Link></p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;