import {Avatar, Button, Popover} from 'antd';
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
  config: IGlobalConfig,
}

const modelChinese = {
  number: '字数模式',
  time: '时间模式',
};

class Header extends React.Component<IOwnProps, {}> {

  public handleToHome = () => {
    this.props.push('/');
  };

  public renderUserIcon = () => {
    const {currentUserInfo} = this.props;
    if (currentUserInfo) {
      return (<div>{currentUserInfo}</div>);
    }
    return (<div><Avatar style={{ backgroundColor: '#87d068' }}>佚名</Avatar></div>);
  };

  public handleSetConfig = (config: IGlobalConfig) => {
    this.props.setConfig(config);
  };

  public render(): React.ReactNode {
    const { config } = this.props;
    // @ts-ignore
    return (
      <header className={cx('header')}>
        <div className={cx('wrapper')}>
          <div className={cx('logo')} onClick={this.handleToHome}>
            <span>自由写作</span>
          </div>
          <div className={cx("header-option")}>
            <div className={cx('option-status', 'item')}>{modelChinese[config.model]}</div>
            <Popover
              placement="bottomRight"
              title={'自由'}
              content={<Tools config={config} handleConfirm={this.handleSetConfig}/>}
              trigger="click"
            >
              <Button className={cx('model-setting item')} htmlType={'button'}>模式设置</Button>
            </Popover>
            <div className={cx('item')}>
              {this.renderUserIcon()}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(null, {push})(Header);
