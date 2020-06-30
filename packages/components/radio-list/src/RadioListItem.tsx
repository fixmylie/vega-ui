import React, { MouseEvent } from 'react';

import { cnRadioList } from './cn-radio-list';

import './RadioList.css';

export type RadioListItemProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean;
};

export const RadioListItem: React.FC<RadioListItemProps> = (props) => {
  const { className, children, onClick, isActive, ...rest } = props;

  const onItemClick = (e: MouseEvent): void => {
    if (onClick) {
      onClick(e);
    }
  };

  const itemClassName: string = cnRadioList('Item')
    .mix(className)
    .state({ active: Boolean(isActive) })
    .toString();

  return (
    <li {...rest} className={itemClassName}>
      <button type="button" className={cnRadioList('ItemButton')} onClick={onItemClick}>
        {children}
      </button>
    </li>
  );
};
