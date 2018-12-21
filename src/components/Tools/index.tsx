import {Button, InputNumber, Radio, Select, Tooltip} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import * as _ from 'lodash';
import * as React from 'react';
// @ts-ignore
import styles from './Tools.scss';

const cx = classNames.bind(styles);

const Option = Select.Option;
const RadioGroup = Radio.Group;

class Tools extends React.Component<{}, {}> {
  public state = {
    model: 'time',
  };

  public onModelChange = (e: any) => {
    this.setState({
      model: e.target.value,
    });
  };

  public handleSettingSubmit = () => {
    // 应该提交到服务器
    _.noop()
  }

  public render(): React.ReactNode {
    const {model} = this.state;
    return (
      <div className={cx('tool')}>
        <div className={cx('option')}>
          <Tooltip placement="bottomRight" title={'选择最长停笔时间'}>
            <Select
              className={cx('select-time')}
              style={{width: 200}}
              placeholder="Select a person"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Tooltip>
        </div>
        <div className={cx('option')}>
          <RadioGroup onChange={this.onModelChange} value={this.state.model}>
            <Radio value={'time'}>时间模式</Radio>
            <Radio value={'number'}>字数模式</Radio>
            <Radio value={'none'}>无限制模式</Radio>
          </RadioGroup>
        </div>
        <div>
          {
            model === 'time' &&
            <div className={cx('option-item')}>
              <InputNumber min={1} max={10} defaultValue={3}/>
            </div>
          }
          {
            model === 'number' &&
            <div className={cx('option-item')}>
              <InputNumber min={1} max={10} defaultValue={3}/>
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
