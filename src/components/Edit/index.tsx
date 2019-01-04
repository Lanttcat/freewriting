import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import notification from 'antd/lib/notification';
// @ts-ignore
import classNames from 'classnames/bind';

// @ts-ignore
import size from 'lodash/size';
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
  displayTimer: any,
  currentInputModel: EInputModel
}

enum EStatus {
  STOP = 'stop',
  WRITING = 'writing',
  FINISH = 'finish',
}

enum EInputModel {
  CHANGE = 'input',
  COMPOSITION = 'composition',
}

const todayString = moment().endOf('day').format('YYYYMMDD');

class Edit extends React.Component<IOwnProps, IOwnStates> {

  private readonly textAreaRef: React.RefObject<HTMLTextAreaElement>;
  constructor(props: IOwnProps) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = {
      articleWordCount: 0,
      currentInputModel: EInputModel.CHANGE,
      displayTimer: null,
      editValue: '',
      status: EStatus.STOP,
      timer: null,
      title: todayString,
      writeTime: 0,
    }
  }

  public openNotification = () => {
    notification.open({
      description: '已经完成目标，编辑内容已复制到剪贴板',
      message: '完成目标',
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
    const { currentInputModel, status } = this.state;
    const tempInputValue = event.target.value;
    if (status === EStatus.WRITING) {
      this.timerCompute();
    }
    if (currentInputModel === EInputModel.COMPOSITION) {
      this.setState({editValue: tempInputValue});
    } else {
      this.setState({articleWordCount: size(tempInputValue), editValue: tempInputValue});
    }
  };

  public handleUserCopy = () => {
    setTimeout(() => this.setState({editValue: '请勿作弊'}), 100);
  };

  public handleUserInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempInputValue = event.target.value;
    this.setState({title: tempInputValue})
  };

  public handleCompositionStart = () => {
    this.setState({currentInputModel: EInputModel.COMPOSITION});
  };

  public handleCompositionEnd = () => {
    this.setState({currentInputModel: EInputModel.CHANGE, articleWordCount: size(this.state.editValue)});
  };

  public startWrite = () => {
    const {config} = this.props;
    this.setState({status: EStatus.WRITING});
    if (config.writeModel === EWriteModel.TIME) {
      // 检测时间模式下：是否完成
      setTimeout(() => {
        this.setState({status: EStatus.FINISH});
        this.handleFinishGoal();
      }, config.minWriteTime * 1000);}
    this.timerDisplay()
  };

  public copyValueToClipboard = () => {
    // 使用tooltip提示复制成功
    this.textAreaRef.current!.select();
    document.execCommand('copy', false);
  };

  public timerDisplay = () => {
    clearInterval(this.state.displayTimer);
    const timer= setInterval(() => {
      const { writeTime } = this.state;
      this.setState({writeTime: writeTime + 1});
    }, 1000);
    this.setState({displayTimer: timer});
  };

  public formatDisplayTime = () => {
    const {writeTime} = this.state;
    const minute = Math.floor(writeTime / 60) > 0 ? `${Math.floor(writeTime / 60)} 分钟 ` : '';
    const second = `${writeTime % 60} 秒 `;
    return minute + second;
  };

  public handleFinishGoal = () => {
    clearTimeout(this.state.timer);
    this.openNotification();
  };

  public isFinished = () => {
    const { config } = this.props;
    const { articleWordCount, writeTime } = this.state;
    const handleFunc = {
      number: () => articleWordCount > config.minWordNumber,
      time: () => writeTime > config.minWriteTime,
    };
    return handleFunc[config.writeModel]();
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
            disabled={!this.isFinished()}
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
              onCompositionStart={this.handleCompositionStart}
              onCompositionEnd={this.handleCompositionEnd}
              onChange={this.handleUserInput}
              onPaste={this.handleUserCopy}
              ref={this.textAreaRef}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
