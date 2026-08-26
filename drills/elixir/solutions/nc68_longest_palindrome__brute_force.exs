defmodule Solution do
  # Every start with every length. O(n^3) once the palindrome check is counted
  # -- the definition, and what centre expansion is an optimisation of.
  def longest_palindrome(""), do: ""

  def longest_palindrome(s) do
    n = String.length(s)

    for start <- 0..(n - 1)//1, length <- 1..(n - start)//1, reduce: "" do
      best ->
        candidate = String.slice(s, start, length)

        if String.length(candidate) > String.length(best) and
             candidate == String.reverse(candidate),
           do: candidate,
           else: best
    end
  end
end
