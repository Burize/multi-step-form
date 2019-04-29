import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { IModule } from 'shared/types/app';

import { Domain } from './view';

const DomainModule: IModule = {
  getRoutes() {
    return (
      <Route key="orderForm" path={'/order'}>
        <Switch>
          <Route path={'/order'} component={Domain} />
          <Redirect to={'/order'} />
        </Switch>
      </Route>
    );
  },
};

export default DomainModule;
