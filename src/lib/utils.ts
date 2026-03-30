export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function uniqueStrings(values: string[]): string[] {
  return [...new Set(values)];
}