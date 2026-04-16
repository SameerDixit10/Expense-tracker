import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { useExpense } from '../../context/ExpenseContext';

export default function AreaChartComp() {
  const { transactions } = useExpense();

  const monthMap = {};
  transactions.forEach(t => {
    const month = t.date.slice(0, 7);
    if (!monthMap[month]) monthMap[month] = { income: 0, expense: 0 };
    if (t.type === 'income') monthMap[month].income += t.amount;
    else monthMap[month].expense += t.amount;
  });

  const data = Object.keys(monthMap).sort().map(month => ({
    month, income: monthMap[month].income, expense: monthMap[month].expense,
  }));

  if (data.length === 0) {
    return (
      <div className="card-hover bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Monthly Trend</h3>
        <p className="text-muted-foreground text-sm text-center py-10">No data yet</p>
      </div>
    );
  }

  return (
    <div className="card-hover bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Monthly Trend</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{data.length} months</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 12%, 20%)" strokeOpacity={0.4} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220, 9%, 50%)' }} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 9%, 50%)' }} />
          <Tooltip
            formatter={val => `$${val.toFixed(2)}`}
            contentStyle={{ background: 'hsl(228, 22%, 12%)', border: '1px solid hsl(228, 12%, 22%)', borderRadius: '10px', color: '#e5e7eb', fontSize: '12px', padding: '8px 12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)" />
          <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
