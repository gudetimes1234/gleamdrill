defmodule Solution do
  @moduledoc """
  The list arrives as its links rather than its values: `next` holds, for each
  node, the index of the one after it, or -1 for the end. An immutable list
  cannot point back at itself, so this is how a cycle is expressed at all in a
  language without mutable references.
  """

  def has_cycle([]), do: false
  def has_cycle(next), do: chase(List.to_tuple(next), 0, 0)

  # Floyd's tortoise and hare. One walker takes single steps, the other double;
  # if there is a loop the fast one is going around it and gains one place per
  # step on the slow one, so it must eventually land on it. If there is no loop
  # the fast one runs off the end first. No memory of where either has been.
  defp chase(links, slow, fast) do
    case step(links, fast) do
      -1 ->
        false

      once ->
        case step(links, once) do
          -1 ->
            false

          twice ->
            slow = step(links, slow)
            slow == twice or chase(links, slow, twice)
        end
    end
  end

  defp step(_links, from) when from < 0, do: -1
  defp step(links, from), do: elem(links, from)
end
