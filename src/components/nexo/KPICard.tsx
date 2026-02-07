import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, DollarSign, Package, Percent, AlertTriangle } from "lucide-react";
import type { KPIData } from "@/types/nexo";

interface KPICardProps {
  data: KPIData;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  ventas: DollarSign,
  costo: Package,
  margen: Percent,
  stock: AlertTriangle,
};

export function KPICard({ data, className }: KPICardProps) {
  const iconKey = data.label.toLowerCase().includes("ventas") ? "ventas" 
    : data.label.toLowerCase().includes("costo") ? "costo"
    : data.label.toLowerCase().includes("margen") ? "margen"
    : "stock";
  
  const Icon = iconMap[iconKey];
  
  const TrendIcon = data.changeType === "positive" ? TrendingUp 
    : data.changeType === "negative" ? TrendingDown 
    : Minus;

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 shadow-card",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{data.label}</p>
            <p className="text-3xl font-bold tracking-tight">{data.value}</p>
            {data.change !== undefined && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                data.changeType === "positive" && "text-success",
                data.changeType === "negative" && "text-destructive",
                data.changeType === "neutral" && "text-muted-foreground"
              )}>
                <TrendIcon className="w-4 h-4" />
                <span>{Math.abs(data.change)}%</span>
                <span className="text-muted-foreground font-normal">vs mes anterior</span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            iconKey === "stock" ? "bg-warning-light" : "bg-primary-light"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              iconKey === "stock" ? "text-warning" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
