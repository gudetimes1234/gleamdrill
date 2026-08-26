export function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position.map((pos, i) => [pos, speed[i]] as [number, number]);
  cars.sort((a, b) => b[0] - a[0]);

  let fleets = 0;
  let leadDistance = 0;
  let leadSpeed = 1;

  for (const [pos, spd] of cars) {
    const distance = target - pos;
    // distance/spd > leadDistance/leadSpeed, cross-multiplied so the arrival
    // times never have to become fractions.
    if (distance * leadSpeed > leadDistance * spd) {
      fleets++;
      leadDistance = distance;
      leadSpeed = spd;
    }
  }

  return fleets;
}
