import { createStore, combineReducers, compose } from 'redux';
import { currencyReducer } from './reducers/currency';
import { themeVariantReducer } from './reducers/theme-variant';


const rootReducer = combineReducers({
  currency: currencyReducer,
  themeVariant: themeVariantReducer,
});

let composeEnhancer = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  rootReducer,
  composeEnhancer(),
);

export type RootState = ReturnType<typeof rootReducer>;
