import { useState, useEffect } from 'react';

let showToastFn = null;

export function toast(message) {
  if (showToastFn) showToastFn(message);
}

export default function Toast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showToastFn = msg => {
      setMessage(msg);
      setVisible(true);
      setTimeout(() => setVisible(false), 2500);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-6 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded shadow-lg text-sm z-50">
      {message}
    </div>
  );
}
