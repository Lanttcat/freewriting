import * as React from 'react';
import routes from './route';

import {ConnectedRouter} from 'connected-react-router';
import {History} from 'history';
import './App.css';

interface IAppProps {
  history: History;
}

const App = ({history}: IAppProps) => {
  return (
    <ConnectedRouter history={history}>
      {routes}
      {/*<div className="App">*/}
        {/*<Header/>*/}
        {/*<div>*/}
          {/*<Edit*/}
            {/*limitTime={{isOpen: true, time: 5000}}*/}
          {/*/>*/}
        {/*</div>*/}
      {/*</div>*/}
    </ConnectedRouter>
  );
};

export default App;
