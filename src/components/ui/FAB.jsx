import { Plus } from 'lucide-react';

export default function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 z-40 flex items-center justify-center transition-transform hover:scale-105"
    >
      <Plus size={24} />
    </button>
  );
}
