import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/nexo/KPICard";
import { AlertCard } from "@/components/nexo/AlertCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  MessageSquare, 
  Network, 
  ChevronRight,
  TrendingUp,
  Calendar,
  ChefHat
} from "lucide-react";
import { kpiData, salesData, topDishes, alerts, demandPredictions } from "@/data/mockData";
import type { Alert } from "@/types/nexo";

const COLORS = ['hsl(217, 91%, 50%)', 'hsl(160, 84%, 39%)', 'hsl(38, 92%, 50%)', 'hsl(199, 89%, 48%)', 'hsl(0, 84%, 60%)'];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>(alerts.filter(a => !a.isRead));

  const handleDismissAlert = (id: string) => {
    setActiveAlerts(activeAlerts.filter(a => a.id !== id));
  };

  const pieData = topDishes.slice(0, 5).map(d => ({
    name: d.dishName,
    value: d.revenue
  }));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Resumen de tu restaurante • Actualizado hace 5 min
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/chat")}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat IA
            </Button>
            <Button variant="default" onClick={() => navigate("/graph")}>
              <Network className="w-4 h-4 mr-2" />
              Ver Grafo
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Ventas de la semana</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Últimos 7 días</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="ventas" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="costos" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Ventas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-sm text-muted-foreground">Costos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Dishes Pie */}
          <Card className="border-0 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                Top Platillos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="font-medium">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Predictions */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Predicción de Demanda
              </CardTitle>
              <span className="text-xs text-muted-foreground">Próximos 7 días</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandPredictions.slice(0, 4).map((pred, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{pred.dishName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(pred.date).toLocaleDateString('es-MX', { weekday: 'long' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{pred.predictedQuantity}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        pred.confidence === 'alto' ? 'bg-success-light text-success' :
                        pred.confidence === 'medio' ? 'bg-warning-light text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {pred.confidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost-primary" className="w-full mt-4">
                Ver todas las predicciones
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                Alertas Activas
              </CardTitle>
              <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                {activeAlerts.length} nuevas
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeAlerts.slice(0, 3).map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert}
                    onDismiss={handleDismissAlert}
                    onAction={() => navigate("/alerts")}
                  />
                ))}
                {activeAlerts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No hay alertas activas 🎉
                  </p>
                )}
              </div>
              <Button variant="ghost-primary" className="w-full mt-4" onClick={() => navigate("/alerts")}>
                Ver todas las alertas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
