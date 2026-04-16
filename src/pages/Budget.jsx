import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, getBudgetStatus } from '../utils/helpers';
import Button from '../components/ui/Button';
import { toast } from '../components/ui/Toast';
import { X, ClipboardList } from 'lucide-react';

export default function Budget() {
  const { budgets, summary, currency, dispatch, expenseCategories } = useExpense();
  const [selectedCat, setSelectedCat] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleSet = () => {
    if (!selectedCat || !budgetAmount || parseFloat(budgetAmount) <= 0) {
      toast('Please select a category and enter a valid amount');
      return;
    }
    dispatch({ type: 'SET_BUDGET', payload: { category: selectedCat, amount: parseFloat(budgetAmount) } });
    toast(`Budget set for ${selectedCat}`);
    setSelectedCat('');
    setBudgetAmount('');
  };

  const handleRemove = (cat) => {
    dispatch({ type: 'REMOVE_BUDGET', payload: cat });
    toast(`Budget removed for ${cat}`);
  };

  const categoryTotals = summary.categoryTotals || {};

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Set spending limits per category</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Set a Budget</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            className="border border-border rounded px-3 py-2 text-sm bg-card text-foreground flex-1 min-w-[140px] outline-none focus:border-primary"
            key={expenseCategories.length}
          >
            <option value="">Pick category</option>
            {expenseCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={budgetAmount}
            onChange={e => setBudgetAmount(e.target.value)}
            min="0"
            step="0.01"
            className="border border-border rounded px-3 py-2 text-sm bg-card text-foreground w-32 outline-none focus:border-primary"
          />
          <Button onClick={handleSet}>Set</Button>
        </div>
      </div>

      {Object.keys(budgets).length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <ClipboardList size={40} className="mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No budgets set yet. Add one above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(budgets).map(([cat, limit]) => {
            const spent = categoryTotals[cat] || 0;
            const status = getBudgetStatus(spent, limit);
            const pct = Math.min((spent / limit) * 100, 100);

            return (
              <div key={cat} className="card-hover bg-card border border-border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cat}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(spent, currency)} of {formatCurrency(limit, currency)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {status && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        status.level === 'over' ? 'bg-expense/15 text-expense' :
                        status.level === 'warning' ? 'bg-yellow-500/15 text-yellow-600' :
                        'bg-income/15 text-income'
                      }`}>
                        {status.label}
                      </span>
                    )}
                    <button
                      onClick={() => handleRemove(cat)}
                      className="text-muted-foreground hover:text-expense"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      status?.level === 'over' ? 'bg-expense' :
                      status?.level === 'warning' ? 'bg-yellow-500' :
                      'bg-income'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-right text-xs text-muted-foreground mt-1">{Math.round(pct)}%</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
