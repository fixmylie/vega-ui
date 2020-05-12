# AppContainerManager

Класс предоставляет своему экземпляру API для управления корневым контейнером приложения.

### API

Принимает в конструктор

```ts
rootId - id для корневого элемента приложения
portalRootId - id корневого элемента для порталов приложения
```

Методы

```ts
createPortalRoot({ className?: string }) - метод для создания корневого элемента для порталов. На вход может принимать { className?: string }
removePortalRoot() - метод для удаления корневого элемента для порталов
getPortalRoot() - возвращает корневой элемент для порталов
getRoot() - возвращает корневой элемент приложения
updatePortalRootClassName(className: string) - обновляет класснейм для корневого портала
updateRootClassName(className: string) - обновляет класснейм для корневого элемента

```