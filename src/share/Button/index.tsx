// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';

import styles from './Button.scss';

const cx = classNames.bind(styles);


const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={cx('vim-button')}>
      <span>
        {props.children}
      </span>
    </button>
  )
};

export default Button;