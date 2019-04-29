import * as React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import 'antd/dist/antd.less';
import './App.scss';

import * as modules from 'modules';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {Object.values(modules).map(module => module.getRoutes())}
        <Redirect to={'/order'} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
