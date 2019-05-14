import { Reducer, ActionCreator } from 'redux';

import { namespace as CreateDomainNamespace } from 'features/createDomain';
import { ThunkAction } from 'redux-thunk';
import { Api } from 'services/api';

export interface IReduxEntry<EntryState> {
  reducer: Reducer<EntryState>;
}

export interface IAppReduxState {
  createDomain: CreateDomainNamespace.IReduxState;
}

export interface IPlainAction<T> {
  type: T;
}

export interface IAction<T, P> extends IPlainAction<T> {
  payload: P;
}

export interface IPlainFailAction<T, E = string> extends IPlainAction<T> {
  error: E;
}

export interface ICommunication<E = string> {
  isRequesting: boolean;
  error: E;
}

export type Thunk = ActionCreator<ThunkAction<Promise<void>, any, IDependencies, any>>;

export interface IDependencies {
  api: Api;
}
