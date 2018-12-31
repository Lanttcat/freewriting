import {Popover} from 'antd';
// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import Introduce from '../../components/Introduce';
// import Card from '../../share/Card';
import Edit from '../../containers/EditContainer';
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
    // const { historyList } = this.state;
    return (
      <div className={cx('home-wrapper')}>
        <div className={cx('home-left-wrapper')}/>
        <div className={cx('home-content-wrapper')}>
          <Edit />
        </div>
        <div className={cx('home-right-wrapper')}>
          <Popover
            overlayClassName={cx('pop-over')}
            content={<Introduce/>}
            title={<div className={cx('pop-style')}>关于自由写作</div>}
            trigger="hover"
            placement="leftTop"
          >
            <p className={cx('item')}>什么是快速写作?</p>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Home;
