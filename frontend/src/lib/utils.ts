import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const value = format(date, "PPP");

  return value;
}

export function formatDateWithTime(date: Date): string {
  const value = format(date, "PPpp");

  return value;
}
