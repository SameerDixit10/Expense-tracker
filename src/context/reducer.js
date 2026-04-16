export const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
  budgets: JSON.parse(localStorage.getItem('budgets') || '{}'),
  currency: localStorage.getItem('currency') || 'USD',
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
    case 'SET_BUDGET': {
      newState = {
        ...state,
        budgets: { ...state.budgets, [action.payload.category]: action.payload.amount },
      };
      localStorage.setItem('budgets', JSON.stringify(newState.budgets));
      return newState;
    }
    case 'REMOVE_BUDGET': {
      const updatedBudgets = { ...state.budgets };
      delete updatedBudgets[action.payload];
      newState = { ...state, budgets: updatedBudgets };
      localStorage.setItem('budgets', JSON.stringify(newState.budgets));
      return newState;
    }
    case 'SET_CURRENCY':
      newState = { ...state, currency: action.payload };
      localStorage.setItem('currency', action.payload);
      return newState;
    default:
      return state;
  }

  localStorage.setItem('transactions', JSON.stringify(newState.transactions));
  return newState;
}
