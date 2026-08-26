export function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position.map((pos, i) => [pos, speed[i]] as [number, number]);
  return cars.filter((car) => leads(car, cars, target)).length;
}

// A car leads a fleet exactly when it arrives strictly later than every car
// ahead of it; anything else means it catches one of them and merges. No
// sorting, no running state -- O(n^2), and the definition rather than a
// consequence of it.
function leads(car: [number, number], cars: [number, number][], target: number): boolean {
  const [pos, spd] = car;
  return cars
    .filter(([otherPos]) => otherPos > pos)
    .every(([otherPos, otherSpeed]) => (target - pos) * otherSpeed > (target - otherPos) * spd);
}
