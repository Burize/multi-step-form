import { Moment } from 'moment';

export interface IFormData {
  domain: string;
  postfix: Postfix;
  country: CountryCode;
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

export type Postfix = 'national' | 'io' | 'com';
export type DriveType = 'hdd' | 'ssd';
export type CountryCode = 'ru' | 'us' | 'uk';
export type OSType = 'linux' | 'window' | 'mac';

export interface IOption<T = string> {
  value: T;
  label: string;
}
