import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import { RadioList, RadioListProps } from './RadioList';
import { RadioListItemProps } from './RadioListItem';

type ComponentsProps = {
  radioListProps?: Partial<RadioListProps>;
  itemProps?: Partial<RadioListItemProps>;
};

const renderComponent = (componentsProps: ComponentsProps = {}): RenderResult => {
  const { radioListProps, itemProps } = componentsProps;
  const props = {
    radioListProps,
    itemProps,
  };

  return render(
    <RadioList {...props.radioListProps} data-testid="RadioList">
      <RadioList.Item isActive {...props.itemProps} data-testid="RadioList:Item">
        TEST
      </RadioList.Item>
      <RadioList.Item>TEST2</RadioList.Item>
    </RadioList>,
  );
};

const findItem = (testId = 'RadioList:Item'): Element => {
  return screen.getByTestId(testId);
};

describe('RadioList', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });
});

describe('RadioListItem', () => {
  test('проставляется класс is-active', () => {
    renderComponent();

    const item = findItem();

    expect(item.classList.contains('is-active')).toBe(true);
  });
});
