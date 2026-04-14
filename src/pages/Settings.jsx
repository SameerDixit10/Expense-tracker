import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>
      <div className="text-center py-12 text-muted-foreground">
        <SettingsIcon size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">Settings coming soon...</p>
        <p className="text-sm">Customize your app preferences</p>
      </div>
    </div>
  );
}