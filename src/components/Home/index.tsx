// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import Card from '../../share/Card';
import styles from './Home.scss';

interface IOwnProps {
  push: (url: string) => void;
}

const cx = classNames.bind(styles);
class Home extends React.Component<IOwnProps, {}>{

  public handleClick = () => {
    this.props.push('/create-new')
  };

  public render(): React.ReactNode {
    return (
      <div className={cx('home-wrapper')}>
        <div className={cx('home-left-wrapper')}>left</div>
        <div className={cx('home-content-wrapper')}>
          <div className={cx('create-new')} onClick={this.handleClick}>
            开始自由写作
          </div>
          <div>
            <h5>动态</h5>
            <Card/>
          </div>
        </div>
        <div className={cx('home-right-wrapper')}>什么是快速写作</div>

      </div>
    );
  }
}

export default Home;
