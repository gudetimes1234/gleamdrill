import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let player = solution.new_player("lucy") |> solution.add_points(10)
  let levelled = solution.level_up(player)

  [
    #(
      "new_player(\"lucy\") fields",
      string.inspect(#("lucy", 0, 1)),
      string.inspect({
        let fresh = solution.new_player("lucy")
        #(fresh.name, fresh.score, fresh.level)
      }),
    ),
    #(
      "add_points(player, 10) score",
      string.inspect(10),
      string.inspect(player.score),
    ),
    #(
      "level_up(player) level and score",
      string.inspect(#(2, 0)),
      string.inspect(#(levelled.level, levelled.score)),
    ),
    #("level_up keeps the name", string.inspect("lucy"), string.inspect(levelled.name)),
  ]
}
