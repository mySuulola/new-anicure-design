import {createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ReduxThunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import errorReducer from './reducer/errorReducer';
import vaccineReducer from './reducer/vaccineReducer';
// import storage from 'redux-persist/lib/storage';

const middlewares = [ReduxThunk];

const rootReducer = combineReducers({
  user: userReducer,
  vaccine: vaccineReducer,
  error: errorReducer
});

const persistConfig = {
  key: 'root',
  // storage
  storage: AsyncStorage ,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const configureStore = () => {
//   return createStore(rootReducer);
// };

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(...middlewares)
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

// export default configureStore;
