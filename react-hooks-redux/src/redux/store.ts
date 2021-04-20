import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  AnyAction,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { currencyReducer } from './reducers/currency';
import { themeVariantReducer } from './reducers/theme-variant';

const rootReducer = combineReducers({
  currency: currencyReducer,
  themeVariant: themeVariantReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> & {
  // Enforces whitelist to exist in state
  whitelist: (keyof RootState)[];
} = {
  key: 'root',
  storage,
  whitelist: ['themeVariant'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancer = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancer =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

type ThunkDispatchType = ThunkDispatch<RootState, undefined, AnyAction>;
const storeEnhancer = applyMiddleware<ThunkDispatchType, RootState>(thunk);

export const store = createStore(
  persistedReducer,
  composeEnhancer(storeEnhancer),
);

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
