import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { RadioList, RadioListProps } from './RadioList';

const defaultKnobs = (): RadioListProps => ({
  title: text('title', 'Title'),
});

storiesOf('ui/RadioList', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('RadioList', () => <RadioList {...defaultKnobs()} />);
