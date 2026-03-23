import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function slugify(text: string): string { return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, ""); }
export function generateSlug(name: string): string { const base = slugify(name); const random = Math.random().toString(36).substring(2, 6); return `${base}-${random}`; }
export function formatDate(date: string | Date): string { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date)); }
export function truncate(str: string, length: number): string { if (str.length <= length) return str; return str.slice(0, length) + "..."; }
export function getInitials(name: string): string { return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2); }
export function absoluteUrl(path: string): string { return `${process.env.NEXT_PUBLIC_APP_URL || "https://proofly.io"}${path}`; }
