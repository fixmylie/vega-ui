export type Direction = 'up' | 'down' | 'left' | 'right';

export type Orientation = 'vertical' | 'horizontal';

export interface SplitOptions {
  direction: Direction;
}

export class Split {
  private direction: Direction;

  static HORIZONTAL = 'horizontal';

  static VERTICAL = 'vertical';

  static of(direction: Direction): Split {
    return new Split(direction);
  }

  constructor(direction: Direction) {
    this.direction = direction;
  }

  public getOrientation(): Orientation {
    return this.direction === 'up' || this.direction === 'down' ? 'vertical' : 'horizontal';
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public isVertical(): boolean {
    return this.getOrientation() === 'vertical';
  }

  public isHorizontal(): boolean {
    return !this.isVertical();
  }

  public isBefore(): boolean {
    return this.direction === 'up' || this.direction === 'left';
  }

  public isAfter(): boolean {
    return !this.isBefore();
  }
}
