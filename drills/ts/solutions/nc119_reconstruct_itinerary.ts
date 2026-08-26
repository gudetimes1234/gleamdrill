export function findItinerary(tickets: string[][]): string[] {
  const destinations = new Map<string, string[]>();
  for (const [origin, destination] of tickets) {
    if (!destinations.has(origin)) destinations.set(origin, []);
    destinations.get(origin)!.push(destination);
  }
  for (const options of destinations.values()) options.sort();

  // Hierholzer's algorithm. Take the smallest unused ticket every time and
  // never look back: an airport is only recorded once it has no tickets left,
  // so the dead end the greedy choice walks into is exactly where the route has
  // to *end* -- and being recorded first puts it at the front once the record
  // is reversed.
  const route: string[] = [];
  const stack = ["JFK"];
  while (stack.length) {
    const airport = stack[stack.length - 1];
    const options = destinations.get(airport);
    if (options && options.length) stack.push(options.shift()!);
    else route.push(stack.pop()!);
  }

  return route.reverse();
}
