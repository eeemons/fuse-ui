import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ariaLabel?: string;
  tooltip?: boolean | string;
  isActive?: boolean;
}

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  leftIcon,
  rightIcon,
  ariaLabel,
  tooltip,
  isActive = false,
}: ButtonProps) => {
  const baseStyles =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const getTooltipText = () => {
    if (typeof tooltip === "string") return tooltip;
    if (tooltip === true && typeof children === "string") return children;
    return "";
  };

  const commonProps = {
    className: `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? "w-full" : ""}
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
      ${isActive ? "ring-2" : ""}
      ${className}
    `,
    onClick,
    disabled: disabled || loading,
    "aria-label": ariaLabel,
    title: getTooltipText(),
    type,
  };

  return (
    <button {...commonProps}>
      <span className="flex items-center justify-center gap-2">
        {leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </span>
    </button>
  );
};
