import { createContext, useContext, useReducer, useMemo } from 'react';
import { expenseReducer, initialState } from './reducer';
import { calculateSummary } from '../utils/helpers';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const summary = useMemo(
    () => calculateSummary(state.transactions),
    [state.transactions]
  );

  return (
    <ExpenseContext.Provider
      value={{
        transactions: state.transactions,
        budgets: state.budgets,
        currency: state.currency,
        dispatch,
        summary,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  return useContext(ExpenseContext);
}
