import {Button, Popover} from 'antd';
import * as React from 'react';

import Tools from '../Tools';
class Header extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
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
    );
  }
}

export default Header;
