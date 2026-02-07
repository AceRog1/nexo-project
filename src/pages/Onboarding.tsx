import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/nexo/Logo";
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Upload, 
  FileSpreadsheet, 
  FileText, 
  Image, 
  Cloud,
  Database,
  Network,
  TrendingUp,
  CheckCircle2,
  Clock
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Bienvenido a Nexo",
    description: "Tu copiloto inteligente para restaurantes",
  },
  {
    id: 2,
    title: "Conecta tus datos",
    description: "Sube archivos o conecta tus sistemas",
  },
  {
    id: 3,
    title: "¡Listo para comenzar!",
    description: "Procesaremos tus datos con IA",
  },
];

const dataFormats = [
  { icon: FileSpreadsheet, label: "Excel / CSV", description: "Ventas, inventario, recetas" },
  { icon: FileText, label: "PDF", description: "Facturas, menús, reportes" },
  { icon: Image, label: "Imágenes", description: "Tickets, notas, fotos" },
  { icon: Cloud, label: "Google Drive", description: "Sincronización automática" },
];

const aiCapabilities = [
  { icon: Database, label: "Extrae y organiza tus datos automáticamente" },
  { icon: Network, label: "Crea conexiones entre platillos, ingredientes y proveedores" },
  { icon: TrendingUp, label: "Genera predicciones y alertas inteligentes" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate("/processing");
  };

  const handleFileUpload = () => {
    // Simular subida de archivo
    const newFile = `ventas_${Date.now()}.xlsx`;
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handleUseDemoData = () => {
    setUploadedFiles(["ventas_demo.xlsx", "inventario_demo.csv", "recetas_demo.pdf"]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Paso {currentStep} de {steps.length}
            </div>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Configuración inicial</span>
              </div>
              
              <h1 className="text-display-md">
                ¡Bienvenido a <span className="text-gradient-primary">Nexo</span>!
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                Nexo es tu copiloto de negocio potenciado por IA. Te ayudaremos a entender 
                mejor tu restaurante y tomar decisiones más inteligentes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {aiCapabilities.map((cap, index) => (
                  <Card key={index} className="border-2 border-dashed hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                        <cap.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm">{cap.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <Button variant="hero" size="xl" onClick={handleNext}>
                  Comenzar
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Upload */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-display-sm mb-4">Conecta tus datos</h1>
                <p className="text-lg text-muted-foreground">
                  Sube tus archivos de ventas, inventario o recetas. Nexo los analizará automáticamente.
                </p>
              </div>

              {/* Upload Area */}
              <Card className="border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={handleFileUpload}>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Arrastra y suelta tus archivos aquí
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    o haz clic para seleccionar
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    {dataFormats.map((format, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                        <format.icon className="w-3.5 h-3.5" />
                        <span>{format.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Archivos listos:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-success-light rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium">{file}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Demo Data Button */}
              <div className="text-center">
                <Button variant="outline" onClick={handleUseDemoData}>
                  <Database className="w-4 h-4 mr-2" />
                  Usar datos de demostración
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-8">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </Button>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleNext}
                  disabled={uploadedFiles.length === 0}
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Ready to Process */}
          {currentStep === 3 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center mx-auto animate-pulse-slow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-display-sm">¡Todo listo!</h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Hemos recibido {uploadedFiles.length} archivo(s). Nuestra IA está lista para 
                analizar tu información y crear tu grafo de conocimiento.
              </p>

              {/* Preview of what will happen */}
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">¿Qué hará Nexo?</h3>
                  <div className="space-y-3 text-left">
                    {[
                      "Leer y clasificar tus archivos",
                      "Detectar platillos, ingredientes y proveedores",
                      "Crear relaciones entre entidades",
                      "Generar predicciones iniciales",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Clock className="w-4 h-4" />
                    <span>Tiempo estimado: 30 segundos</span>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between pt-8">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </Button>
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Procesar con IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
