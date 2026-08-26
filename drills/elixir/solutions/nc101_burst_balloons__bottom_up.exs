defmodule Solution do
  def max_coins(nums) do
    balloons = List.to_tuple([1] ++ nums ++ [1])
    n = tuple_size(balloons)

    # The same "which balloon goes last" recurrence filled by hand, shortest
    # spans first -- because a span's answer needs both of the shorter spans
    # that a chosen last balloon splits it into. Writing the loop order out
    # makes that dependency visible where the recursion leaves it implicit.
    table =
      if n < 2 do
        %{}
      else
        for width <- 2..(n - 1)//1, left <- 0..(n - 1 - width)//1, reduce: %{} do
          table ->
            right = left + width

            best =
              Enum.reduce((left + 1)..(right - 1)//1, 0, fn last, best ->
                value = elem(balloons, left) * elem(balloons, last) * elem(balloons, right)

                max(
                  best,
                  value + Map.get(table, {left, last}, 0) + Map.get(table, {last, right}, 0)
                )
              end)

            Map.put(table, {left, right}, best)
        end
      end

    Map.get(table, {0, n - 1}, 0)
  end
end
