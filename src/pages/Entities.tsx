import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/nexo/Logo";
import { 
  Check, 
  X, 
  Edit2, 
  ChevronRight,
  ChefHat,
  Carrot,
  Truck,
  Users,
  UserCheck,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { detectedEntities } from "@/data/mockData";
import type { DetectedEntity } from "@/types/nexo";

const entityIcons: Record<string, React.ElementType> = {
  dish: ChefHat,
  ingredient: Carrot,
  supplier: Truck,
  customer: Users,
  employee: UserCheck,
};

const entityLabels: Record<string, string> = {
  dish: "Platillo",
  ingredient: "Ingrediente",
  supplier: "Proveedor",
  customer: "Cliente",
  employee: "Empleado",
};

export default function Entities() {
  const navigate = useNavigate();
  const [entities, setEntities] = useState<DetectedEntity[]>(detectedEntities);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const acceptedCount = entities.filter(e => e.isAccepted).length;
  const pendingCount = entities.filter(e => !e.isAccepted).length;

  const handleAccept = (id: string) => {
    setEntities(entities.map(e => 
      e.id === id ? { ...e, isAccepted: true } : e
    ));
  };

  const handleReject = (id: string) => {
    setEntities(entities.filter(e => e.id !== id));
  };

  const handleEdit = (entity: DetectedEntity) => {
    setEditingId(entity.id);
    setEditValue(entity.name);
  };

  const handleSaveEdit = (id: string) => {
    setEntities(entities.map(e => 
      e.id === id ? { ...e, name: editValue, isEdited: true, isAccepted: true } : e
    ));
    setEditingId(null);
    setEditValue("");
  };

  const handleAcceptAll = () => {
    setEntities(entities.map(e => ({ ...e, isAccepted: true })));
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-success text-success-foreground";
    if (confidence >= 0.8) return "bg-warning text-warning-foreground";
    return "bg-destructive/20 text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-2">
              <Check className="w-3 h-3" />
              {acceptedCount} aceptados
            </Badge>
            <Badge variant="outline" className="gap-2">
              <AlertCircle className="w-3 h-3" />
              {pendingCount} pendientes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Verificación de IA</span>
            </div>
            <h1 className="text-display-sm">Revisa las entidades detectadas</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              La IA ha identificado estas entidades. Por favor verifica que sean correctas 
              antes de continuar.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {entities.length} entidades detectadas
            </p>
            <Button variant="outline" onClick={handleAcceptAll}>
              <Check className="w-4 h-4 mr-2" />
              Aceptar todas
            </Button>
          </div>

          {/* Entity Cards */}
          <div className="space-y-4">
            {entities.map((entity) => {
              const Icon = entityIcons[entity.type] || ChefHat;
              const isEditing = editingId === entity.id;

              return (
                <Card 
                  key={entity.id}
                  className={`transition-all duration-200 ${
                    entity.isAccepted 
                      ? "border-success/30 bg-success-light/30" 
                      : "hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        entity.isAccepted ? "bg-success/20" : "bg-primary-light"
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          entity.isAccepted ? "text-success" : "text-primary"
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {entityLabels[entity.type]}
                          </Badge>
                          <Badge className={`text-xs ${getConfidenceColor(entity.confidence)}`}>
                            {Math.round(entity.confidence * 100)}% confianza
                          </Badge>
                          {entity.isEdited && (
                            <Badge variant="outline" className="text-xs">
                              Editado
                            </Badge>
                          )}
                        </div>
                        
                        {isEditing ? (
                          <div className="flex items-center gap-2 mt-2">
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="h-9"
                              autoFocus
                            />
                            <Button size="sm" onClick={() => handleSaveEdit(entity.id)}>
                              Guardar
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <h3 className="font-semibold text-lg">{entity.name}</h3>
                        )}

                        {/* Meta data */}
                        {!isEditing && Object.entries(entity.data).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {Object.entries(entity.data).map(([key, value]) => (
                              <span key={key} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {!isEditing && !entity.isAccepted && (
                        <div className="flex items-center gap-2 shrink-0">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(entity)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleReject(entity.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="accent" 
                            size="sm"
                            onClick={() => handleAccept(entity.id)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Aceptar
                          </Button>
                        </div>
                      )}

                      {entity.isAccepted && (
                        <div className="flex items-center gap-2 text-success">
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-medium">Aceptado</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center pt-8">
            <Button 
              variant="hero" 
              size="xl"
              onClick={handleContinue}
            >
              Continuar al Dashboard
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Podrás editar estas entidades más adelante desde la sección "Entidades".
          </p>
        </div>
      </main>
    </div>
  );
}
