export function findItinerary(tickets: string[][]): string[] {
  const destinations = new Map<string, string[]>();
  for (const [origin, destination] of tickets) {
    if (!destinations.has(origin)) destinations.set(origin, []);
    destinations.get(origin)!.push(destination);
  }
  for (const options of destinations.values()) options.sort();

  // Every ticket used, smallest option first, undoing a choice that leads
  // nowhere. Because the options are sorted, the first complete itinerary found
  // is the smallest one -- no comparing of candidates. Exponential in the worst
  // case, which is what Hierholzer's one-pass walk removes.
  const extend = (airport: string, route: string[], remaining: number): string[] | null => {
    if (remaining === 0) return route;
    const options = destinations.get(airport) ?? [];
    for (let i = 0; i < options.length; i++) {
      const [next] = options.splice(i, 1);
      const found = extend(next, [...route, next], remaining - 1);
      options.splice(i, 0, next);
      if (found) return found;
    }
    return null;
  };

  return extend("JFK", ["JFK"], tickets.length) ?? [];
}
