// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import Card from '../../share/Card';
import styles from './Home.scss';


const cx = classNames.bind(styles);
class Home extends React.Component<{}, {}>{

  public render(): React.ReactNode {
    return (
      <div className={cx('home-wrapper')}>
        <Card />
      </div>
    );
  }
}

export default Home;
