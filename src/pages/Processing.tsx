import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/nexo/Logo";
import { 
  FileSearch, 
  Database, 
  Network, 
  TrendingUp, 
  CheckCircle2,
  Loader2,
  Sparkles
} from "lucide-react";

const processingSteps = [
  {
    id: 1,
    icon: FileSearch,
    title: "Leyendo archivos",
    description: "Analizando estructura y formato de los documentos...",
    details: ["ventas_demo.xlsx - 1,847 filas detectadas", "inventario_demo.csv - 89 productos", "recetas_demo.pdf - 35 páginas"],
  },
  {
    id: 2,
    icon: Database,
    title: "Extrayendo entidades",
    description: "Identificando platillos, ingredientes y proveedores...",
    details: ["15 platillos identificados", "12 ingredientes principales", "5 proveedores detectados"],
  },
  {
    id: 3,
    icon: Network,
    title: "Generando relaciones",
    description: "Conectando entidades en el grafo de conocimiento...",
    details: ["45 recetas mapeadas", "67 conexiones proveedor-ingrediente", "1,847 transacciones vinculadas"],
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Calculando predicciones",
    description: "Ejecutando modelos de demanda y alertas...",
    details: ["Predicción 7 días generada", "3 alertas críticas detectadas", "Top 5 platillos calculado"],
  },
];

export default function Processing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentDetail, setCurrentDetail] = useState(0);

  useEffect(() => {
    if (currentStep >= processingSteps.length) {
      // Procesamiento completo, redirigir
      const timeout = setTimeout(() => {
        navigate("/entities");
      }, 1500);
      return () => clearTimeout(timeout);
    }

    // Simular progreso del paso actual
    const progressInterval = setInterval(() => {
      setStepProgress(prev => {
        if (prev >= 100) {
          setCompletedSteps(cs => [...cs, currentStep]);
          setCurrentStep(s => s + 1);
          setCurrentDetail(0);
          return 0;
        }
        return prev + 4;
      });
    }, 100);

    // Rotar detalles
    const detailInterval = setInterval(() => {
      if (currentStep < processingSteps.length) {
        setCurrentDetail(d => (d + 1) % processingSteps[currentStep].details.length);
      }
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(detailInterval);
    };
  }, [currentStep, navigate]);

  const overallProgress = ((currentStep / processingSteps.length) * 100) + (stepProgress / processingSteps.length);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <Logo variant="white" size="md" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Title */}
          <div className="text-center text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm">IA procesando tus datos</span>
            </div>
            <h1 className="text-display-sm">Analizando tu información</h1>
            <p className="text-lg text-white/70">
              Esto tomará solo unos segundos...
            </p>
          </div>

          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/60">
              <span>Progreso general</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 bg-white/10" />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {processingSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              const isPending = currentStep < index;

              return (
                <Card 
                  key={step.id}
                  className={`transition-all duration-300 border-0 ${
                    isCompleted ? "bg-success/20 border-success/30" :
                    isCurrent ? "bg-white/10 border-primary/30 ring-2 ring-primary/50" :
                    "bg-white/5 border-white/10 opacity-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCompleted ? "bg-success" :
                        isCurrent ? "bg-primary" :
                        "bg-white/10"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : isCurrent ? (
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : (
                          <step.icon className="w-5 h-5 text-white/50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${
                          isPending ? "text-white/50" : "text-white"
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          isPending ? "text-white/30" : "text-white/60"
                        }`}>
                          {step.description}
                        </p>
                        
                        {isCurrent && (
                          <div className="mt-3 space-y-2 animate-fade-in">
                            <Progress value={stepProgress} className="h-1.5 bg-white/10" />
                            <p className="text-xs text-accent font-mono">
                              → {step.details[currentDetail]}
                            </p>
                          </div>
                        )}

                        {isCompleted && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {step.details.map((detail, i) => (
                              <span key={i} className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                                ✓ {detail}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Completion Message */}
          {currentStep >= processingSteps.length && (
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success text-white font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                ¡Procesamiento completado!
              </div>
              <p className="text-white/60 mt-4">Redirigiendo a la verificación de entidades...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
