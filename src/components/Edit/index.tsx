import {Input} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';

// @ts-ignore
import { IGlobalConfig } from '../type';
import styles from './Edit.scss';

const {TextArea} = Input;
const cx = classNames.bind(styles);

interface IOwnProps {
  config: IGlobalConfig;
  model: 'time' | 'number',
  limitTime: {
    isOpen: boolean,
    time: number,
  }
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
    const {limitTime} = this.props;
    const {timer} = this.state;
    clearTimeout(timer);
    const tempTimer = setTimeout(() => {
      this.setState({editValue: ''});
    }, limitTime.time);
    this.setState({
      lastEditValue: newValue,
      timer: tempTimer
    });
  };

  public handleUserInput = (event: object) => {
    const {limitTime} = this.props;
    // @ts-ignore
    const tempInputValue = event.target.model;
    if (limitTime.isOpen) {
      this.timerCompute(tempInputValue)
    }
    this.setState({editValue: tempInputValue});
  };

  public startWrite = () => {
    this.setState({status: Status.WRITING});
  };

  public render() {
    const {editValue, status} = this.state;
    return (
      <div className={cx('edit-wrapper')}>
        <div className={cx('edit-notice')}>
          <span>字数：{editValue.length}</span>
          <span>时间：111</span>
        </div>
        <div className={cx('edit-content')}>
          <div className={cx('content-header')}>
            <Input placeholder="Basic usage"/>
          </div>
          <div className={cx('content-text')}>
            <TextArea
              className={cx('text-area')}
              value={editValue}
              onChange={this.handleUserInput}
            />
          </div>
          {
            status === Status.STOP &&
            <div className={cx('start-wrapper')}>
              <span onClick={this.startWrite}>
                Start
              </span>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Edit;
