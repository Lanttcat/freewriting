// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import Card from '../../share/Card';
import styles from './Home.scss';

interface IOwnProps {
  push: (url: string) => void;
}

interface IOwnStates {
  historyList: null,
}

const cx = classNames.bind(styles);
class Home extends React.Component<IOwnProps, IOwnStates>{

  constructor(props: IOwnProps) {
    super(props);
    this.state = {
      historyList: null,
    }
  }

  public handleClick = () => {
    this.props.push('/create-new')
  };

  public render(): React.ReactNode {
    const { historyList } = this.state;
    return (
      <div className={cx('home-wrapper')}>
        <div className={cx('home-left-wrapper')}>left</div>
        <div className={cx('home-content-wrapper')}>
          <div className={cx('create-new')} onClick={this.handleClick}>
            开始自由写作
          </div>
          <div>
            <h5>动态</h5>
            {historyList && <Card />}
            {!historyList && <div>暂时功能未开放</div>}
          </div>
        </div>
        <div className={cx('home-right-wrapper')}>什么是快速写作</div>
      </div>
    );
  }
}

export default Home;
