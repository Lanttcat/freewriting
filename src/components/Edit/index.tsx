import {Button, Input, notification} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';

import * as _ from 'lodash';
// @ts-ignore
import moment from 'moment';
import * as React from 'react';
import { EWriteModel } from '../../config'
import {IGlobalConfig} from '../../type';
import styles from './Edit.scss';

const cx = classNames.bind(styles);

interface IOwnProps {
  config: IGlobalConfig;
}

interface IOwnStates {
  title: string,
  editValue: string,
  timer: any,
  status: EStatus,
  articleWordCount: number,
  writeTime: number,
}

enum EStatus {
  STOP = 'stop',
  WRITING = 'writing',
  FINISH = 'finish',
}

const todayString = moment().endOf('day').format('YYYYMMDD');

class Edit extends React.Component<IOwnProps, IOwnStates> {

  private readonly textAreaRef: React.RefObject<HTMLTextAreaElement>;
  constructor(props: IOwnProps) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = {
      articleWordCount: 0,
      editValue: '',
      status: EStatus.STOP,
      timer: null,
      title: todayString,
      writeTime: 0,
    }
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

  public timerCompute = () => {
    const {clearWordsTime} = this.props.config;
    clearTimeout(this.state.timer);
    const tempTimer = setTimeout(() => {
      this.setState({editValue: ''});
    }, clearWordsTime * 1000);
    this.setState({timer: tempTimer});
  };

  public handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempInputValue = event.target.value;
    if (this.state.status === EStatus.WRITING) {
      this.timerCompute();
    }
    this.setState({editValue: tempInputValue});
  };

  public handleUserInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempInputValue = event.target.value;
    this.setState({title: tempInputValue})
  };

  public handleComposition = (event: React.CompositionEvent<HTMLTextAreaElement>) => {
    if (event.type === 'compositionend') {
      // composition is end
      const currentArticleSize = _.size(this.state.editValue);

      // 检测字数模式下：是否完成
      if (this.isFinishUnderMinWordNumberModel(currentArticleSize)) {
        this.setState({status: EStatus.FINISH})
      }
      this.setState({articleWordCount: currentArticleSize})
    }
  };

  public isFinishUnderMinWordNumberModel = (wordNumber: number) => {
    const { status } = this.state;
    const { config } = this.props;
    return status === EStatus.WRITING
      && config.writeModel === EWriteModel.NUMBER
      && wordNumber > config.minWordNumber;
  };

  public startWrite = () => {
    const {config} = this.props;
    this.setState({status: EStatus.WRITING});
    if (config.writeModel === EWriteModel.TIME) {
      // 检测时间模式下：是否完成
      setTimeout(() => {
        this.setState({status: EStatus.FINISH});
      }, config.minWriteTime * 1000);
    }

    this.timerDisplay()
  };

  public copyValueToClipboard = () => {
    // 使用tooltip提示复制成功
    this.textAreaRef.current!.select();
    document.execCommand('copy');
  };

  public timerDisplay = () => {
    setInterval(() => {
      const { writeTime } = this.state;
      this.setState({writeTime: writeTime + 1});
    }, 1000);
  };

  public formatDisplayTime = () => {
    const {writeTime} = this.state;
    const minute = Math.floor(writeTime / 60) > 0 ? `${Math.floor(writeTime / 60)} 分钟 ` : '';
    const second = `${writeTime % 60} 秒 `;
    return minute + second;
  };

  public render() {
    const {articleWordCount, title, editValue} = this.state;
    return (
      <div className={cx('edit-wrapper')}>
        <div className={cx('edit-notice')}>
          <span>字数：{articleWordCount}</span>
          <span>时间：{ this.formatDisplayTime() }</span>
          <Button
            className={cx('copy-btn')}
            htmlType={'button'}
            onClick={this.copyValueToClipboard}
            size={"small"}
          >
            复制
          </Button>
        </div>
        <div className={cx('edit-content')}>
          <div className={cx('content-header')}>
            <Input value={title} onChange={this.handleUserInputTitle} placeholder="标题"/>
          </div>
          <div className={cx('content-text')}>
            <textarea
              className={cx('text-area')}
              value={editValue}
              onFocus={this.startWrite}
              onCompositionEnd={this.handleComposition}
              onChange={this.handleUserInput}
              ref={this.textAreaRef}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
