import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Función para recortar cualquier formato de hora a "HH:mm" (ej. "07:00:00" -> "07:00")
export const formatHora = (hora: string) => {
    if (!hora) return '';
    return hora.substring(0, 5);
};