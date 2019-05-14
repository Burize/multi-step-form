import { Moment } from 'moment';

import { ICommunication, IPlainAction, IPlainFailAction, IAction } from 'shared/types/redux';
import { Postfix, DriveType, OSType } from 'shared/types/models/domain';
import { ICountry } from 'shared/types/models';

export interface IFormData {
  domain: string;
  postfix: Postfix;
  country: string;
  additionalInfo: string;
  cpuCores: number;
  cpuFrequency: number;
  ram: number;
  driveType: DriveType;
  driveSpace: number;
  os: OSType;
  email: string;
  phone: string;
  leasePeriod: number;
  activeAt: Moment | null;
  agreement: boolean;
}

export interface IOption<T = string> {
  value: T;
  label: string;
}

export interface IReduxState {
  communication: {
    loadingCountries: ICommunication;
    creatingDomain: ICommunication;
  };
  data: {
    countries: ICountry[],
  };
}

export type ILoadCountries = IPlainAction<'CREATE_DOMAIN:LOAD_COUNTRIES'>;
export type ILoadCountriesComplete = IAction<'CREATE_DOMAIN:LOAD_COUNTRIES_COMPLETE', { countries: ICountry[] }>;
export type ILoadCountriesFail = IPlainFailAction<'CREATE_DOMAIN:LOAD_COUNTRIES_FAIL'>;

export type ICreateDomain = IPlainAction<'CREATE_DOMAIN:CREATE_DOMAIN'>;
export type ICreateDomainComplete = IPlainAction<'CREATE_DOMAIN:CREATE_DOMAIN_COMPLETE'>;
export type ICreateDomainFail = IPlainFailAction<'CREATE_DOMAIN:CREATE_DOMAIN_FAIL'>;

export type Action =
  ILoadCountries | ILoadCountriesComplete | ILoadCountriesFail
  | ICreateDomain | ICreateDomainComplete | ICreateDomainFail
  ;
