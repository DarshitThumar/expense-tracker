import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Shows total expenses grouped by category
const Categories = () => {
  const { transactions, loading } = useContext(GlobalContext);

  // Group and sum expenses by category (memoized)
  const expenseByCategory = useMemo(() => {
  // Only consider expense transactions
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = {};

  // Sum absolute amounts per category
    expenses.forEach(transaction => {
      const { category, amount } = transaction;
      if (categoryMap[category]) {
        categoryMap[category] += Math.abs(amount);
      } else {
        categoryMap[category] = Math.abs(amount);
      }
    });

  // Convert to [category, total] and sort descending
    return Object.entries(categoryMap).sort(([, a], [, b]) => b - a);
  }, [transactions]);

  // Format INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  // Loading state
  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Expense by Category</h2>
       <div className="bg-white rounded-xl shadow-md">
        <ul className="divide-y divide-gray-200">
            {expenseByCategory.length > 0 ? (
                // Render each category and total
                expenseByCategory.map(([category, total]) => (
                    <li key={category} className="p-4 flex justify-between items-center">
                        <p className="font-semibold text-gray-800">{category}</p>
                        <span className="font-bold text-red-600">{formatCurrency(total)}</span>
                    </li>
                ))
            ) : (
                // Empty state
                <p className="text-center text-gray-500 p-8">No expenses to show.</p>
            )}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
