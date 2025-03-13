import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  isLoading?: boolean;
  className?: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, touched, isLoading, className, ...props }, ref) => {
    const id = React.useId();
    const hasValue = props.value && props.value.toString().length > 0;

    return (
      <div className="relative">
        <input
          id={id}
          ref={ref}
          className={cn(
            "peer w-full rounded-md border bg-background px-3 py-3 text-sm shadow-sm transition-all",
            "placeholder-transparent focus-visible:outline-none focus-visible:ring-1",
            hasValue ? "border-input" : "border-muted",
            error ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-primary",
            isLoading && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 -top-2.5 z-10 px-1 text-sm transition-all",
            "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground",
            "peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary",
            hasValue && "-top-2.5 text-sm",
            "bg-background",
            error ? "text-red-500" : "text-muted-foreground"
          )}
        >
          {label}
        </label>
        {isLoading && (
          <div className="absolute right-3 top-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {touched && error && (
          <p className="mt-1 text-xs text-red-500 animate-in fade-in-50">{error}</p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };