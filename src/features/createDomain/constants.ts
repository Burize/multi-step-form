import { IOption, IFormData } from './namespace';
import { OSType, Postfix, DriveType } from 'shared/types/models/domain';

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

export const ramLimitation = {
  min: 1,
  max: 10,
};

export const cpuFrequencyLimitation = {
  step: 0.1,
  min: 1.6,
  max: 4.2,
};

export function driverSpaceLimitations(driveType: DriveType) {
  return {
    step: driveType === 'hdd' ? 64 : 32,
    min: driveType === 'hdd' ? 256 : 64,
    max: driveType === 'hdd' ? 2048 : 512,
  };
}

export const leasePeriodLimitation = {
  min: 1,
  max: 12,
};

export const initialValues: IFormData = {
  domain: 'your.domain',
  postfix: 'com',
  country: 'ru',
  additionalInfo: '',
  cpuCores: 3,
  cpuFrequency: 2.4,
  ram: 4,
  driveType: 'hdd',
  driveSpace: 512,
  os: 'linux',
  email: '',
  phone: '',
  leasePeriod: 3,
  activeAt: null,
  agreement: false,
};

export const formNames: { [key in keyof IFormData]: key } = {
  domain: 'domain',
  postfix: 'postfix',
  country: 'country',
  additionalInfo: 'additionalInfo',
  cpuCores: 'cpuCores',
  cpuFrequency: 'cpuFrequency',
  ram: 'ram',
  driveType: 'driveType',
  driveSpace: 'driveSpace',
  os: 'os',
  email: 'email',
  phone: 'phone',
  leasePeriod: 'leasePeriod',
  activeAt: 'activeAt',
  agreement: 'agreement',
};
