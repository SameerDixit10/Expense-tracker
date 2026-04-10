import { formatCurrency } from '../../utils/helpers';
import { useExpense } from '../../context/ExpenseContext';
import { MdArrowUpward, MdArrowDownward, MdEdit, MdDelete } from 'react-icons/md';

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const { currency } = useExpense();
  const isIncome = transaction.type === 'income';

  return (
    <div className="card-hover flex items-center justify-between p-3 bg-card border border-border rounded-lg cursor-default">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            isIncome ? 'bg-income/15 text-income' : 'bg-expense/15 text-expense'
          }`}
        >
          {isIncome ? <MdArrowUpward /> : <MdArrowDownward />}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{transaction.category}</p>
          <p className="text-xs text-muted-foreground">
            {transaction.date}
            {transaction.note && ` · ${transaction.note}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-semibold text-sm ${isIncome ? 'text-income' : 'text-expense'}`}>
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount, currency)}
        </span>
        <button onClick={() => onEdit(transaction)} className="text-muted-foreground hover:text-primary text-sm">
          <MdEdit />
        </button>
        <button onClick={() => onDelete(transaction.id)} className="text-muted-foreground hover:text-expense text-sm">
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
