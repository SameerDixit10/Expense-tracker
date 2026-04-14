import { useExpense } from '../../context/ExpenseContext';

export default function TransactionFilters({ filters, setFilters }) {
  const { expenseCategories, incomeCategories } = useExpense();
  const allCategories = [...new Set([...expenseCategories, ...incomeCategories])];

  const selectClass = "border border-border rounded px-3 py-1.5 text-sm bg-card text-foreground outline-none focus:border-primary";

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={e => setFilters({ ...filters, search: e.target.value })}
        className="border border-border rounded px-3 py-1.5 text-sm flex-1 min-w-[150px] outline-none focus:border-primary bg-card text-foreground"
      />
      <select
        value={filters.type}
        onChange={e => setFilters({ ...filters, type: e.target.value })}
        className={selectClass}
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
        className={selectClass}
      >
        <option value="">All Categories</option>
        {allCategories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
