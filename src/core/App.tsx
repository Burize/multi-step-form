import * as React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import * as modules from 'modules';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {Object.values(modules).map(module => module.getRoutes())}
          <Redirect to={'/order'} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
