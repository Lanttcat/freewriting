// @ts-ignore
import classNames from 'classnames/bind';
import * as React from 'react';
import styles from './Introduce.scss';

const cx = classNames.bind(styles);

const Introduce = () => (
  <div className={cx('wrapper')}>
    <p>
      自由写作（英语：Free writing），一种写作的构思技巧。一个人连续书写一段文字，
      而不在乎拼字、文法或者主题，就称之为自由写作。通常不够完美，也不是实用的材料，
      但帮助作者克服冷漠与自我批评的障碍。主要被一些散文作家与老师使用。有些作者应用这个技巧收集最初的想法，
      和主题相关的概念，通常是正式写作的准备。自由写作和自动写作（Automatic writing）不同。
    </p>
    <h5>规则</h5>
    <ul>
      <li>设定时间，写1、10或20分钟，然后停止。</li>
      <li>在时间停止前，手要一直保持书写。不要停顿，不要盯着空白，不要回头读前面写出的东西。尽量写快，但也不要写太急。</li>
      <li>不要管文法、拼字、停顿、美观、风格。没有人会看到你写了什么。你写出的正确性和品质并不重要，重要的是你在写。</li>
      <li>如果你在写时觉得无聊或不舒服，问自己是什么在干扰你，然后写下来。</li>
      <li>时间到了之后，看一遍你写了什么，其中可能包含一些写作点子，把它标出来。这些点子可以在下一次自由写作时继续发展。</li>
    </ul>
  </div>
);

export default Introduce;
