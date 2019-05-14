import { Moment } from 'moment';

export interface IDomain {
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
  activeAt: Moment;
}

export type Postfix = 'national' | 'io' | 'com';
export type DriveType = 'hdd' | 'ssd';
export type OSType = 'linux' | 'window' | 'mac';
