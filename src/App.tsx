// @ts-ignore
import * as React from 'react';
import Edit from './components/Edit';
import Header from './components/Header';

// @ts-ignore

import './App.css';

interface IOwnStates {
  editValue: string,
}

class App extends React.Component<{}, IOwnStates> {

  public render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Edit
            limitTime={{isOpen: true, time: 5000}}
          />
        </div>
      </div>
    );
  }
}

export default App;
