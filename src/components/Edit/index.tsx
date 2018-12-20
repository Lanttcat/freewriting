import {Input} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';

// @ts-ignore
import styles from './Edit.scss';

const {TextArea} = Input;
const cx = classNames.bind(styles);

interface IOwnStates {
  editValue: string,
}

class Edit extends React.Component<{}, IOwnStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      editValue: '',
    }
  }

  public handleUserInput = (event: object) => {
    // @ts-ignore
    this.setState({editValue: event.target.value});
  };
  public render() {
    const {editValue} = this.state;
    return (
      <div className={cx('edit-wrapper')}>
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
        </div>
      </div>
    );
  }
}

export default Edit;
