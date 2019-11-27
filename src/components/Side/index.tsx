// @ts-ignore
import classNames from 'classnames/bind';
import * as _ from 'lodash';
import * as React from 'react';

import styles from './Side.scss';


const cx = classNames.bind(styles);

interface ILink {
    name: string,
    href: string
  }

interface IProp {
  links: ILink[]
}

class Side extends React.Component<IProp>{
  public render(): React.ReactNode  {
    const { links } = this.props;
    return (
      <ul className={cx('side')}>
        {
          _.map(links, (link: ILink) => <li className={cx('side-item')} key={link.href}>{link.name}</li>)
        }
      </ul>
    );
  }
}

export default Side
