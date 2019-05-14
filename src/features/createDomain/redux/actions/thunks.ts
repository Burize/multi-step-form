
import { Dispatch } from 'redux';

import {
  loadCountries, loadCountriesCompleted, loadCountriesFailed,
  createDomain as createDomainAction, createDomainCompleted, createDomainFailed,
} from './communications';

import { IDomain } from 'shared/types/models/domain';
import { Thunk } from 'shared/types/redux';

export const loadCountriesOptions: Thunk = () => {
  return async (dispatch: Dispatch, _, { api }) => {
    try {
      dispatch(loadCountries());
      const countries = await api.country.loadCountries();
      dispatch(loadCountriesCompleted({ countries }));
    } catch (e) {
      dispatch(loadCountriesFailed(e.message));
    }
  };
};

export const createDomain: Thunk = (domain: IDomain) => {
  return async (dispatch: Dispatch, _, { api }) => {
    try {
      dispatch(createDomainAction());
      await api.domain.createDomain(domain);
      dispatch(createDomainCompleted());
    } catch (e) {
      dispatch(createDomainFailed(e.message));
    }

  };
};
