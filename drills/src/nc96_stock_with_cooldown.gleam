import gleam/int
import gleam/list

const impossible = -1_000_000_000

pub fn max_profit(prices: List(Int)) -> Int {
  // Three states rather than one number: holding a share, having just sold
  // (so today is the cooldown), and free to act. Each day's states depend only
  // on yesterday's, so the whole thing is three rolling values \u{2014} and the
  // cooldown is expressed simply by "free" never reading "sold" from the same
  // day.
  let #(_, sold, rest) =
    list.fold(prices, #(impossible, impossible, 0), fn(state, price) {
      let #(hold, sold, rest) = state
      #(int.max(hold, rest - price), hold + price, int.max(rest, sold))
    })

  int.max(int.max(sold, rest), 0)
}
