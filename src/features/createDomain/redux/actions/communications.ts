import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/helpers/redux';

// tslint:disable:max-line-length

export const { execute: loadCountries, completed: loadCountriesCompleted, failed: loadCountriesFailed } =
  makeCommunicationActionCreators<NS.ILoadCountries, NS.ILoadCountriesComplete, NS.ILoadCountriesFail>(
    'CREATE_DOMAIN:LOAD_COUNTRIES', 'CREATE_DOMAIN:LOAD_COUNTRIES_COMPLETE', 'CREATE_DOMAIN:LOAD_COUNTRIES_FAIL',
  );

export const { execute: createDomain, completed: createDomainCompleted, failed: createDomainFailed } =
  makeCommunicationActionCreators<NS.ICreateDomain, NS.ICreateDomainComplete, NS.ICreateDomainFail>(
    'CREATE_DOMAIN:CREATE_DOMAIN', 'CREATE_DOMAIN:CREATE_DOMAIN_COMPLETE', 'CREATE_DOMAIN:CREATE_DOMAIN_FAIL',
  );
