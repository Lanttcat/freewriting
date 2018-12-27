import {Button, Popover} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import {push} from 'connected-react-router'
import * as React from 'react';
import {connect} from "react-redux";
import { IGlobalConfig } from '../../type';
import styles from './Header.scss';
const cx = classNames.bind(styles);

import Tools from '../Tools';

interface IOwnProps {
  push: (url: string) => void;
  currentUserInfo: any;
  setConfig: (config: IGlobalConfig) => void;
}

class Header extends React.Component<IOwnProps, {}> {

  public handleToHome = () => {
    this.props.push('/');
  };

  public renderUserIcon = () => {
    const {currentUserInfo} = this.props;
    if (currentUserInfo) {
      return (<div>{currentUserInfo}</div>);
    }
    return (<div>默认</div>);
  };

  public handleSetConfig = () => {
    this.props.setConfig({
      limitNumber: 1,
      limitTime: 1,
      model: 'number',
    });
  };

  public render(): React.ReactNode {
    return (
      <header className={cx('header')}>
        <div className={cx('wrapper')}>
          <div className={'logo'} onClick={this.handleToHome}>
            <span>自由写作</span>
          </div>
          <div className={"header-option"}>
            <div className={'option-status'} onClick={this.handleSetConfig}>当前模式</div>
            <Popover placement="bottomRight" title={'自由'} content={<Tools/>} trigger="click">
              <Button htmlType={'button'}>模式设置</Button>
            </Popover>
            <div>
              {this.renderUserIcon()}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(null, {push})(Header);
