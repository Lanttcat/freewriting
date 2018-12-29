import {Input, notification} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
// @ts-ignore
import moment from 'moment';
import {useRef} from "react";
import * as React from 'react';

import * as _ from 'lodash';
import {IGlobalConfig} from '../../type';
import styles from './Edit.scss';

const {TextArea} = Input;
const cx = classNames.bind(styles);

interface IOwnProps {
  config: IGlobalConfig;
}

interface IOwnStates {
  title: string,
  editValue: string,
  lastEditValue: string,
  timer: any,
  status: Status,
  articleWordCount: number,
}

enum Status {
  STOP = 'stop',
  WRITING = 'writing',
}

const todayString = moment().endOf('day').format('YYYYMMDD');

class Edit extends React.Component<IOwnProps, IOwnStates> {
  private readonly textArea: React.RefObject<HTMLTextAreaElement>;

  constructor(props: IOwnProps) {
    super(props);
    this.textArea = useRef(null);
    this.state = {
      articleWordCount: 0,
      editValue: '',
      lastEditValue: '',
      status: Status.STOP,
      timer: null,
      title: todayString,
    }
  }

  public componentDidMount(): void {
    console.log(this.props.config);
  }

  public openNotification = () => {
    notification.open({
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      message: 'Notification Title',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

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

  public handleEndTime = () => {
    this.openNotification();
  };

  public handleMaxTime = () => {
    this.openNotification();
  };

  public handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempInputValue = event.target.value;
    if (this.state.status === Status.WRITING) {
      this.timerCompute(tempInputValue);
    }
    this.setState({editValue: tempInputValue});
  };

  public handleComposition = (event: React.CompositionEvent<HTMLTextAreaElement>) => {
    const { status } = this.state;
    const { config } = this.props;
    if (event.type === 'compositionend') {
      // composition is end
      const currentArticleSize = _.size(this.state.editValue);
      if (currentArticleSize >= config.limitNumber && status === Status.WRITING) {
        this.setState({status: Status.STOP})
      }
      this.setState({articleWordCount: currentArticleSize})
    }
  };

  public startWrite = () => {
    const {config} = this.props;
    this.setState({status: Status.WRITING});
    if (config.model === 'time') {
      // 开始计时
      setTimeout(() => {
        this.setState({status: Status.STOP});
      }, config.limitTime);
    }
  };

  public copyValueTocLipboard = () => {
    // 使用tooltip提示复制成功
    // @ts-ignore
    this.textArea.current.select();
    document.execCommand('copy');
  };

  public render() {
    const {articleWordCount, title, editValue} = this.state;
    return (
      <div className={cx('edit-wrapper')}>
        <div className={cx('edit-notice')}>
          <span>字数：{articleWordCount}</span>
          <span>时间：111</span>
          <span onChange={this.copyValueTocLipboard}>复制</span>
        </div>
        <div className={cx('edit-content')}>
          <div className={cx('content-header')}>
            <Input value={title} placeholder="标题"/>
          </div>
          <div className={cx('content-text')}>
            <TextArea
              ref={this.textArea}
              className={cx('text-area')}
              value={editValue}
              onFocus={this.startWrite}
              onCompositionEnd={this.handleComposition}
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
