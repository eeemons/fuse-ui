import { TreeItem } from "./Tree";

interface TreeNodeProps {
  node: TreeItem;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  onExpand?: () => void;
  expanded?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  showLines?: boolean;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  draggable,
  onDragStart,
  onDrop,
  onClick,
  onExpand,
  expanded,
  selected,
  onSelect,
  showLines,
  expandIcon,
  collapseIcon,
  children,
}) => {
  return (
    <div
      className="py-0.5 transition-all duration-200 ease-in-out text-sm"
      role="treeitem"
    >
      <div
        className={`flex items-center p-1 rounded hover:bg-gray-100 hover:translate-x-1 transition-all duration-200 ${
          draggable ? "cursor-move" : "cursor-pointer"
        } ${selected ? "bg-blue-50 font-medium" : ""}`}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
          onSelect?.();
        }}
      >
        {node.children && node.children.length > 0 && (
          <span
            className="mr-1.5 transition-transform duration-200 hover:scale-110 text-gray-600 w-4 h-4 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.();
            }}
          >
            {expanded ? collapseIcon || "⌄" : expandIcon || "›"}
          </span>
        )}
        {(node.children?.length ?? 0) === 0 && (
          <span key="empty-node" className="w-4 mr-1.5" />
        )}
        {node.icon && <span className="mr-1.5">{node.icon}</span>}
        <span>{node.label}</span>
      </div>
      <div
        className={`ml-4 pl-4 border-l border-dashed border-gray-200 overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
