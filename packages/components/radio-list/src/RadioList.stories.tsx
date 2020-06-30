import React from 'react';
import { css } from '@emotion/core';
import { IconCheck } from '@gpn-design/uikit/IconCheck';
import { Text } from '@gpn-design/uikit/Text';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { RadioList } from './RadioList';

const scenarioList = [
  {
    id: 'id1',
    text: 'Сценарий 1',
  },
  {
    id: 'id2',
    text: 'Сценарий 2',
  },
  {
    id: 'id3',
    text: 'Сценарий 3',
  },
  {
    id: 'id4',
    text: 'Сценарий 4',
  },
];

const cssIcon = css`
  padding-top: 2px;
`;

storiesOf('ui/RadioList', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => {
    const [activeItem, setActiveItem] = React.useState(scenarioList[0].id);

    const onChange = action('onChange');

    return (
      <RadioList>
        {scenarioList.map((item) => (
          <RadioList.Item
            key={item.id}
            isActive={activeItem === item.id}
            onClick={(): void => {
              setActiveItem(item.id);
              onChange(item.id);
            }}
          >
            <Text>{item.text} </Text>
            {activeItem === item.id && <IconCheck size="s" view="primary" css={cssIcon} />}
          </RadioList.Item>
        ))}
      </RadioList>
    );
  });
