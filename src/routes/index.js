import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PAGE_URL } from 'CONSTANTS/default';

import Signin from 'CONTAINERS/Signin';
const { SIGNIN,
			} = PAGE_URL;

export default () => ( // eslint-disable-line
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={`${SIGNIN}`}
        component={Signin}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
