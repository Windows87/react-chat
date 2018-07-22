import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Chat from './components/Chat';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/chat" exact component={Chat} />
  </Switch>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
