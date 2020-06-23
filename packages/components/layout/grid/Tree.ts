/* eslint-disable max-classes-per-file */
import { Cursor } from './Cursor';
import { BranchNode, BranchState, LeafNode, LeafState } from './Node';
import { Direction } from './Split';

export type TreeNode = BranchNode | LeafNode;
type TreeNodeState = BranchState | LeafState;
type Optional<T> = T | undefined;

export type TreeState = {
  [idx: string]: TreeNode;
} & {
  '0': TreeNode;
};

export type TreeSerializedState = Record<number, TreeNodeState> & {
  '0': TreeNode;
};
type TreeEntry = [number, TreeNode];

export class Tree {
  private state: TreeState;

  static create(state?: TreeState): Tree {
    return Tree.of(state ?? { 0: LeafNode.create() });
  }

  static of(state: TreeState): Tree {
    return new Tree(state);
  }

  static from(...nodes: TreeNode[]): Tree {
    const [root] = nodes;
    return Tree.create({
      ...Object.fromEntries(Object.entries(nodes)),
      0: root,
    });
  }

  static fromState(state: TreeSerializedState): Tree {
    const tree = Tree.create();

    Object.entries(state).forEach(([strIdx, s]) => {
      const idx = Number(strIdx);
      const cursor = Cursor.of(idx);
      const isLeaf = state[cursor.parent()] !== undefined;
      tree.insert(idx, isLeaf ? LeafNode.of(s as LeafState) : BranchNode.of(s as BranchState));
    });

    return tree;
  }

  private constructor(state: TreeState) {
    this.state = state;
  }

  public nth(idx: number): Optional<TreeNode> {
    return this.state[idx];
  }

  public root(): TreeNode {
    const root = this.nth(0);

    if (root === undefined) {
      throw new Error('Отсутствует корневой элемент');
    }

    return root;
  }

  public max(): TreeEntry | [number, null] {
    let index = 0;
    let node = this.root();

    if (node === undefined) {
      return [index, null];
    }

    this.iterate((n, idx) => {
      node = idx > index ? n : node;
      index = Math.max(index, idx);
    });

    return [index, node];
  }

  private iterate(fn: (node: TreeNode, idx: number, done: () => void) => null | void): void {
    let isDone = false;
    const entries = Object.entries(this.state);

    function done(): void {
      isDone = true;
    }

    for (let i = 0; i < entries.length; ) {
      const [idx, node] = entries[i];

      fn(node, Number(idx), done);

      if (isDone) {
        break;
      }

      i += 1;
    }
  }

  public indexOf(node: TreeNode): number {
    let index = -1;

    this.iterate((n, idx, done) => {
      if (n === node) {
        index = idx;
        done();
      }
    });

    return index;
  }

  public toArray(): (TreeNode | null)[] {
    const [maxIdx] = this.max();
    const result = Array(maxIdx).fill(null);

    this.iterate((node, idx) => {
      result[idx] = node;
    });

    return result;
  }

  public insert(idx: number, node: TreeNode): void {
    this.state[idx] = node;
  }

  private lift(fromIdx: number, toIdx: number, top: number = toIdx): void {
    console.log({ fromIdx, toIdx });
    const cursor = Cursor.of(fromIdx);
    const topCursor = Cursor.of(top);
    const node = this.nth(fromIdx);

    if (node === undefined) {
      return;
    }

    if (node instanceof BranchNode) {
      this.insert(toIdx, node);

      if (cursor.isLeft()) {
        console.log('left');
        this.lift(cursor.left(), topCursor.left(), topCursor.left());
        this.lift(cursor.right(), topCursor.right(), topCursor.toRight().right());
      }

      if (cursor.isRight()) {
        console.log('right');
        this.lift(cursor.left(), Cursor.of(top).left());
        this.lift(cursor.right(), cursor.index());
      }
    } else {
      console.log(`leaf(${fromIdx}) -> ${toIdx}`);
      delete this.state[fromIdx];
      this.insert(toIdx, node);
    }
  }

  public remove(idx: number): void {
    const cursor = Cursor.of(idx);
    const parent = this.nth(cursor.parent());

    if (parent instanceof BranchNode) {
      delete this.state[idx];
      this.lift(cursor.sibling(), cursor.parent());
    }
  }

  public toBranch(idx: number, direction: Direction): void {
    const node = this.nth(idx);

    if (node === undefined || node instanceof BranchNode) {
      return;
    }

    const leaf = node;
    const cursor = Cursor.of(idx);
    const branch = BranchNode.fromDirection(direction);

    this.insert(idx, branch);

    if (branch.split.isBefore()) {
      this.insert(cursor.left(), leaf.clone().setState({ data: { idx: cursor.left() } }));
      this.insert(cursor.right(), leaf.setState({ data: { idx: cursor.right() } }));
    } else {
      this.insert(cursor.left(), leaf.setState({ data: { idx: cursor.left() } }));
      this.insert(cursor.right(), leaf.clone().setState({ data: { idx: cursor.right() } }));
    }
  }

  public fold<T>(fn: (children: [T, T] | [], node: TreeNode, idx: number) => T): T {
    const nodes = this.toArray().reverse();
    const childrenByParentIdx: Record<number, T[]> = {};
    const cursor = Cursor.of(0);

    nodes.forEach((n, idx) => {
      const currentIdx = nodes.length - 1 - idx;

      cursor.to(currentIdx);

      if (n === null) {
        return;
      }

      const children = childrenByParentIdx[currentIdx] ?? [];
      const parentIdx = cursor.parent();
      const parentChildren = childrenByParentIdx[parentIdx] ?? [];

      parentChildren.unshift(
        fn(children.length === 0 ? [] : [children[0], children[1]], n, currentIdx),
      );
      childrenByParentIdx[parentIdx] = parentChildren;
    });

    return childrenByParentIdx[-1][0];
  }

  public getState(): TreeSerializedState {
    const state: TreeSerializedState = {
      0: this.root().serialize(),
    };

    this.iterate((node, idx) => {
      state[idx] = node.serialize();
    });

    return state;
  }
}
