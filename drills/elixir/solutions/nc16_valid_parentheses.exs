defmodule Solution do
  @closers %{"(" => ")", "[" => "]", "{" => "}"}

  def valid?(s) do
    s |> String.graphemes() |> check([])
  end

  defp check([], stack), do: stack == []

  defp check([g | rest], stack) do
    case {Map.fetch(@closers, g), stack} do
      {{:ok, closer}, _} -> check(rest, [closer | stack])
      {:error, [^g | tail]} -> check(rest, tail)
      _ -> false
    end
  end
end
