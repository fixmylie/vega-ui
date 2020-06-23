/* eslint-disable max-classes-per-file */
import { Direction, Split } from './Split';

interface Serializable<T = object> {
  serialize(): T;
}

abstract class Node<T> implements Serializable<T> {
  abstract serialize(): T;
}

interface BranchBox {
  width: number;
  height: number;
}

export interface BranchState {
  box: BranchBox;
  splitDirection: Direction;
}

export class BranchNode extends Node<BranchState> {
  public readonly split: Split;

  private box: BranchBox;

  static of(state: BranchState): BranchNode {
    return new BranchNode(Split.of(state.splitDirection), state.box);
  }

  static fromDirection(direction: Direction): BranchNode {
    return new BranchNode(Split.of(direction));
  }

  private constructor(split: Split, box?: BranchBox) {
    super();
    this.split = split;
    this.box = {
      width: box?.width ?? 0,
      height: box?.height ?? 0,
    };
  }

  public serialize(): BranchState {
    return {
      box: this.box,
      splitDirection: this.split.getDirection(),
    };
  }
}

export interface LeafState {
  view: string | null;
  data: object;
}

export class LeafNode extends Node<LeafState> {
  private state: LeafState;

  static create(state?: Partial<LeafState>): LeafNode {
    return LeafNode.of({
      view: state?.view ?? null,
      data: state?.data ?? {},
    });
  }

  static of(state: LeafState): LeafNode {
    return new LeafNode(state);
  }

  private constructor(state: LeafState) {
    super();
    this.state = state;
  }

  public clone(): LeafNode {
    return LeafNode.of(this.getState());
  }

  public setState(state: Partial<LeafState>): LeafNode {
    this.state = {
      ...this.state,
      ...state,
    };

    return this;
  }

  public getState(): LeafState {
    return this.state;
  }

  public serialize(): LeafState {
    return this.state;
  }
}
