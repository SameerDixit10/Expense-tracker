import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { supportedCurrencies, formatCurrency } from '../utils/helpers';
import { toast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import { Plus, X } from 'lucide-react';

export default function Settings() {
  const { currency, dispatch, expenseCategories, incomeCategories } = useExpense();
  const [newExpenseCat, setNewExpenseCat] = useState('');
  const [newIncomeCat, setNewIncomeCat] = useState('');

  const handleCurrencyChange = (e) => {
    dispatch({ type: 'SET_CURRENCY', payload: e.target.value });
    toast(`Currency changed to ${e.target.value}`);
  };

  const addExpenseCategory = () => {
    const name = newExpenseCat.trim();
    if (!name) return;
    if (expenseCategories.includes(name)) {
      toast('Category already exists');
      return;
    }
    dispatch({ type: 'ADD_EXPENSE_CATEGORY', payload: name });
    toast(`Added expense category: ${name}`);
    setNewExpenseCat('');
  };

  const addIncomeCategory = () => {
    const name = newIncomeCat.trim();
    if (!name) return;
    if (incomeCategories.includes(name)) {
      toast('Category already exists');
      return;
    }
    dispatch({ type: 'ADD_INCOME_CATEGORY', payload: name });
    toast(`Added income category: ${name}`);
    setNewIncomeCat('');
  };

  const inputClass = "border border-border rounded px-3 py-2 text-sm bg-card text-foreground outline-none focus:border-primary";

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">App preferences</p>
      </div>

      {/* Currency */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Currency</h2>
        <p className="text-xs text-muted-foreground mb-3">Choose how amounts are displayed</p>
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className={`${inputClass} w-full mb-4`}
        >
          {supportedCurrencies.map(c => (
            <option key={c} value={c}>{c} — {formatCurrency(1234.56, c)}</option>
          ))}
        </select>
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Preview</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(1234.56, currency)}</p>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Expense Categories</h2>
        <p className="text-xs text-muted-foreground mb-3">Manage your expense categories</p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newExpenseCat}
            onChange={e => setNewExpenseCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addExpenseCategory()}
            placeholder="New category name..."
            className={`${inputClass} flex-1`}
          />
          <Button onClick={addExpenseCategory} className="flex items-center gap-1">
            <Plus size={14} /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {expenseCategories.map(c => (
            <span key={c} className="flex items-center gap-1.5 bg-muted text-foreground text-sm px-3 py-1.5 rounded-full">
              {c}
              <button
                onClick={() => {
                  dispatch({ type: 'REMOVE_EXPENSE_CATEGORY', payload: c });
                  toast(`Removed: ${c}`);
                }}
                className="text-muted-foreground hover:text-expense"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Income Categories */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Income Categories</h2>
        <p className="text-xs text-muted-foreground mb-3">Manage your income categories</p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newIncomeCat}
            onChange={e => setNewIncomeCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addIncomeCategory()}
            placeholder="New category name..."
            className={`${inputClass} flex-1`}
          />
          <Button onClick={addIncomeCategory} className="flex items-center gap-1">
            <Plus size={14} /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {incomeCategories.map(c => (
            <span key={c} className="flex items-center gap-1.5 bg-muted text-foreground text-sm px-3 py-1.5 rounded-full">
              {c}
              <button
                onClick={() => {
                  dispatch({ type: 'REMOVE_INCOME_CATEGORY', payload: c });
                  toast(`Removed: ${c}`);
                }}
                className="text-muted-foreground hover:text-expense"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
