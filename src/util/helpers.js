const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CNY: '¥',
  BRL: 'R$',
};

export const supportedCurrencies = Object.keys(currencySymbols);

export function formatCurrency(amount, currency = 'USD') {
  const symbol = currencySymbols[currency] || '$';
  const num = Number(amount);
  if (currency === 'JPY') return symbol + Math.round(num).toLocaleString();
  return symbol + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function calculateSummary(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  let topCategory = null;
  let topAmount = 0;
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > topAmount) {
      topCategory = cat;
      topAmount = amt;
    }
  }

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    topCategory: topCategory ? { name: topCategory, amount: topAmount } : null,
    categoryTotals,
  };
}

export function filterTransactions(transactions, filters) {
  return transactions.filter(t => {
    if (filters.type && t.type !== filters.type) return false;
    if (filters.category && t.category !== filters.category) return false;
    if (
      filters.search &&
      !t.category.toLowerCase().includes(filters.search.toLowerCase()) &&
      !(t.note || '').toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });
}

export function getBudgetStatus(spent, budget) {
  if (!budget || budget <= 0) return null;
  const pct = (spent / budget) * 100;
  if (pct >= 100) return { pct, level: 'over', label: 'Over budget!' };
  if (pct >= 80) return { pct, level: 'warning', label: 'Almost there' };
  return { pct, level: 'ok', label: 'On track' };
}
