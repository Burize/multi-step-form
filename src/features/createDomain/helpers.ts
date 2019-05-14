import { makePhoneNormalizer } from 'shared/helpers/forms/normalizes';
import { ICountry } from 'shared/types/models';

import { IOption } from './namespace';
import { phonePattern } from './constants';

export const covertCountryToOption = (country: ICountry): IOption => (
  { value: country.code, label: country.title });

export const leasePeriodFormatter = (value?: number) => `${value} month${value && value > 1 ? 's' : ''}`;

export const normalizePhone = makePhoneNormalizer(phonePattern);
