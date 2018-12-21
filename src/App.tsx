import {Button, Popover} from 'antd';
// @ts-ignore
import * as React from 'react';
import Edit from './components/Edit';
import Tools from './components/Tools';

// @ts-ignore

import './App.css';

interface IOwnStates {
  editValue: string,
}

class App extends React.Component<{}, IOwnStates> {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className={'logo'}>
            <span>自由写作</span>
          </div>
          <div className={"header-option"}>
            <div className={'option-status'}>当前模式</div>
            <Popover placement="bottomRight" title={'自由'} content={<Tools/>} trigger="click">
              <Button htmlType={'button'}>模式设置</Button>
            </Popover>
          </div>
        </header>
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
