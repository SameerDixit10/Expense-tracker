import PieChartComp from '../components/charts/PieChartComp';
import AreaChartComp from '../components/charts/AreaChartComp';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/helpers';
import { CalendarDays, Hash, Tag } from 'lucide-react';

export default function Analytics() {
  const { transactions, summary, currency } = useExpense();
  const categoryCount = new Set(transactions.map(t => t.category)).size;

  const stats = [
    { label: 'Avg Daily Spend', value: formatCurrency(transactions.length ? summary.totalExpense / 30 : 0, currency), icon: CalendarDays },
    { label: 'Total Transactions', value: transactions.length, icon: Hash },
    { label: 'Categories Used', value: categoryCount, icon: Tag },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Insights into your spending</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card-hover bg-card border border-border rounded-xl p-4 text-center cursor-default">
              <Icon size={24} className="mx-auto text-muted-foreground" />
              <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <PieChartComp />
        <AreaChartComp />
      </div>
    </div>
  );
}
