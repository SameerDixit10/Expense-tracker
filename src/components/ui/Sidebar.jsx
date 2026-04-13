import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdBarChart, MdCreditCard, MdTrendingUp, MdTrackChanges, MdSettings, MdWbSunny, MdNightlight, MdMenu } from 'react-icons/md';

export default function Sidebar() {
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
    { to: '/', label: 'Dashboard', icon: MdBarChart },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
      isActive
        ? 'bg-primary text-primary-foreground font-medium shadow-sm'
        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
    }`;

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

  return (
    <>
      <aside className="w-60 bg-sidebar border-r border-border min-h-screen p-4 hidden md:flex md:flex-col">
        {logo}
        <nav className="space-y-1 flex-1">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              <link.icon className="text-base" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border pt-3 mt-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-full text-sm text-muted-foreground hover:text-foreground flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
          >
            {dark ? <MdWbSunny className="text-base" /> : <MdNightlight className="text-base" />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-b border-border z-30 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold">E</div>
          <span className="font-bold text-foreground text-sm">ExpenseTracker</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="text-lg">{dark ? <MdWbSunny /> : <MdNightlight />}</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground text-xl"><MdMenu /></button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)}>
          <div className="bg-card w-60 h-full p-4" onClick={e => e.stopPropagation()}>
            {logo}
            <nav className="space-y-1">
              {links.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass} onClick={() => setMobileOpen(false)}>
                  <link.icon className="text-base" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
