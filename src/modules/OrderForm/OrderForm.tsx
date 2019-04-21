import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { IModule } from 'shared/types/app';

import { OrderForm } from './view';

const OrderFormModule: IModule = {
  getRoutes() {
    return (
      <Route key="orderForm" path={'/order'}>
        <Switch>
          <Route path={'/order'} component={OrderForm} />
          <Redirect to={'/order'} />
        </Switch>
      </Route>
    );
  },
};

export default OrderFormModule;
