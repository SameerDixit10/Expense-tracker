import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Sidebar from './components/ui/Sidebar';
import Toast from './components/ui/Toast';
import Dashboard from './pages/Dashboard';
import './index.css'

export default function App() {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <main className="flex-1 p-5 pt-16 md:pt-5">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
        <Toast />
      </BrowserRouter>
    </ExpenseProvider>
  );
}