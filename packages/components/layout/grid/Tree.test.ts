import { BranchNode, LeafNode } from './Node';
import { Tree, TreeNode } from './Tree';

describe('Tree', () => {
  function toString(children: string[], node: TreeNode, idx: number): string {
    if (children.length > 0) {
      return `${idx}(${children.join(',')})`;
    }

    return String(idx);
  }

  function debug(tree: Tree): void {
    const result = tree.toArray().map((node, idx) => {
      return [idx, JSON.stringify(node?.serialize() ?? null)];
    });

    console.log(result);
  }

  describe('creation', () => {
    test('create', () => {
      expect(Tree.create()).toBeInstanceOf(Tree);
    });
    test('of', () => {
      expect(Tree.of({ 0: LeafNode.create() })).toBeInstanceOf(Tree);
    });
    test('from', () => {
      expect(Tree.from()).toBeInstanceOf(Tree);
    });
  });

  test('nth', () => {
    const tree = Tree.from(LeafNode.create());
    expect(tree.nth(0)).toBeInstanceOf(LeafNode);
    expect(tree.nth(1)).toBe(undefined);
    expect(tree.nth(-1)).toBe(undefined);
  });

  test('root', () => {
    const node = LeafNode.create();
    const tree = Tree.from(node);
    expect(tree.root()).toBe(node);
  });

  test('max', () => {
    const branch = BranchNode.fromDirection('up');
    const left = LeafNode.create();
    const right = LeafNode.create();
    const tree = Tree.from(branch, left, right);
    const [idx, node] = tree.max();

    expect(idx).toBe(2);
    expect(node).toBe(right);
  });

  test('fold', () => {
    let tree = Tree.create();

    let result = tree.fold(toString);

    expect(result).toBe('0');

    tree = Tree.create();
    tree.toBranch(0, 'down');

    result = tree.fold(toString);

    expect(result).toBe('0(1,2)');

    tree = Tree.create();
    tree.toBranch(0, 'down');
    tree.toBranch(1, 'left');

    result = tree.fold(toString);
    expect(result).toBe('0(1(3,4),2)');

    tree.toBranch(2, 'right');

    result = tree.fold(toString);

    expect(result).toBe('0(1(3,4),2(5,6))');
  });

  test('toBranch', () => {
    const leaf = LeafNode.create();
    const tree = Tree.from(leaf);
    let [max] = tree.max();
    tree.toBranch(max, 'up');
    [max] = tree.max();
    tree.toBranch(max, 'left');
  });

  test.only('remove', () => {
    let tree = Tree.create();

    // tree.toBranch(0, 'down');
    // tree.toBranch(1, 'left');
    // tree.toBranch(3, 'right');

    // const branch = tree.nth(3);
    // const leftLeaf = tree.nth(7);
    // const rightLeaf = tree.nth(8);

    // tree.remove(4);
    // expect(tree.nth(1)).toBe(branch);
    // expect(tree.nth(3)).toBe(leftLeaf);
    // expect(tree.nth(4)).toBe(rightLeaf);

    // tree.remove(3);
    // expect(tree.nth(1)).toBe(rightLeaf);

    // tree.remove(2);
    // expect(tree.root()).toBe(rightLeaf);

    const state = {
      0: BranchNode.fromDirection('left'),
      1: LeafNode.create(),
      2: BranchNode.fromDirection('right'),
      5: BranchNode.fromDirection('up'),
      6: LeafNode.create(),
      11: LeafNode.create(),
      12: LeafNode.create(),
    };

    tree = Tree.of(state);

    debug(tree);
    tree.remove(1);
    debug(tree);
    expect(tree.nth(0)).toBe(state[2]);
    expect(tree.nth(1)).toBe(state[5]);
    expect(tree.nth(2)).toBe(state[6]);
    expect(tree.nth(3)).toBe(state[11]);
    expect(tree.nth(4)).toBe(state[12]);
  });

  test('toArray', () => {
    const tree = Tree.create();
    tree.toBranch(0, 'down');
    tree.toBranch(2, 'left');

    const treeArray = tree.toArray().map((node) => {
      if (node instanceof BranchNode) {
        return 'branch';
      }

      if (node instanceof LeafNode) {
        return 'leaf';
      }

      return node;
    });

    expect(treeArray).toEqual(['branch', 'leaf', 'branch', null, null, 'leaf', 'leaf']);
  });

  test('экспорт и импорт состояния', () => {
    const branch = BranchNode.fromDirection('down');
    const left = LeafNode.create();
    const right = LeafNode.create();
    const tree = Tree.from(branch, left, right);
    const state = tree.getState();
    expect(tree.fold(toString)).toBe(Tree.fromState(state).fold(toString));
  });
});
