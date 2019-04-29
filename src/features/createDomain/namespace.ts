export interface IFormData {
  domain: string;
  postfix: Postfix;
  country: string;
  additionalInfo: string;
}

export type Postfix = 'national' | 'io' | 'com';
