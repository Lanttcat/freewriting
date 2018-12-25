import {Button, Popover} from 'antd';
import { push } from 'connected-react-router'
import * as React from 'react';
import {connect} from "react-redux";

import Tools from '../Tools';
interface IOwnProps {
  push: (url: string) => void;
}
class Header extends React.Component<IOwnProps, {}> {

  public handleToHome = () => {
    this.props.push('/');
  };

  public render(): React.ReactNode {
    return (
      <header className="App-header">
          <div className={'logo'} onClick={this.handleToHome}>
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

export default connect(null,  { push })(Header);
