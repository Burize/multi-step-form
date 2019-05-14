import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import 'antd/dist/antd.less';

import configureStore from './configure/configureStore';

const { store } = configureStore();
import './App.scss';

import * as modules from 'modules';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {Object.values(modules).map(module => module.getRoutes())}
          <Redirect to={'/order'} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
