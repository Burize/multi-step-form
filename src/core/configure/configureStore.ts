import { composeWithDevTools } from 'redux-devtools-extension';
import { compose, applyMiddleware, createStore, Middleware, Store, combineReducers, Reducer } from 'redux';
import thunk from 'redux-thunk';

import { Api } from 'services/api';
import { reduxEntry as createDomainReduxEntry } from 'features/createDomain';
import { IAppReduxState, IDependencies } from 'shared/types/redux';

interface IStoreData {
  store: Store<IAppReduxState>;
}

function configureStore(): IStoreData {

  const dependencies: IDependencies = { api: new Api() };

  const middlewares: Middleware[] = [thunk.withExtraArgument(dependencies)];

  const composeEnhancers = process.env.NODE_ENV === 'dev' ? composeWithDevTools({}) : compose;

  const entriesReducers: Record<keyof IAppReduxState, Reducer> = {
    createDomain: createDomainReduxEntry.reducer,
  };

  const store: Store<IAppReduxState> =
    createStore(
      combineReducers({ ...entriesReducers }),
      composeEnhancers(applyMiddleware(...middlewares)),
    );

  return { store };
}

export { IStoreData };
export default configureStore;
