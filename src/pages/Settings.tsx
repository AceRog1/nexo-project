import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Settings2, 
  Database, 
  Sparkles, 
  Bell, 
  RefreshCw,
  Download,
  Upload,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [datasetSize, setDatasetSize] = useState([50]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [predictionRisk, setPredictionRisk] = useState<string>("moderate");

  const handleRegenerate = () => {
    toast.success("Datos regenerados", {
      description: "Se han generado nuevos datos sintéticos para el demo."
    });
  };

  const handleExport = () => {
    toast.success("Exportación iniciada", {
      description: "Tus datos se descargarán en formato JSON."
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Settings2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Configuración</h1>
            <p className="text-muted-foreground">
              Ajustes de simulación y preferencias del demo
            </p>
          </div>
        </div>

        {/* Simulation Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>Datos de Simulación</CardTitle>
            </div>
            <CardDescription>
              Controla el tamaño y complejidad del dataset de demostración
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Tamaño del dataset</Label>
                <Badge variant="secondary">{datasetSize[0]}%</Badge>
              </div>
              <Slider
                value={datasetSize}
                onValueChange={setDatasetSize}
                max={100}
                min={10}
                step={10}
              />
              <p className="text-sm text-muted-foreground">
                Actualmente: ~{Math.round(1500 * datasetSize[0] / 100)} ventas, 
                ~{Math.round(40 * datasetSize[0] / 100)} platillos
              </p>
            </div>

            <div className="flex items-center justify-between py-4 border-t">
              <div>
                <Label>Regenerar datos</Label>
                <p className="text-sm text-muted-foreground">
                  Crea un nuevo set de datos sintéticos aleatorios
                </p>
              </div>
              <Button variant="outline" onClick={handleRegenerate}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <CardTitle>Motor de IA</CardTitle>
            </div>
            <CardDescription>
              Configura el comportamiento de las predicciones simuladas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Nivel de riesgo en predicciones</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "conservative", label: "Conservador", desc: "Predicciones cautelosas" },
                  { value: "moderate", label: "Moderado", desc: "Balance equilibrado" },
                  { value: "aggressive", label: "Agresivo", desc: "Predicciones optimistas" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPredictionRisk(option.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      predictionRisk === option.value
                        ? "border-primary bg-primary-light"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-warning" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
            <CardDescription>
              Controla las alertas y notificaciones del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Alertas proactivas</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe notificaciones de stock bajo, predicciones y sugerencias
                </p>
              </div>
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Datos</CardTitle>
            <CardDescription>
              Exporta o elimina los datos de la demostración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar datos
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Importar datos
              </Button>
              <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Reiniciar demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>Nexo Demo v1.0 • Prototipo de demostración</p>
          <p>Todos los datos son simulados y se reinician al cerrar sesión.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
