import { useState, useCallback } from "react";
import { TreeNode } from "./TreeNode";

export type NodeId = string;

export interface TreeItem {
  id: NodeId;
  label: string;
  children?: TreeItem[];
  parentId?: NodeId;
  icon?: React.ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  metadata?: Record<string, unknown>;
}

export type TreeData = TreeItem[];

export interface TreeDragEvent extends React.DragEvent<HTMLDivElement> {
  nodeId: NodeId;
}

export interface TreeProps {
  data: TreeData;
  draggable: boolean;
  onNodeClick?: (node: TreeItem) => void;
  onNodeDrop?: (draggedId: NodeId, dropTargetId: NodeId) => void;
  className?: string;
  showLines: boolean;
  defaultExpandAll: boolean;
  selectable: boolean;
  selectedKeys: NodeId[];
  onSelect?: (selectedKeys: NodeId[], node: TreeItem) => void;
}

export interface TreeState {
  treeData: TreeData;
  expandedKeys: Set<NodeId>;
  selectedKeys: NodeId[];
}

const Tree: React.FC<TreeProps> = ({
  data,
  draggable = false,
  onNodeClick,
  onNodeDrop,
  className = "",
  showLines = false,
  defaultExpandAll = false,
  selectable = true,
  selectedKeys = [],
  onSelect,
}) => {
  const [treeData, setTreeData] = useState<TreeData>(data);
  const [expandedKeys, setExpandedKeys] = useState<Set<NodeId>>(
    new Set(defaultExpandAll ? data.map((node) => node.id) : [])
  );

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeId: NodeId
  ): void => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", nodeId);
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, targetId: NodeId): void => {
      event.preventDefault();
      event.stopPropagation();
      const draggedId = event.dataTransfer.getData("text/plain");

      if (draggedId === targetId) return;

      // Function to find and remove node from current position
      const findAndRemoveNode = (
        items: TreeData,
        id: NodeId
      ): [TreeItem | null, TreeData] => {
        let removedNode: TreeItem | null = null;
        const filterItems = (nodes: TreeData): TreeData => {
          return nodes.reduce((acc: TreeData, node) => {
            if (node.id === id) {
              removedNode = node;
              return acc;
            }
            if (node.children) {
              const newChildren = filterItems(node.children);
              return [...acc, { ...node, children: newChildren }];
            }
            return [...acc, node];
          }, []);
        };

        const newItems = filterItems(items);
        return [removedNode, newItems];
      };

      // Function to insert node at new position
      const insertNode = (
        items: TreeData,
        targetId: NodeId,
        nodeToInsert: TreeItem
      ): TreeData => {
        return items.map((item) => {
          if (item.id === targetId) {
            return {
              ...item,
              children: item.children
                ? [...item.children, nodeToInsert]
                : [nodeToInsert],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: insertNode(item.children, targetId, nodeToInsert),
            };
          }
          return item;
        });
      };

      const [removedNode, intermediateTree] = findAndRemoveNode(
        treeData,
        draggedId
      );
      if (removedNode) {
        const newTree = insertNode(intermediateTree, targetId, removedNode);
        setTreeData(newTree);
        onNodeDrop?.(draggedId, targetId);
      }
    },
    [treeData, onNodeDrop]
  );

  const toggleExpand = useCallback((nodeId: NodeId): void => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (nodeId: NodeId, node: TreeItem): void => {
      if (!selectable) return;
      const newSelectedKeys: NodeId[] = [nodeId];
      onSelect?.(newSelectedKeys, node);
    },
    [selectable, onSelect]
  );

  const renderTreeNodes = useCallback(
    (nodes: TreeData): React.ReactNode => {
      return nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          draggable={draggable && !node.disabled}
          onDragStart={
            draggable ? (e) => handleDragStart(e, node.id) : undefined
          }
          onDrop={draggable ? (e) => handleDrop(e, node.id) : undefined}
          onClick={() => onNodeClick?.(node)}
          onExpand={() => toggleExpand(node.id)}
          expanded={expandedKeys.has(node.id)}
          selected={selectedKeys.includes(node.id)}
          onSelect={() => handleSelect(node.id, node)}
          showLines={showLines}
        >
          {node.children && renderTreeNodes(node.children)}
        </TreeNode>
      ));
    },
    [
      draggable,
      expandedKeys,
      selectedKeys,
      handleDrop,
      onNodeClick,
      showLines,
      handleSelect,
    ]
  );

  return (
    <div className={`tree-component ${className}`} role="tree">
      {renderTreeNodes(treeData)}
    </div>
  );
};

export default Tree;
