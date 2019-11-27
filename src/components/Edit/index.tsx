import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import notification from 'antd/lib/notification';
// @ts-ignore
import classNames from 'classnames/bind';

// @ts-ignore
import once from 'lodash/once';
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
  private readonly onceOpenNotification: any;

  constructor(props: IOwnProps) {
    super(props);
    this.textAreaRef = React.createRef();
    this.onceOpenNotification = once(this.openNotification);
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

  public setWriteStatus = () => {
    if (this.isFinished()) {
      this.setState({status: EStatus.FINISH});
      clearTimeout(this.state.timer);
      this.onceOpenNotification();
    } else {
      this.setState({status: EStatus.WRITING});
    }
  };


  public openNotification = () => {
    notification.success({
      description: '已经完成目标，编辑内容可以通过复制按钮复制到剪贴板',
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
      this.setState({editValue: '', articleWordCount: 0});
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
      this.setState({editValue: tempInputValue}, this.setWriteStatus);
    } else {
      this.setState({articleWordCount: size(tempInputValue), editValue: tempInputValue}, this.setWriteStatus);
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
    const minute = Math.floor(writeTime / 60) > 0 ? `${Math.floor(writeTime / 60)}` : 0;
    const second = `${writeTime % 60}`;
    return (<span><span>{minute}</span> 分钟<span>{second}</span> 秒</span>);
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
          <span className={cx('number')}>字数：<span>{articleWordCount}</span></span>
          <span className={cx('time')}>时间：{ this.formatDisplayTime() }</span>
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
