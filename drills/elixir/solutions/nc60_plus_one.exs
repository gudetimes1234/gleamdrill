defmodule Solution do
  # Adding one is a carry that starts at 1 and dies as soon as a digit below
  # nine absorbs it. The only interesting case is when it never does, and the
  # number grows a digit.
  def plus_one(digits) do
    {carry, out} =
      digits
      |> Enum.reverse()
      |> Enum.reduce({1, []}, fn digit, {carry, acc} ->
        total = digit + carry
        {div(total, 10), [rem(total, 10) | acc]}
      end)

    if carry == 0, do: out, else: [carry | out]
  end
end
