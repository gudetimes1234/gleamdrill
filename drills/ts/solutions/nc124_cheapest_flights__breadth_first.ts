export function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  const outgoing = new Map<number, [number, number][]>();
  for (const [origin, destination, price] of flights) {
    if (!outgoing.has(origin)) outgoing.set(origin, []);
    outgoing.get(origin)!.push([destination, price]);
  }

  // Breadth-first by number of flights taken, which makes the stop limit the
  // depth limit -- the same bound Bellman-Ford gets from its round count. The
  // cheapest-so-far table is what stops it exploding: a city is only expanded
  // again if this route reached it for less than any earlier one did.
  const best = new Map<number, number>([[src, 0]]);
  let frontier: [number, number][] = [[src, 0]];

  for (let round = 0; round <= k && frontier.length; round++) {
    const following: [number, number][] = [];
    for (const [city, spent] of frontier) {
      for (const [destination, price] of outgoing.get(city) ?? []) {
        const total = spent + price;
        if (!best.has(destination) || total < best.get(destination)!) {
          best.set(destination, total);
          following.push([destination, total]);
        }
      }
    }
    frontier = following;
  }

  return best.get(dst) ?? -1;
}
