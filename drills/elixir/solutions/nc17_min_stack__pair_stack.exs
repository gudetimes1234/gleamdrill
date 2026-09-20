defmodule Solution do
  # Immutable, so the "stack" is a value that each operation returns a new
  # version of. Each entry carries the minimum of everything at or below it.
  def new, do: []

  def push(stack, value) do
    smallest =
      case stack do
        [{_value, current} | _] -> min(value, current)
        [] -> value
      end

    [{value, smallest} | stack]
  end

  def pop([_top | rest]), do: rest
  def pop([]), do: []

  def top([{value, _min} | _]), do: value
  def top([]), do: nil

  def get_min([{_value, minimum} | _]), do: minimum
  def get_min([]), do: nil
end
