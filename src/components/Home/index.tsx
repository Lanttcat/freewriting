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
          <h5>动态</h5>
          <Card/>
        </div>
        <div className={cx('home-right-wrapper')}>right</div>

      </div>
    );
  }
}

export default Home;
