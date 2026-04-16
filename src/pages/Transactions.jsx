import { useState, useMemo } from 'react';
import TransactionList from '../components/transactions/TransactionList';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionModal from '../components/TransactionModal';
import Button from '../components/ui/Button';
import { useExpense } from '../context/ExpenseContext';
import { filterTransactions } from '../utils/helpers';
import { exportToCSV, exportToJSON } from '../utils/export';
import { toast } from '../components/ui/Toast';

export default function Transactions() {
  const { transactions, dispatch } = useExpense();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [filters, setFilters] = useState({ search: '', type: '', category: '' });

  const filtered = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters]
  );

  const handleEdit = t => { setEditTx(t); setModalOpen(true); };
  const handleDelete = id => { dispatch({ type: 'DELETE_TRANSACTION', payload: id }); toast('Transaction deleted'); };
  const handleClose = () => { setModalOpen(false); setEditTx(null); };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-xl font-bold text-foreground">Transactions</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportToCSV(filtered)}>CSV</Button>
          <Button variant="outline" onClick={() => exportToJSON(filtered)}>JSON</Button>
          <Button onClick={() => setModalOpen(true)}>+ Add</Button>
        </div>
      </div>

      <TransactionFilters filters={filters} setFilters={setFilters} />
      <TransactionList transactions={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      <TransactionModal isOpen={modalOpen} onClose={handleClose} editTransaction={editTx} />
    </div>
  );
}
