import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, generateId, getBudgetStatus } from '../utils/helpers';
import TransactionModal from '../components/TransactionModal';
import FAB from '../components/ui/FAB';
import { MdAccountBalanceWallet, MdTrendingUp, MdTrendingDown, MdWarning, MdEmojiEvents, MdInbox, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

export default function Dashboard() {
  const { transactions, summary, currency, budgets, dispatch } = useExpense();
  const [modalOpen, setModalOpen] = useState(false);

  const loadSample = () => {
    const samples = [
      { id: generateId(), type: 'income', category: 'Salary', amount: 3000, date: '2025-03-01', note: 'Monthly salary' },
      { id: generateId(), type: 'expense', category: 'Food', amount: 150, date: '2025-03-05', note: 'Groceries' },
      { id: generateId(), type: 'expense', category: 'Transport', amount: 50, date: '2025-03-07', note: 'Gas' },
      { id: generateId(), type: 'expense', category: 'Shopping', amount: 200, date: '2025-03-10', note: 'New shoes' },
      { id: generateId(), type: 'expense', category: 'Bills', amount: 120, date: '2025-03-12', note: 'Electricity' },
      { id: generateId(), type: 'income', category: 'Freelance', amount: 500, date: '2025-03-15', note: 'Side project' },
      { id: generateId(), type: 'expense', category: 'Entertainment', amount: 80, date: '2025-03-18', note: 'Movies' },
      { id: generateId(), type: 'expense', category: 'Health', amount: 60, date: '2025-03-20', note: 'Pharmacy' },
      { id: generateId(), type: 'expense', category: 'Food', amount: 95, date: '2025-04-02', note: 'Dinner' },
      { id: generateId(), type: 'income', category: 'Gift', amount: 100, date: '2025-04-05', note: 'Birthday money' },
    ];
    dispatch({ type: 'LOAD_SAMPLE', payload: samples });
  };

  const cards = [
    { label: 'Balance', value: formatCurrency(summary.balance, currency), accent: 'border-l-4 border-l-primary', icon: MdAccountBalanceWallet },
    { label: 'Income', value: formatCurrency(summary.totalIncome, currency), accent: 'border-l-4 border-l-income', icon: MdTrendingUp },
    { label: 'Expenses', value: formatCurrency(summary.totalExpense, currency), accent: 'border-l-4 border-l-expense', icon: MdTrendingDown },
  ];

  // Budget alerts
  const categoryTotals = summary.categoryTotals || {};
  const alerts = Object.entries(budgets)
    .map(([cat, limit]) => {
      const spent = categoryTotals[cat] || 0;
      const status = getBudgetStatus(spent, limit);
      return status && status.level !== 'ok' ? { cat, spent, limit, status } : null;
    })
    .filter(Boolean);

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Overview of your finances</p>
        </div>
        {transactions.length === 0 && (
          <button onClick={loadSample} className="text-sm text-primary hover:underline font-medium">
            Load sample data
          </button>
        )}
      </div>

      {/* Budget alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2 mb-4">
          {alerts.map(a => (
            <div key={a.cat} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border ${
              a.status.level === 'over'
                ? 'bg-expense/10 border-expense/30 text-expense'
                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600'
            }`}>
              <MdWarning className="text-lg" />
              <span className="font-medium">{a.cat}:</span>
              <span>{formatCurrency(a.spent, currency)} / {formatCurrency(a.limit, currency)} — {a.status.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`card-hover bg-card border border-border rounded-xl p-4 cursor-default ${c.accent}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{c.label}</p>
              <c.icon className="text-lg" />
            </div>
            <p className="text-2xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
        <div className="card-hover bg-card border border-border rounded-xl p-4 cursor-default border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Top Category</p>
            <MdEmojiEvents className="text-lg" />
          </div>
          <p className="text-xl font-bold text-foreground">
            {summary.topCategory ? summary.topCategory.name : '—'}
          </p>
          {summary.topCategory && (
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(summary.topCategory.amount, currency)}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
        {transactions.length > 5 && (
          <a href="/transactions" className="text-sm text-primary hover:underline">View all →</a>
        )}
      </div>
      {transactions.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <MdInbox className="text-4xl mb-3 mx-auto" />
          <p className="text-sm text-muted-foreground">No transactions yet. Click + to add one!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.slice(0, 5).map(t => (
            <div key={t.id} className="card-hover flex justify-between items-center bg-card border border-border rounded-xl p-3.5 cursor-default">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium ${
                  t.type === 'income' ? 'bg-income/10 text-income' : 'bg-expense/10 text-expense'
                }`}>
                  {t.type === 'income' ? <MdArrowUpward /> : <MdArrowDownward />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.category}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, currency)}
              </span>
            </div>
          ))}
        </div>
      )}

      <FAB onClick={() => setModalOpen(true)} />
      <TransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
