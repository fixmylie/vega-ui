import { LeafNode } from './Node';
import { Direction } from './Split';
import { Tree, TreeSerializedState } from './Tree';

export class Grid {
  readonly tree: Tree;

  private listeners: VoidFunction[];

  static create(state?: TreeSerializedState): Grid {
    if (state !== undefined) {
      return new Grid(Tree.fromState(state));
    }

    return new Grid(Tree.create());
  }

  private constructor(tree: Tree) {
    this.tree = tree;
    this.listeners = [];
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  onChange(fn: VoidFunction): VoidFunction {
    this.listeners.push(fn);

    return (): void => {
      this.listeners.splice(this.listeners.indexOf(fn), 1);
    };
  }

  close(leaf: LeafNode): void {
    const idx = this.tree.indexOf(leaf);
    this.tree.remove(idx);
    this.notifyListeners();
  }

  split(leaf: LeafNode, direction: Direction): void {
    const idx = this.tree.indexOf(leaf);
    this.tree.toBranch(idx, direction);
    this.notifyListeners();
  }

  getState(): TreeSerializedState {
    return this.tree.getState();
  }
}
