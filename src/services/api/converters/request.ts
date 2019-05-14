import { IDomain } from 'shared/types/models/domain';

import { IDomainRequest } from '../types';

export function convertDomainToRequest(domain: IDomain): IDomainRequest {
  return { ...domain, activeAt: domain.activeAt.valueOf(), phone: domain.phone.replace(/[^\d]/g, '') };
}
