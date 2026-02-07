import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, X, ChevronRight } from "lucide-react";
import type { Alert } from "@/types/nexo";

interface AlertCardProps {
  alert: Alert;
  onDismiss?: (id: string) => void;
  onAction?: (alert: Alert) => void;
  className?: string;
}

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    bgColor: "bg-destructive/10",
    borderColor: "border-l-destructive",
    iconColor: "text-destructive",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-warning-light",
    borderColor: "border-l-warning",
    iconColor: "text-warning",
  },
  info: {
    icon: Info,
    bgColor: "bg-info-light",
    borderColor: "border-l-info",
    iconColor: "text-info",
  },
};

export function AlertCard({ alert, onDismiss, onAction, className }: AlertCardProps) {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "relative overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md",
      config.borderColor,
      alert.isRead && "opacity-60",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("p-2 rounded-lg shrink-0", config.bgColor)}>
            <Icon className={cn("w-5 h-5", config.iconColor)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-sm">{alert.title}</h4>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onDismiss(alert.id)}
                  className="shrink-0 -mt-1 -mr-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {alert.description}
            </p>
            {onAction && (
              <Button
                variant="ghost-primary"
                size="sm"
                onClick={() => onAction(alert)}
                className="mt-2 -ml-2 h-8"
              >
                Ver detalles
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
