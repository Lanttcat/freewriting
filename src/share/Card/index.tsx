// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import styles from './Card.scss'

const cx = classNames.bind(styles);

class Card extends React.Component<{}, {}>{

  public render(): React.ReactNode {
    return (
      <div className={cx('card-wrapper')}>
        <p><span>头像</span><span>用户名</span></p>
        <p>时间</p>
        <h3>这实力问题</h3>
        <p>一二三四五六七北京市一二三四五六七北京市一二三四五六七北京市一二三四五六七北京市一二三四五六七北京市一二三四五六七北京市</p>
        <a href="#">链接</a>
      </div>
    );
  }

}

export default Card;
