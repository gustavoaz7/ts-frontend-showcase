import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { currencyReducer } from './reducers/currency';
import { themeVariantReducer } from './reducers/theme-variant';

const rootReducer = combineReducers({
  currency: currencyReducer,
  themeVariant: themeVariantReducer,
});

let composeEnhancer = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancer =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares)),
);

export type RootState = ReturnType<typeof rootReducer>;
