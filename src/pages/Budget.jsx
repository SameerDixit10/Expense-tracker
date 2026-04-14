import { Target } from 'lucide-react';

export default function Budget() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Target size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Budget</h1>
      </div>
      <div className="text-center py-12 text-muted-foreground">
        <Target size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">Budget management coming soon...</p>
        <p className="text-sm">Set spending limits and track your budget</p>
      </div>
    </div>
  );
}