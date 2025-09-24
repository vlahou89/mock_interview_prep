import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//it lets us conditionally combine classes.
// it handles things like skipping false, null, undefined, and joining everything into a single string.

//example
//className={cn("text-destructive text-sm", className)}
