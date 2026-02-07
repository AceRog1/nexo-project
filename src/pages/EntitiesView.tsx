import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ChefHat, 
  Carrot, 
  Truck, 
  Users, 
  UserCheck,
  Edit2,
  Trash2,
  Plus,
  ExternalLink
} from "lucide-react";
import { dishes, ingredients, suppliers, customers, employees } from "@/data/mockData";

const entityConfig = {
  dishes: {
    icon: ChefHat,
    label: "Platillos",
    color: "hsl(217, 91%, 50%)",
    data: dishes,
    columns: ["name", "price", "category"],
  },
  ingredients: {
    icon: Carrot,
    label: "Ingredientes",
    color: "hsl(160, 84%, 39%)",
    data: ingredients,
    columns: ["name", "currentStock", "unit", "unitCost"],
  },
  suppliers: {
    icon: Truck,
    label: "Proveedores",
    color: "hsl(38, 92%, 50%)",
    data: suppliers,
    columns: ["name", "contact", "rating"],
  },
  customers: {
    icon: Users,
    label: "Clientes",
    color: "hsl(199, 89%, 48%)",
    data: customers,
    columns: ["name", "loyaltyScore", "totalSpent"],
  },
  employees: {
    icon: UserCheck,
    label: "Empleados",
    color: "hsl(280, 65%, 60%)",
    data: employees,
    columns: ["name", "role", "startDate"],
  },
};

export default function EntitiesView() {
  const [activeTab, setActiveTab] = useState("dishes");
  const [searchQuery, setSearchQuery] = useState("");

  const config = entityConfig[activeTab as keyof typeof entityConfig];
  const Icon = config.icon;

  const filteredData = config.data.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Entidades</h1>
            <p className="text-muted-foreground">
              Gestiona y explora todas las entidades de tu restaurante
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex-wrap h-auto gap-1">
            {Object.entries(entityConfig).map(([key, cfg]) => {
              const TabIcon = cfg.icon;
              return (
                <TabsTrigger key={key} value={key} className="gap-2">
                  <TabIcon className="w-4 h-4" />
                  {cfg.label}
                  <Badge variant="secondary" className="ml-1">
                    {cfg.data.length}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div>
                    <CardTitle>{config.label}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {filteredData.length} de {config.data.length} elementos
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          ID
                        </th>
                        {config.columns.map((col) => (
                          <th key={col} className="text-left py-3 px-4 text-sm font-medium text-muted-foreground capitalize">
                            {col.replace(/([A-Z])/g, ' $1').trim()}
                          </th>
                        ))}
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => {
                        const record = item as unknown as Record<string, unknown>;
                        return (
                        <tr key={record.id as string} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                              {record.id as string}
                            </code>
                          </td>
                          {config.columns.map((col) => (
                            <td key={col} className="py-3 px-4">
                              {col === "price" || col === "unitCost" || col === "totalSpent" ? (
                                <span className="font-medium">${Number(record[col]).toLocaleString()}</span>
                              ) : col === "rating" || col === "loyaltyScore" ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary rounded-full"
                                      style={{ width: `${(Number(record[col]) / (col === "rating" ? 5 : 100)) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-sm">{record[col] as number}</span>
                                </div>
                              ) : col === "currentStock" ? (
                                <Badge variant="secondary">
                                  {record[col] as number} {record.unit as string}
                                </Badge>
                              ) : (
                                <span>{String(record[col])}</span>
                              )}
                            </td>
                          ))}
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon-sm">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon-sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredData.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Sin resultados</h3>
                    <p className="text-muted-foreground">
                      No se encontraron {config.label.toLowerCase()} con "{searchQuery}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
