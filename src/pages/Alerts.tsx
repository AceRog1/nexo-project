import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertCard } from "@/components/nexo/AlertCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Bell } from "lucide-react";
import { alerts as initialAlerts } from "@/data/mockData";
import type { Alert } from "@/types/nexo";

export default function Alerts() {
  const [alertsData, setAlertsData] = useState<Alert[]>(initialAlerts);
  const [activeTab, setActiveTab] = useState("all");

  const handleDismiss = (id: string) => {
    setAlertsData(alertsData.map(a => 
      a.id === id ? { ...a, isRead: true } : a
    ));
  };

  const handleMarkAllRead = () => {
    setAlertsData(alertsData.map(a => ({ ...a, isRead: true })));
  };

  const filteredAlerts = alertsData.filter(alert => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !alert.isRead;
    return alert.type === activeTab;
  });

  const counts = {
    all: alertsData.length,
    unread: alertsData.filter(a => !a.isRead).length,
    critical: alertsData.filter(a => a.type === "critical").length,
    warning: alertsData.filter(a => a.type === "warning").length,
    info: alertsData.filter(a => a.type === "info").length,
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Alertas</h1>
              <p className="text-muted-foreground">
                {counts.unread} alertas sin leer
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleMarkAllRead}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Marcar todas como leídas
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: "critical", label: "Críticas", icon: AlertTriangle, color: "bg-destructive" },
            { type: "warning", label: "Advertencias", icon: AlertCircle, color: "bg-warning" },
            { type: "info", label: "Información", icon: Info, color: "bg-info" },
            { type: "unread", label: "Sin leer", icon: Bell, color: "bg-primary" },
          ].map((stat) => (
            <div 
              key={stat.type}
              className="p-4 rounded-xl bg-card border shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{counts[stat.type as keyof typeof counts]}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              Todas
              <Badge variant="secondary" className="ml-1">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-2">
              Sin leer
              <Badge variant="secondary" className="ml-1">{counts.unread}</Badge>
            </TabsTrigger>
            <TabsTrigger value="critical" className="gap-2">
              Críticas
              <Badge variant="destructive" className="ml-1">{counts.critical}</Badge>
            </TabsTrigger>
            <TabsTrigger value="warning" className="gap-2">
              Advertencias
            </TabsTrigger>
            <TabsTrigger value="info" className="gap-2">
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">¡Todo al día!</h3>
                  <p className="text-muted-foreground">No hay alertas en esta categoría.</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onDismiss={handleDismiss}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
