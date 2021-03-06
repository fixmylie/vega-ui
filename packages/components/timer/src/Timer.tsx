import React from 'react';
import { Timer as BaseTimer } from '@gpn-design/uikit/Timer';

export type TimerProps = React.ComponentProps<typeof BaseTimer>;

export const Timer: React.FC<TimerProps> = (props) => {
  return <BaseTimer {...props} />;
};
