import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, CreditCard, BarChart3, Target, Settings,
  Sun, Moon, Menu, X
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: CreditCard },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
      isActive
        ? 'bg-primary text-primary-foreground font-medium shadow-sm'
        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
    }`;

  const handleNavClick = () => {
    setIsOpen(false); // Close sidebar when navigating
    setMobileOpen(false); // Also close mobile sidebar
  };

  const logo = (
    <div className="flex items-center gap-2.5 mb-8 px-1">
      <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
        E
      </div>
      <div>
        <h1 className="text-base font-bold text-foreground leading-tight">ExpenseTracker</h1>
        <p className="text-[10px] text-muted-foreground">Manage your money</p>
      </div>
    </div>
  );

  const sidebarContent = (
    <>
      {logo}
      <nav className="space-y-1 flex-1">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass} onClick={handleNavClick}>
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-border pt-3 mt-3">
        <button
          onClick={() => setDark(!dark)}
          className="w-full text-sm text-muted-foreground hover:text-foreground flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Top bar with menu trigger - only on mobile */}
      <div className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-b border-border z-30 px-4 py-3 flex justify-between items-center md:hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold">E</div>
          <span className="font-bold text-foreground text-sm">ExpenseTracker</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="text-muted-foreground hover:text-foreground p-1">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground p-1">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Hamburger menu button for desktop when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 hidden md:block bg-card border border-border rounded-lg p-2 shadow-sm hover:bg-accent transition-all"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Desktop sidebar - conditionally visible */}
      {isOpen && (
        <div className="hidden md:flex md:w-64 md:flex-col md:bg-card md:border-r md:border-border md:p-4 md:fixed md:left-0 md:top-0 md:h-full md:z-20">
          <button onClick={() => setIsOpen(false)} className="self-end p-1 rounded hover:bg-accent mb-2">
            <X size={16} />
          </button>
          {sidebarContent}
        </div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 p-4 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        {sidebarContent}
      </div>
    </>
  );
}
