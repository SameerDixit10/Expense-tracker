import { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { useExpense } from '../context/ExpenseContext';
import { generateId } from '../utils/helpers';
import { toast } from './ui/Toast';

export default function TransactionModal({ isOpen, onClose, editTransaction }) {
  const { dispatch, expenseCategories, incomeCategories } = useExpense();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setAmount(editTransaction.amount.toString());
      setCategory(editTransaction.category);
      setDate(editTransaction.date);
      setNote(editTransaction.note || '');
    } else {
      setType('expense');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
    }
    setErrors({});
  }, [editTransaction, isOpen]);

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!amount || parseFloat(amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!category) errs.category = 'Pick a category';
    if (!date) errs.date = 'Pick a date';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const txn = {
      id: editTransaction ? editTransaction.id : generateId(),
      type,
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim(),
    };

    dispatch({
      type: editTransaction ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION',
      payload: txn,
    });
    toast(editTransaction ? 'Transaction updated!' : 'Transaction added!');
    onClose();
  };

  const inputClass = "w-full border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary bg-card text-foreground";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editTransaction ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex bg-muted rounded p-1 gap-1">
          <button
            type="button"
            onClick={() => { setType('expense'); setCategory(''); }}
            className={`flex-1 py-1.5 rounded text-sm font-medium transition-colors ${
              type === 'expense' ? 'bg-expense text-white' : 'text-muted-foreground'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => { setType('income'); setCategory(''); }}
            className={`flex-1 py-1.5 rounded text-sm font-medium transition-colors ${
              type === 'income' ? 'bg-income text-white' : 'text-muted-foreground'
            }`}
          >
            Income
          </button>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Amount</label>
          <input type="number" step="0.01" min="0" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className={inputClass} />
          {errors.amount && <p className="text-expense text-xs mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
            <option value="">Select category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-expense text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
          {errors.date && <p className="text-expense text-xs mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Note (optional)</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note..." className={inputClass} />
        </div>

        <Button type="submit" className="w-full">
          {editTransaction ? 'Update' : 'Add'} Transaction
        </Button>
      </form>
    </Modal>
  );
}
