import {Input} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';

import * as _ from 'lodash';
import { IGlobalConfig } from '../../type';
import styles from './Edit.scss';

const {TextArea} = Input;
const cx = classNames.bind(styles);

interface IOwnProps {
  config: IGlobalConfig;
}

interface IOwnStates {
  editValue: string,
  lastEditValue: string,
  timer: any,
  status: Status,
}

enum Status {
  STOP = 'stop',
  WRITING = 'writing',
}

class Edit extends React.Component<IOwnProps, IOwnStates> {

  constructor(props: IOwnProps) {
    super(props);
    this.state = {
      editValue: '',
      lastEditValue: '',
      status: Status.STOP,
      timer: null,
    }
  }

  public componentDidMount(): void {
    console.log(this.props.config);
  }

  public timerCompute = (newValue: string) => {
    const {clearTime} = this.props.config;
    const {timer} = this.state;
    clearTimeout(timer);
    const tempTimer = setTimeout(() => {
      this.setState({editValue: ''});
    }, clearTime);
    this.setState({
      lastEditValue: newValue,
      timer: tempTimer
    });
  };

  public handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempInputValue = event.target.value;
    this.timerCompute(tempInputValue);
    this.setState({editValue: tempInputValue});
  };

  public startWrite = () => {
    this.setState({status: Status.WRITING});
  };

  public render() {
    const {editValue} = this.state;
    return (
      <div className={cx('edit-wrapper')}>
        <div className={cx('edit-notice')}>
          <span>字数：{_.size(editValue)}</span>
          <span>时间：111</span>
        </div>
        <div className={cx('edit-content')}>
          <div className={cx('content-header')}>
            <Input value={'201111'} placeholder="标题"/>
          </div>
          <div className={cx('content-text')}>
            <TextArea
              className={cx('text-area')}
              value={editValue}
              onChange={this.handleUserInput}
            />
          </div>
          {/*{*/}
            {/*status === Status.STOP &&*/}
            {/*<div className={cx('start-wrapper')}>*/}
              {/*<span onClick={this.startWrite}>*/}
                {/*Start*/}
              {/*</span>*/}
            {/*</div>*/}
          {/*}*/}
        </div>
      </div>
    );
  }
}

export default Edit;
