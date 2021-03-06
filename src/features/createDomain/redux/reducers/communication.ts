import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({

  loadingCountries: makeCommunicationReducer<NS.ILoadCountries, NS.ILoadCountriesComplete, NS.ILoadCountriesFail>(
    'CREATE_DOMAIN:LOAD_COUNTRIES',
    'CREATE_DOMAIN:LOAD_COUNTRIES_COMPLETE',
    'CREATE_DOMAIN:LOAD_COUNTRIES_FAIL',
    initial.communication.loadingCountries,
  ),
  creatingDomain: makeCommunicationReducer<NS.ICreateDomain, NS.ICreateDomainComplete, NS.ICreateDomainFail>(
    'CREATE_DOMAIN:CREATE_DOMAIN',
    'CREATE_DOMAIN:CREATE_DOMAIN_COMPLETE',
    'CREATE_DOMAIN:CREATE_DOMAIN_FAIL',
    initial.communication.creatingDomain,
  ),
});
