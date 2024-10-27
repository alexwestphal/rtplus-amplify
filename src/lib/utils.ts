import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
 
/**
 * Class management that combines tailwind-merge and clsx.
 * @param inputs Class value
 * @returns Merged classes string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}