import React from 'react';
import { block } from 'bem-cn';

import './RadioList.css';

export type RadioListProps = {
  title?: string;
  className?: string;
};

const cnRadioList = block('VegaRadioList');

export const RadioList: React.FC<RadioListProps> = ({ title = 'default', className }) => {
  return <div className={cnRadioList.mix(className)}>Title: {title}</div>;
};
