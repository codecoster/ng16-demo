export const truthy = <T>(val: T | undefined): val is T => !!val;

export function convertToMap<T extends { id: string }>(array: T[]): { [id: string]: T } {
  return array.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {} as { [id: string]: T });
}

