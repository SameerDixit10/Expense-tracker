export function exportToCSV(transactions) {
  const headers = 'Type,Category,Amount,Date,Note\n';
  const rows = transactions
    .map(t => `${t.type},${t.category},${t.amount},${t.date},${t.note || ''}`)
    .join('\n');
  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
}

export function exportToJSON(transactions) {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.json';
  a.click();
}
