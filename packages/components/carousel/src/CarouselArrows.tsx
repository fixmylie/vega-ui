import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconArrowLeft, IconArrowRight } from '@gpn-prototypes/vega-icons';

import { b, useCarousel } from './context';

interface CarouselArrowsProps {
  nextLabel?: string;
  prevLabel?: string;
  nextClassName?: string;
  prevClassName?: string;
}

interface CarouselArrowsViewProps extends CarouselArrowsProps {
  onNext(): void;
  onPrev(): void;
}

export const CarouselArrowsView: React.FC<CarouselArrowsViewProps> = (props) => {
  const { nextLabel, prevLabel, nextClassName, prevClassName, onPrev, onNext } = props;
  return (
    <>
      <Button
        title={prevLabel}
        aria-label={prevLabel ?? 'Предыдущий слайд'}
        onlyIcon
        iconLeft={IconArrowLeft}
        className={b('Arrow', { position: 'left' }).mix(prevClassName).toString()}
        size="l"
        view="clear"
        onClick={onPrev}
      />
      <Button
        title={nextLabel}
        aria-label={nextLabel ?? 'Следующий слайд'}
        iconLeft={IconArrowRight}
        className={b('Arrow', { position: 'right' }).mix(nextClassName).toString()}
        size="l"
        view="clear"
        onClick={onNext}
      />
    </>
  );
};

export const CarouselArrows: React.FC<CarouselArrowsProps> = (props) => {
  const { prev, next } = useCarousel();
  return <CarouselArrowsView {...props} onPrev={prev} onNext={next} />;
};
