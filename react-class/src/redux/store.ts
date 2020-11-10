import { createStore, combineReducers } from 'redux';
import { currencyReducer } from './reducers/currency';


const rootReducer = combineReducers({
  currency: currencyReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
