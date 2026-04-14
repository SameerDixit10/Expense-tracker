import { formatCurrency, formatDateDDMMYY } from '../../utils/helpers';
import { useExpense } from '../../context/ExpenseContext';
import { ArrowUpRight, ArrowDownRight, Pencil, Trash2 } from 'lucide-react';

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const { currency } = useExpense();
  const isIncome = transaction.type === 'income';

  return (
    <div className="card-hover flex items-center justify-between p-3 bg-card border border-border rounded-lg cursor-default">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isIncome ? 'bg-income/15 text-income' : 'bg-expense/15 text-expense'
          }`}
        >
          {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{transaction.category}</p>
          <p className="text-xs text-muted-foreground">
            {formatDateDDMMYY(transaction.date)}
            {transaction.note && ` · ${transaction.note}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-semibold text-sm ${isIncome ? 'text-income' : 'text-expense'}`}>
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount, currency)}
        </span>
        <button onClick={() => onEdit(transaction)} className="text-muted-foreground hover:text-primary">
          <Pencil size={14} />
        </button>
        <button onClick={() => onDelete(transaction.id)} className="text-muted-foreground hover:text-expense">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
