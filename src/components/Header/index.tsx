import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
// @ts-ignore
import classNames from 'classnames/bind';
import {push} from 'connected-react-router'
import * as React from 'react';
import {connect} from "react-redux";
import {EWriteModel} from "../../config";
import {IGlobalConfig} from '../../type';
import Tools from '../Tools';
import styles from './Header.scss';

const cx = classNames.bind(styles);

interface IOwnProps {
  push: (url: string) => void;
  currentUserInfo: any;
  setConfig: (config: IGlobalConfig) => void;
  config: IGlobalConfig,
}

interface IOwnStates {
  isVisibleSetting: boolean;
}

const modelChinese = {
  number: '字数模式',
  time: '时间模式',
};

class Header extends React.Component<IOwnProps, IOwnStates> {

  constructor(props: IOwnProps) {
    super(props);
    this.state = {
      isVisibleSetting: false,
    }
  }

  public handleToHome = () => {
    this.props.push('/');
  };

  public renderUserIcon = () => {
    const {currentUserInfo} = this.props;
    if (currentUserInfo) {
      return (<div>{currentUserInfo}</div>);
    }
    return (<div>
      <Tooltip placement="bottomRight" title={'欢迎你，自由创作人'}>
        <Avatar className={cx('user-icon')} style={{backgroundColor: '#87d068'}}>佚名</Avatar>
      </Tooltip>
    </div>);
  };

  public handleVisibleChange = (isVisibleSetting: boolean) => {
    this.setState({isVisibleSetting});
  }

  public handleSetConfig = (config: IGlobalConfig) => {
    this.props.setConfig(config);
    this.setState({isVisibleSetting: false});
  };

  public render(): React.ReactNode {
    const {config} = this.props;
    const {isVisibleSetting} = this.state;
    // @ts-ignore
    return (
      <header className={cx('header')}>
        <div className={cx('wrapper')}>
          <div className={cx('logo')} onClick={this.handleToHome}>
            <span>自由写作</span>
          </div>
          <div className={cx("header-option")}>
            <div>
              <span className={cx('option-status', 'item')}>{modelChinese[config.writeModel]}:</span>
              {
                config.writeModel === EWriteModel.NUMBER &&
                <span className={cx('option-status')}>{config.minWordNumber} 字</span>
              }
              {
                config.writeModel === EWriteModel.TIME &&
                <span className={cx('option-status')}>{config.minWriteTime / 60} 分钟</span>
              }
            </div>
            <Popover
              defaultVisible={false}
              placement="bottomRight"
              title={'自由'}
              content={<Tools config={config} handleConfirm={this.handleSetConfig}/>}
              trigger="click"
              visible={isVisibleSetting}
              onVisibleChange={this.handleVisibleChange}
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
