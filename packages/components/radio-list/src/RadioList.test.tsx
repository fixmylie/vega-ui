import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { RadioList, RadioListProps } from './RadioList';

function renderComponent(props?: RadioListProps): RenderResult {
  return render(<RadioList {...props} />);
}

describe('RadioList', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ title: 'Test' });
  });
});
