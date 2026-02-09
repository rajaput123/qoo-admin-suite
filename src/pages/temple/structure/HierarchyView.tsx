import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  GitBranch, 
  ChevronRight, 
  ChevronDown, 
  Home, 
  Landmark, 
  Heart, 
  DoorOpen, 
  MonitorSmartphone,
  Pencil,
  Expand,
  Shrink
} from "lucide-react";
import { toast } from "sonner";

type NodeType = "main" | "shrine" | "sacred" | "hall" | "counter";

interface HierarchyNode {
  id: string;
  name: string;
  type: NodeType;
  status: "active" | "inactive";
  children?: HierarchyNode[];
}

const mockHierarchy: HierarchyNode = {
  id: "main-1",
  name: "Sri Venkateswara Temple",
  type: "main",
  status: "active",
  children: [
    {
      id: "shrine-1",
      name: "Padmavathi Shrine",
      type: "shrine",
      status: "active",
      children: [
        {
          id: "sacred-1",
          name: "Swami Samadhi",
          type: "sacred",
          status: "active",
        },
        {
          id: "counter-1",
          name: "Prasadam Counter",
          type: "counter",
          status: "active",
        },
      ],
    },
    {
      id: "shrine-2",
      name: "Varadaraja Shrine",
      type: "shrine",
      status: "active",
      children: [
        {
          id: "hall-1",
          name: "Sabha Mandapam",
          type: "hall",
          status: "active",
        },
      ],
    },
    {
      id: "hall-2",
      name: "Kalyana Mandapam",
      type: "hall",
      status: "active",
    },
    {
      id: "hall-3",
      name: "Annadanam Hall",
      type: "hall",
      status: "active",
    },
    {
      id: "counter-2",
      name: "Hundi Counter 1",
      type: "counter",
      status: "active",
    },
    {
      id: "counter-3",
      name: "Darshan Ticket Counter",
      type: "counter",
      status: "active",
    },
    {
      id: "counter-4",
      name: "Information Desk",
      type: "counter",
      status: "inactive",
    },
  ],
};

const getNodeIcon = (type: NodeType) => {
  switch (type) {
    case "main": return Home;
    case "shrine": return Landmark;
    case "sacred": return Heart;
    case "hall": return DoorOpen;
    case "counter": return MonitorSmartphone;
    default: return Home;
  }
};

const getNodeColor = (type: NodeType) => {
  switch (type) {
    case "main": return "bg-primary/10 text-primary border-primary/20";
    case "shrine": return "bg-blue-100 text-blue-700 border-blue-200";
    case "sacred": return "bg-rose-100 text-rose-700 border-rose-200";
    case "hall": return "bg-amber-100 text-amber-700 border-amber-200";
    case "counter": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const getNodeLabel = (type: NodeType) => {
  switch (type) {
    case "main": return "Main Temple";
    case "shrine": return "Shrine";
    case "sacred": return "Sacred";
    case "hall": return "Hall";
    case "counter": return "Counter";
    default: return "";
  }
};

interface TreeNodeProps {
  node: HierarchyNode;
  level: number;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
  onEditNode: (node: HierarchyNode) => void;
}

const TreeNode = ({ node, level, expandedNodes, toggleNode, onEditNode }: TreeNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const Icon = getNodeIcon(node.type);

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer ${
          node.status === "inactive" ? "opacity-60" : ""
        }`}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => onEditNode(node)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNode(node.id);
            }}
            className="p-0.5 hover:bg-muted rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        <div className={`p-1.5 rounded-md border ${getNodeColor(node.type)}`}>
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{node.name}</p>
        </div>

        <Badge variant="outline" className={`text-xs ${getNodeColor(node.type)}`}>
          {getNodeLabel(node.type)}
        </Badge>

        {node.status === "inactive" && (
          <Badge variant="secondary" className="text-xs">Inactive</Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onEditNode(node);
          }}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </div>

      {hasChildren && isExpanded && (
        <div className="border-l-2 border-muted ml-4">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              onEditNode={onEditNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HierarchyView = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["main-1", "shrine-1", "shrine-2"])
  );
  const [editingNode, setEditingNode] = useState<HierarchyNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "active" as "active" | "inactive",
  });

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    const getAllIds = (node: HierarchyNode): string[] => {
      const ids = [node.id];
      if (node.children) {
        node.children.forEach((child) => {
          ids.push(...getAllIds(child));
        });
      }
      return ids;
    };
    setExpandedNodes(new Set(getAllIds(mockHierarchy)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  const handleEditNode = (node: HierarchyNode) => {
    setEditingNode(node);
    setFormData({
      name: node.name,
      status: node.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    toast.success(`${getNodeLabel(editingNode!.type)} updated successfully`);
    setIsModalOpen(false);
    setEditingNode(null);
  };

  const countNodes = (node: HierarchyNode): number => {
    let count = 1;
    if (node.children) {
      node.children.forEach((child) => {
        count += countNodes(child);
      });
    }
    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Hierarchy View</h1>
          <p className="text-muted-foreground">Visual representation of temple structure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            <Expand className="h-4 w-4 mr-2" />
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            <Shrink className="h-4 w-4 mr-2" />
            Collapse All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GitBranch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Temple Hierarchy</CardTitle>
              <CardDescription>{countNodes(mockHierarchy)} structures in hierarchy</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="py-2">
            <TreeNode
              node={mockHierarchy}
              level={0}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              onEditNode={handleEditNode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {(["main", "shrine", "sacred", "hall", "counter"] as NodeType[]).map((type) => {
              const Icon = getNodeIcon(type);
              return (
                <div key={type} className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md border ${getNodeColor(type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-muted-foreground">{getNodeLabel(type)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit {editingNode ? getNodeLabel(editingNode.type) : ""}</DialogTitle>
            <DialogDescription>
              Update structure details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HierarchyView;
