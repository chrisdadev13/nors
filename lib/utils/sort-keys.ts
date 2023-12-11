export const sortKeys = <T extends { [key: string]: any }>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)),
  );
