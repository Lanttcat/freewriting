// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import styles from './Feedback.scss';

const cx = classNames.bind(styles);

const Feedback = () => {
  return (
    <div className={cx('wrapper')}>
      <ul>
        <li>
          <h5>邮箱：</h5>
          <p>zhuxiaomoshuo@gmail.com</p>
        </li>
        <li className={cx('we-chat')}>
          <h5>微信：</h5>
          <img src="https://ws4.sinaimg.cn/large/006tNbRwly1fyqgorfsjaj30kw0r2ta9.jpg" alt="微信"/>
        </li>
      </ul>
    </div>
  )
};

export default Feedback;
