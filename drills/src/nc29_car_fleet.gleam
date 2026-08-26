import gleam/int
import gleam/list

pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  list.zip(position, speed)
  |> list.sort(fn(a, b) { int.compare(b.0, a.0) })
  |> list.fold(#(0, 0, 1), fn(state, car) {
    let #(fleets, lead_distance, lead_speed) = state
    let distance = target - car.0
    // distance/speed > lead_distance/lead_speed, cross-multiplied so the
    // arrival times never have to become fractions.
    case distance * lead_speed > lead_distance * car.1 {
      True -> #(fleets + 1, distance, car.1)
      False -> #(fleets, lead_distance, lead_speed)
    }
  })
  |> fn(state) { state.0 }
}
