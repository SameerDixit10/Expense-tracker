import { defaultExpenseCategories, defaultIncomeCategories } from '../data/categories';

export const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
  budgets: JSON.parse(localStorage.getItem('budgets') || '{}'),
  currency: localStorage.getItem('currency') || 'USD',
  expenseCategories: JSON.parse(localStorage.getItem('expenseCategories') || 'null') || [...defaultExpenseCategories],
  incomeCategories: JSON.parse(localStorage.getItem('incomeCategories') || 'null') || [...defaultIncomeCategories],
};

export function expenseReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'ADD_TRANSACTION':
      newState = {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
      break;
    case 'UPDATE_TRANSACTION':
      newState = {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
      break;
    case 'DELETE_TRANSACTION':
      newState = {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
      break;
    case 'LOAD_SAMPLE':
      newState = { ...state, transactions: action.payload };
      break;
    case 'SET_BUDGET':
      newState = {
        ...state,
        budgets: { ...state.budgets, [action.payload.category]: action.payload.amount },
      };
      localStorage.setItem('budgets', JSON.stringify(newState.budgets));
      return newState;
    case 'REMOVE_BUDGET':
      newState = { ...state, budgets: { ...state.budgets } };
      delete newState.budgets[action.payload];
      localStorage.setItem('budgets', JSON.stringify(newState.budgets));
      return newState;
    case 'SET_CURRENCY':
      newState = { ...state, currency: action.payload };
      localStorage.setItem('currency', action.payload);
      return newState;
    case 'ADD_EXPENSE_CATEGORY':
      if (state.expenseCategories.includes(action.payload)) return state;
      newState = { ...state, expenseCategories: [...state.expenseCategories, action.payload] };
      localStorage.setItem('expenseCategories', JSON.stringify(newState.expenseCategories));
      return newState;
    case 'REMOVE_EXPENSE_CATEGORY':
      newState = { ...state, expenseCategories: state.expenseCategories.filter(c => c !== action.payload) };
      localStorage.setItem('expenseCategories', JSON.stringify(newState.expenseCategories));
      return newState;
    case 'ADD_INCOME_CATEGORY':
      if (state.incomeCategories.includes(action.payload)) return state;
      newState = { ...state, incomeCategories: [...state.incomeCategories, action.payload] };
      localStorage.setItem('incomeCategories', JSON.stringify(newState.incomeCategories));
      return newState;
    case 'REMOVE_INCOME_CATEGORY':
      newState = { ...state, incomeCategories: state.incomeCategories.filter(c => c !== action.payload) };
      localStorage.setItem('incomeCategories', JSON.stringify(newState.incomeCategories));
      return newState;
    default:
      return state;
  }

  localStorage.setItem('transactions', JSON.stringify(newState.transactions));
  return newState;
}
