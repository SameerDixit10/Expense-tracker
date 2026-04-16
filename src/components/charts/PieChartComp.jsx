import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useExpense } from '../../context/ExpenseContext';

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function PieChartComp() {
  const { transactions } = useExpense();

  const map = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  const data = Object.entries(map).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="card-hover bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Spending by Category</h3>
        <p className="text-muted-foreground text-sm text-center py-10">No expense data</p>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card-hover bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Spending by Category</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{data.length} categories</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={88} dataKey="value" paddingAngle={3} stroke="none">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip
            formatter={(val) => [`${val.toFixed(2)} (${((val/total)*100).toFixed(0)}%)`, '']}
            contentStyle={{ background: 'hsl(228, 22%, 12%)', border: '1px solid hsl(228, 12%, 22%)', borderRadius: '10px', color: '#e5e7eb', fontSize: '12px', padding: '8px 12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
