import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/nexo/Logo";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Network, 
  Upload, 
  Bell, 
  TrendingUp,
  ChefHat,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Carga Inteligente",
    description: "Sube Excel, PDF o imágenes. La IA extrae y organiza tus datos automáticamente.",
  },
  {
    icon: Network,
    title: "Grafo de Conocimiento",
    description: "Visualiza las conexiones entre platillos, ingredientes, proveedores y ventas.",
  },
  {
    icon: MessageSquare,
    title: "Chat Natural",
    description: "Pregunta en español: \"¿Por qué vendí más tacos el viernes?\" y obtén respuestas claras.",
  },
  {
    icon: TrendingUp,
    title: "Predicciones",
    description: "Anticipa la demanda de los próximos días con niveles de confianza explicados.",
  },
  {
    icon: Bell,
    title: "Alertas Proactivas",
    description: "Recibe notificaciones de stock bajo, tendencias y oportunidades de mejora.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Ejecutivo",
    description: "KPIs, gráficos y métricas clave en una vista unificada y accionable.",
  },
];

const benefits = [
  "Sin conocimientos técnicos requeridos",
  "Respuestas en lenguaje natural",
  "Datos seguros y privados",
  "Disponible 24/7",
];

export default function Landing() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative">
          {/* Navigation */}
          <nav className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Logo variant="white" size="md" />
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="container mx-auto px-6 pt-16 pb-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm text-white/90">Impulsado por Inteligencia Artificial</span>
              </div>
              
              <h1 className="text-display-lg text-white mb-6 animate-slide-up">
                Tu copiloto de negocio para{" "}
                <span className="relative">
                  <span className="text-gradient-accent">restaurantes</span>
                  <ChefHat className="absolute -top-8 -right-12 w-10 h-10 text-accent animate-float" />
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Nexo transforma tus datos en decisiones inteligentes. Sube tu información, 
                pregunta en español y obtén insights accionables para hacer crecer tu negocio.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => navigate("/login")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group"
                >
                  Iniciar Demo
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
                </Button>
                <Button 
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Ver Video
                </Button>
              </div>

              {/* Benefits list */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display-sm mb-4">
              Todo lo que necesitas para{" "}
              <span className="text-gradient-primary">tomar mejores decisiones</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nexo combina la potencia de la IA con una interfaz simple y amigable, 
              diseñada para dueños y managers de restaurantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-md text-white mb-6">
              ¿Listo para transformar tu restaurante?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Prueba Nexo ahora con datos de ejemplo y descubre cómo la IA puede 
              ayudarte a tomar decisiones más inteligentes.
            </p>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/login")}
              className="bg-white text-primary hover:bg-white/90"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Comenzar Demo Gratuita
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-sidebar-background border-t border-sidebar-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo variant="white" size="sm" />
            <p className="text-sm text-sidebar-foreground/60">
              © 2024 Nexo. Prototipo de demostración.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
