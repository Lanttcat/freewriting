import {Button, Select} from 'antd';
import * as React from 'react';
import Edit from './components/Edit';

import './App.css';

const Option = Select.Option;

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
          <div>
            <Button htmlType={'button'}>Default</Button>
          </div>
        </header>
        <div>
          <div className={'tool'}>
            <Select
              className={'select-time'}
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>
          <Edit/>

        </div>

      </div>
    );
  }
}

export default App;
