import { OSType, IOption, Postfix, CountryCode, DriveType } from './namespace';

export const osTypes: Record<OSType, string> = {
  linux: 'Red Hat Enterprise',
  window: 'Windows Server',
  mac: 'Mac OS X Server',
};

export const postfixOptions: Array<IOption<Postfix>> = [
  { value: 'com', label: 'com' },
  { value: 'io', label: 'io' },
  { value: 'national', label: 'national' },
];

export const countryOptions: Array<IOption<CountryCode>> = [
  { value: 'ru', label: 'Russia' },
  { value: 'us', label: 'Amerika' },
  { value: 'uk', label: 'United Kingdom' },
];

export const driveOptions: Array<IOption<DriveType>> = [
  { value: 'hdd', label: 'HDD' },
  { value: 'ssd', label: 'SSD' },
];

export const osOptions: Array<IOption<OSType>> = [
  { value: 'linux', label: osTypes.linux },
  { value: 'window', label: osTypes.window },
  { value: 'mac', label: osTypes.mac },
];

export const phonePattern = '(999)-999-9999';
