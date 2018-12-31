import {Button, InputNumber, Radio, Select, Tooltip} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import { EWriteModel } from '../../config';
import { IGlobalConfig } from '../../type';
// @ts-ignore
import styles from './Tools.scss';

const cx = classNames.bind(styles);

const Option = Select.Option;
const RadioGroup = Radio.Group;

interface IOwnProps {
  handleConfirm: (config: IGlobalConfig) => void;
  config: IGlobalConfig;
}

interface IOwnStates {
  clearTime: number,
  limitNumber: number,
  limitTime: number,
  model: EWriteModel,
}

class Tools extends React.Component<IOwnProps, IOwnStates> {
  constructor(props: IOwnProps) {
    super(props);
    const { config } = this.props;
    this.state = {
      clearTime: config.clearWordsTime * 1000,
      limitNumber: config.minWordNumber,
      limitTime: config.minWriteTime,
      model: config.writeModel,
    };
  }

  public setClearTime = (value: number) => {
    this.setState({ clearTime: value })
  };

  public setModel = (event: any) => {
    this.setState({ model: event.target.value});
  };

  public setLimitTime = (value: number) => {
    this.setState({ limitTime: value });
  };

  public setLimitNumber = (value: number) => {
    this.setState({ limitNumber: value});
  };

  public handleSettingSubmit = (event: any) => {
    const { clearTime, limitTime, limitNumber, model } = this.state;
    // 应该提交到服务器
    const userConfig: IGlobalConfig = { clearWordsTime: clearTime, minWordNumber: limitNumber, minWriteTime: limitTime, writeModel: model };
    this.props.handleConfirm(userConfig);
  };

  public render(): React.ReactNode {
    const {model, clearTime, limitTime, limitNumber} = this.state;
    return (
      <div className={cx('tool')}>
        <div className={cx('option')}>
          <Tooltip placement="bottomRight" title={'选择最长停笔时间'}>
            <Select
              style={{width: '100%'}}
              value={clearTime}
              className={cx('select-time')}
              placeholder="选择最长停笔时间..."
              optionFilterProp="children"
              onSelect={this.setClearTime}
            >
              <Option value={5}>5秒</Option>
              <Option value={8}>8秒</Option>
              <Option value={10}>10秒</Option>
            </Select>
          </Tooltip>
        </div>
        <div className={cx('option')}>
          <RadioGroup value={model} onChange={this.setModel}>
            <Radio value={'time'}>时间模式</Radio>
            <Radio value={'number'}>字数模式</Radio>
            {/*<Radio value={'none'}>无限制模式</Radio>*/}
          </RadioGroup>
        </div>
        <div>
          {
            model === 'time' &&
            <div className={cx('option-item')}>
              <InputNumber
                value={limitTime}
                onChange={this.setLimitTime}
                min={5}
                max={100}
                defaultValue={10}/>
              <span> 分钟</span>
            </div>
          }
          {
            model === 'number' &&
            <div className={cx('option-item')}>
              <InputNumber
                value={limitNumber}
                onChange={this.setLimitNumber}
                min={400}
                max={3000}
                defaultValue={500}/>
              <span> 字</span>
            </div>
          }
        </div>
        <div className={cx('btn')}>
          <Button onClick={this.handleSettingSubmit} htmlType={'button'}>确认</Button>
        </div>
      </div>
    );
  }
}

export default Tools;
