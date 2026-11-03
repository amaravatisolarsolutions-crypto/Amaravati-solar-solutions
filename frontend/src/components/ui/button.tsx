import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[30px] text-sm font-medium cursor-pointer transition-all duration-200 active:scale-95 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#B83A16] text-[#FFFFFF] shadow-sm hover:bg-[#A33112] hover:shadow-md",
        cta: "bg-[#B83A16] text-[#FFFFFF] font-semibold shadow-cta hover:bg-[#A33112] hover:-translate-y-0.5 active:translate-y-0",
        navy: "bg-[#B83A16] text-[#FFFFFF] font-semibold shadow-sm hover:bg-[#A33112]",
        heroOutline:
          "border border-white/60 bg-white/10 text-white font-semibold backdrop-blur hover:bg-[#A33112] hover:border-[#A33112] hover:text-white",
        destructive: "bg-destructive text-destructive-foreground rounded-[30px] shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[#B83A16] bg-white font-semibold text-[#B83A16] shadow-sm hover:bg-[#A33112] hover:text-[#FFFFFF] hover:border-[#A33112]",
        secondary: "bg-[#B83A16] text-[#FFFFFF] shadow-sm hover:bg-[#A33112]",
        ghost: "hover:bg-[#B83A16]/10 hover:text-[#B83A16] rounded-[30px]",
        link: "text-[#B83A16] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-[30px]",
        sm: "h-8 rounded-[30px] px-3.5 text-xs",
        lg: "h-12 rounded-[30px] px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
