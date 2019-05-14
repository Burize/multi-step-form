import { Postfix, DriveType, OSType } from 'shared/types/models/domain';

export interface ICountryResponse {
  title: string;
  code: string;
}

export interface IDomainRequest {
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
  activeAt: number;
}
