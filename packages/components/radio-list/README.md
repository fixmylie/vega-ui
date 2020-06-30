# @gpn-prototypes/vega-radio-list

Компонент является списком с возможностью выбрать один элемент

<img src="docs/radioList.png" height="150">

### Установка

    yarn add @gpn-prototypes/vega-radio-list

### Примеры использования

```jsx
import { RadioList } from '@gpn-prototypes/vega-radio-list';

export const MyComponent = () => {

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
  ];

  return (
      const [activeItem, setActiveItem] = React.useState(scenarioList[0].id);

        return (
          <RadioList>
            {scenarioList.map(item => (
              <RadioList.Item
                key={item.id}
                isActive={activeItem === item.id}
                onClick={(): void => {
                  setActiveItem(item.id);
               }
              >
                <Text>{item.text} </Text>
                {activeItem === item.id && <IconCheck size="s" view="primary" />}
              </RadioList.Item>
            ))}
          </RadioList>
  );
};
```

### API

```ts
type RadioListProps = {
  children?: React.ReactNode;
  className?: string;
};

type RadioListItemProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean; // статус сценария (активен/не активен)
};
```
