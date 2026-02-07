import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { 
  X,
  ChefHat,
  Carrot,
  Truck,
  Users,
  UserCheck,
  Package,
  Expand,
  Minimize2
} from "lucide-react";
import { dishes, ingredients, suppliers, customers, employees } from "@/data/mockData";

const nodeColors: Record<string, string> = {
  dish: "hsl(217, 91%, 50%)",
  ingredient: "hsl(160, 84%, 39%)",
  supplier: "hsl(38, 92%, 50%)",
  customer: "hsl(199, 89%, 48%)",
  employee: "hsl(280, 65%, 60%)",
  delivery: "hsl(0, 84%, 60%)",
};

const nodeIcons: Record<string, React.ElementType> = {
  dish: ChefHat,
  ingredient: Carrot,
  supplier: Truck,
  customer: Users,
  employee: UserCheck,
  delivery: Package,
};

const clusterNodes: Node[] = [
  { id: "cluster-dishes", position: { x: 100, y: 200 }, data: { label: "Platillos", count: dishes.length, type: "dish" }, type: "cluster" },
  { id: "cluster-ingredients", position: { x: 350, y: 100 }, data: { label: "Ingredientes", count: ingredients.length, type: "ingredient" }, type: "cluster" },
  { id: "cluster-suppliers", position: { x: 600, y: 200 }, data: { label: "Proveedores", count: suppliers.length, type: "supplier" }, type: "cluster" },
  { id: "cluster-customers", position: { x: 100, y: 400 }, data: { label: "Clientes", count: customers.length, type: "customer" }, type: "cluster" },
  { id: "cluster-employees", position: { x: 350, y: 450 }, data: { label: "Empleados", count: employees.length, type: "employee" }, type: "cluster" },
];

const clusterEdges: Edge[] = [
  { id: "e1", source: "cluster-dishes", target: "cluster-ingredients", label: "usa", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "cluster-ingredients", target: "cluster-suppliers", label: "proviene de", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3", source: "cluster-customers", target: "cluster-dishes", label: "ordena", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e4", source: "cluster-employees", target: "cluster-dishes", label: "prepara", markerEnd: { type: MarkerType.ArrowClosed } },
];

function ClusterNode({ data }: { data: { label: string; count: number; type: string } }) {
  const Icon = nodeIcons[data.type] || Package;
  const color = nodeColors[data.type];

  return (
    <div 
      className="px-6 py-4 rounded-2xl border-2 shadow-lg cursor-pointer hover:scale-105 transition-transform"
      style={{ 
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold">{data.label}</p>
          <p className="text-sm text-muted-foreground">{data.count} elementos</p>
        </div>
      </div>
    </div>
  );
}

function EntityNode({ data }: { data: { label: string; type: string; meta?: Record<string, unknown> } }) {
  const Icon = nodeIcons[data.type] || Package;
  const color = nodeColors[data.type];

  return (
    <div 
      className="px-4 py-3 rounded-xl border shadow-md"
      style={{ 
        backgroundColor: 'white',
        borderColor: color,
      }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
    </div>
  );
}

const nodeTypes = {
  cluster: ClusterNode,
  entity: EntityNode,
};

export default function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(clusterNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(clusterEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [expandedClusters, setExpandedClusters] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === "cluster" && !expandedClusters.includes(node.id)) {
      // Expand cluster
      const clusterType = node.data.type as string;
      let entityData: { id: string; name: string }[] = [];

      switch (clusterType) {
        case "dish":
          entityData = dishes.map(d => ({ id: d.id, name: d.name }));
          break;
        case "ingredient":
          entityData = ingredients.map(i => ({ id: i.id, name: i.name }));
          break;
        case "supplier":
          entityData = suppliers.map(s => ({ id: s.id, name: s.name }));
          break;
        case "customer":
          entityData = customers.slice(0, 5).map(c => ({ id: c.id, name: c.name }));
          break;
        case "employee":
          entityData = employees.map(e => ({ id: e.id, name: e.name }));
          break;
      }

      const newNodes = entityData.slice(0, 8).map((entity, index) => ({
        id: `${node.id}-${entity.id}`,
        position: {
          x: node.position.x + (index % 3) * 150 - 150,
          y: node.position.y + Math.floor(index / 3) * 80 + 100,
        },
        data: { label: entity.name, type: clusterType },
        type: "entity" as const,
      }));

      const newEdges = newNodes.map(n => ({
        id: `edge-${node.id}-${n.id}`,
        source: node.id,
        target: n.id,
        style: { strokeDasharray: "5 5" },
      }));

      setNodes(nds => [...nds, ...newNodes]);
      setEdges(eds => [...eds, ...newEdges]);
      setExpandedClusters(prev => [...prev, node.id]);
    } else if (node.type === "entity") {
      setSelectedNode(node);
    }
  }, [expandedClusters, setNodes, setEdges]);

  const collapseCluster = (clusterId: string) => {
    setNodes(nds => nds.filter(n => !n.id.startsWith(`${clusterId}-`) && n.id !== clusterId || n.id === clusterId));
    setEdges(eds => eds.filter(e => !e.id.includes(clusterId) || clusterEdges.some(ce => ce.id === e.id)));
    setExpandedClusters(prev => prev.filter(id => id !== clusterId));
  };

  const resetGraph = () => {
    setNodes(clusterNodes);
    setEdges(clusterEdges);
    setExpandedClusters([]);
    setSelectedNode(null);
  };

  return (
    <DashboardLayout>
      <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : "h-[calc(100vh-4rem)] lg:h-screen"} flex flex-col`}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Grafo de Conocimiento</h1>
            <p className="text-sm text-muted-foreground">
              Visualiza las conexiones entre entidades de tu restaurante
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetGraph}>
              Reiniciar
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Graph */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <Background gap={20} size={1} />
          </ReactFlow>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border">
            <p className="text-sm font-medium mb-2">Leyenda</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(nodeColors).slice(0, 5).map(([type, color]) => {
                const Icon = nodeIcons[type];
                const labels: Record<string, string> = {
                  dish: "Platillos",
                  ingredient: "Ingredientes",
                  supplier: "Proveedores",
                  customer: "Clientes",
                  employee: "Empleados",
                };
                return (
                  <div key={type} className="flex items-center gap-1.5">
                    <div 
                      className="w-4 h-4 rounded flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs">{labels[type]}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Haz clic en un cluster para expandirlo
            </p>
          </div>

          {/* Expanded clusters */}
          {expandedClusters.length > 0 && (
            <div className="absolute top-4 left-4 space-y-2">
              {expandedClusters.map(clusterId => (
                <Badge 
                  key={clusterId}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => collapseCluster(clusterId)}
                >
                  {clusterId.replace("cluster-", "")} expandido
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Entity Detail Panel */}
        {selectedNode && (
          <Card className="absolute right-4 top-20 w-80 shadow-xl animate-slide-in-right">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedNode.data.label as string}</CardTitle>
                <Button variant="ghost" size="icon-sm" onClick={() => setSelectedNode(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Badge 
                className="w-fit"
                style={{ 
                  backgroundColor: `${nodeColors[selectedNode.data.type as string]}20`,
                  color: nodeColors[selectedNode.data.type as string],
                }}
              >
                {selectedNode.data.type as string}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Esta entidad está conectada con otras en el grafo. 
                  Haz clic en las conexiones para explorar más.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">ID</span>
                    <span className="font-mono text-xs">{selectedNode.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tipo</span>
                    <span>{selectedNode.data.type as string}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
