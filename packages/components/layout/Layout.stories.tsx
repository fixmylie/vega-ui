import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grid } from './grid/Grid';
import { Layout } from './Layout';

storiesOf('ui/Layout', module).add('по умолчанию', () => {
  const grid = Grid.create();
  return <Layout grid={grid} />;
});
