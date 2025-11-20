// src/lib/utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// Note: Ensure you have installed 'clsx' and 'tailwind-merge' (we did this in Checkpoint 1)