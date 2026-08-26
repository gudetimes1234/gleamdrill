defmodule Solution do
  def largest_rectangle_area(heights) do
    n = length(heights)

    {stack, best} =
      heights
      |> Enum.with_index()
      |> Enum.reduce({[], 0}, fn {h, i}, {stack, best} ->
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        {stack, best, start} = close_taller(stack, h, i, best, i)
        {[{start, h} | stack], best}
      end)

    # Whatever survives was never cut off, so it runs to the far end.
    Enum.reduce(stack, best, fn {from, tall}, best -> max(best, tall * (n - from)) end)
  end

  defp close_taller([{from, tall} | rest], height, index, best, _start) when tall > height do
    close_taller(rest, height, index, max(best, tall * (index - from)), from)
  end

  defp close_taller(stack, _height, _index, best, start), do: {stack, best, start}
end
