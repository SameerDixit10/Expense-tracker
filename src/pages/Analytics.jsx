import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
      </div>
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">Analytics coming soon...</p>
        <p className="text-sm">Track your spending patterns and insights</p>
      </div>
    </div>
  );
}