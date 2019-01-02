import Popover from 'antd/lib/popover';
// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import Feedback from '../../components/Feedback';
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
          <div className={cx('item')}>
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

          <div className={cx('item')}>
            <Popover
              overlayClassName={cx('pop-over')}
              content={<Feedback/>}
              title={<div className={cx('pop-style')}>feedback 反馈</div>}
              trigger="hover"
              placement="leftTop"
            >
              <p className={cx('item')}>feedback 反馈</p>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
