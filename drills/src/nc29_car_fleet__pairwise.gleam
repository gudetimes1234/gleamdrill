import gleam/list

pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  let cars = list.zip(position, speed)
  list.count(cars, fn(car) { leads(car, cars, target) })
}

/// A car leads a fleet exactly when it arrives strictly later than every car
/// ahead of it; anything else means it catches one of them and merges. No
/// sorting, no running state \u{2014} O(n\u{b2}), and the definition rather than a
/// consequence of it.
fn leads(car: #(Int, Int), cars: List(#(Int, Int)), target: Int) -> Bool {
  cars
  |> list.filter(fn(other) { other.0 > car.0 })
  |> list.all(fn(other) {
    { target - car.0 } * other.1 > { target - other.0 } * car.1
  })
}
