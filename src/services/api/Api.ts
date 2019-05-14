
import HttpActions from './HttpActions';
import { Country, Domain } from './entities';

class Api {
  public country: Country;
  public domain: Domain;

  constructor() {
    const actions = new HttpActions();
    this.country = new Country(actions);
    this.domain = new Domain(actions);
  }

}

export default Api;
