import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { FirstPage } from './pages/FirstPage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FirstPage} />
        <Route path="/characterdetail/:id" component={CharacterDetailPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
