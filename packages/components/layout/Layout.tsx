import React from 'react';

import { Grid } from './grid/Grid';
import { BranchNode, LeafNode } from './grid/Node';
import { TreeNode } from './grid/Tree';

interface LayoutProps {
  grid: Grid;
}

interface LayoutViewProps {
  label: string;
  node: BranchNode | LeafNode;
}

function createHEX(): string {
  return Math.random().toString(16).substr(2, 8);
}

const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const { label, node, ...rest } = props;
  const color = React.useMemo(createHEX, []);
  const style: React.CSSProperties = {
    display: 'grid',
    border: `10px solid #${color}`,
  };

  if (node instanceof BranchNode) {
    if (node.split.getOrientation() === 'vertical') {
      style.gridTemplateRows = '1fr 1fr';
    } else {
      style.gridTemplateColumns = '1fr 1fr';
    }
  }

  return <div {...rest} aria-label={label} style={style} />;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { grid } = props;
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    return grid.onChange(() => {
      forceUpdate({});
    });
  }, [grid]);

  return grid.tree.fold((children, node, idx) => {
    function isLeaf(maybeLeaf: any, nodes: any[]): maybeLeaf is LeafNode {
      return nodes.length === 0;
    }

    console.log({ grid, node, children });

    if (isLeaf(node, children)) {
      return (
        <LayoutView data-index={idx} label="leaf" node={node}>
          <button type="button" onClick={(): void => grid.split(node, 'left')}>
            добавить слева
          </button>
          <button type="button" onClick={(): void => grid.split(node, 'right')}>
            добавить справа
          </button>
          <button type="button" onClick={(): void => grid.split(node, 'up')}>
            добавить сверху
          </button>
          <button type="button" onClick={(): void => grid.split(node, 'up')}>
            добавить снизу
          </button>
          <button type="button" onClick={(): void => grid.close(node)}>
            закрыть
          </button>
        </LayoutView>
      );
    }

    return (
      <LayoutView data-index={idx} label="branch" node={node}>
        {children[0]}
        {children[1]}
      </LayoutView>
    );
  });

  // return grid.map(({ idx, node }) => <LayoutView grid={grid} idx={idx} node={node} />);
};
