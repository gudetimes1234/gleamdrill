defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    values = List.to_tuple(nums)

    {_window, out} =
      nums
      |> Enum.with_index()
      |> Enum.reduce({:queue.new(), []}, fn {num, i}, {window, out} ->
        window =
          window
          |> drop_smaller(num, values)
          |> then(&:queue.in(i, &1))
          |> drop_expired(i - k)

        {window, if(i >= k - 1, do: [elem(values, front(window)) | out], else: out)}
      end)

    Enum.reverse(out)
  end

  # Erlang's :queue rather than a list: this needs both ends, and a list only
  # gives one of them cheaply.
  defp drop_smaller(window, num, values) do
    case :queue.out_r(window) do
      {{:value, index}, rest} ->
        if elem(values, index) <= num, do: drop_smaller(rest, num, values), else: window

      {:empty, _} ->
        window
    end
  end

  defp drop_expired(window, limit) do
    case :queue.peek(window) do
      {:value, index} when index <= limit -> :queue.drop(window)
      _ -> window
    end
  end

  defp front(window) do
    {:value, index} = :queue.peek(window)
    index
  end
end
