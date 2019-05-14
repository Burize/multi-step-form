import { bind } from 'decko';
import { IDomain } from 'shared/types/models';

import { convertDomainToRequest } from '../converters';
import BaseApi from './BaseApi';

class Domain extends BaseApi {

  @bind
  public async createDomain(domain: IDomain): Promise<void> {

    const domainRequest = convertDomainToRequest(domain);
    const response = await this.actions.post<void>({
      url: 'domains',
      data: domainRequest,
    });
    return this.handleResponse(response);
  }

}

export default Domain;
