import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Sidebar from './components/ui/Sidebar';
import Toast from './components/ui/Toast';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import Settings from './pages/Settings';
import './index.css'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ExpenseProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className={`flex-1 p-5 pt-12 md:pt-5 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0 md:pl-16'}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        <Toast />
      </BrowserRouter>
    </ExpenseProvider>
  );
}