import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white" | "dark";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const variants = {
    default: "text-gradient-primary",
    white: "text-white",
    dark: "text-foreground",
  };

  return (
    <div className={cn("flex items-center gap-2 font-display font-bold", sizes[size], className)}>
      <div className="relative">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          size === "lg" && "w-12 h-12 rounded-xl",
          size === "sm" && "w-6 h-6 rounded-md",
          variant === "white" ? "bg-white/20" : "bg-gradient-primary"
        )}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={cn(
              "w-5 h-5",
              size === "lg" && "w-7 h-7",
              size === "sm" && "w-4 h-4",
              variant === "white" ? "text-white" : "text-white"
            )}
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <span className={variants[variant]}>Nexo</span>
    </div>
  );
}
