import TransactionItem from './TransactionItem';
import { Inbox } from 'lucide-react';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Inbox size={40} className="mx-auto mb-2 opacity-50" />
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map(t => (
        <TransactionItem
          key={t.id}
          transaction={t}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
