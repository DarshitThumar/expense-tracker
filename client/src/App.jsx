import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import History from './components/History';
import Categories from './components/Categories';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 font-sans">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/edit/:id" element={<AddTransaction />} />
              <Route path="/history" element={<History />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;