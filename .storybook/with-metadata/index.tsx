import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { block } from 'bem-cn';

import './styles.css';

const cnMetadata = block('Metadata');

export enum Status {
  Draft = 'Draft',
  Approved = 'Approved',
  Deprecated = 'Deprecated',
}

type Parameters = {
  status?: Status;
  author?: string;
  description?: string;
};

const noStatus = 'Статус не указан';
const noAuthor = 'Автор не указан';

const tagsDescriptions = {
  Approved: 'Компонент закончен и прошел проверку. Готов к использованию',
  Draft: 'Компонент не доработан/не прошел проверку. Может содержать баги',
  Deprecated: 'Устарел и будет удален в следующих версиях. Не рекомендуется к использованию',
  NoStatus: 'Укажите статус компонента',
};

export const withMetadata = makeDecorator({
  name: 'withMetadata',
  parameterName: 'metadata',
  wrapper: (getStory, context, { parameters = {} }) => {
    const { status = noStatus, author = noAuthor, description } = parameters as Parameters;

    const statusSuccess = status === Status.Approved;
    const statusWarning = status === Status.Deprecated;
    const statusAlert = status === noStatus;
    const authorAlert = author === noAuthor;

    return (
      <>
        <div className={cnMetadata('panel')}>
          <span
            title={tagsDescriptions[status] || tagsDescriptions.NoStatus}
            className={cnMetadata('tag', {
              success: statusSuccess,
              warning: statusWarning,
              alert: statusAlert,
            })}
          >
            {status}
          </span>
          <span
            title="Автор компонента"
            className={cnMetadata('tag', {
              alert: authorAlert,
            })}
          >
            {author}
          </span>
          {description && <span className={cnMetadata('description')}>{description}</span>}
        </div>
        <div className={cnMetadata('wrapper')}>{getStory(context)}</div>
      </>
    );
  },
});
