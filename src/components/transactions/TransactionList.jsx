import TransactionItem from './TransactionItem';
import { MdInbox } from 'react-icons/md';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <MdInbox className="text-4xl mb-2 mx-auto" />
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
