defmodule Solution do
  @largest 2_147_483_647
  @smallest -2_147_483_648

  # Reversing the text cannot overflow here, so the range check is a plain
  # comparison at the end rather than a guard inside the loop -- which is only
  # safe because the value is not held in 32 bits along the way.
  def reverse(x) do
    magnitude =
      x |> abs() |> Integer.to_string() |> String.reverse() |> String.to_integer()

    result = if x < 0, do: -magnitude, else: magnitude
    if result > @largest or result < @smallest, do: 0, else: result
  end
end
