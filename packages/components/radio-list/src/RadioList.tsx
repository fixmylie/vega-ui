import React from 'react';

import { cnRadioList } from './cn-radio-list';
import { RadioListItem } from './RadioListItem';

import './RadioList.css';

export type RadioListProps = {
  className?: string;
  children?: React.ReactNode;
};

type RadioList<T> = React.FC<T> & {
  Item: typeof RadioListItem;
};

export const RadioList: RadioList<RadioListProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <nav role="navigation">
      <ul {...rest} className={cnRadioList('RadioList').mix(className)}>
        {children}
      </ul>
    </nav>
  );
};

RadioList.Item = RadioListItem;
