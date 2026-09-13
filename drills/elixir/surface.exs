# Derives each drill's signature and starter from its primary solution, the
# way generate.gleam does for Python and TypeScript with line-based parsing.
# Elixir heads are patterns (`def add(trie, [first | rest])`), often across
# several clauses, so this walks the real AST instead: one line per public
# function, first clause's head, pattern arguments renamed, and a starter
# module whose bodies `raise "todo"`. Anything else at module level
# (attributes, aliases, nested modules) is kept, since it is scaffolding the
# solver needs rather than the answer.
#
#     elixir surface.exs        # writes surface.json, read by `gleam run -m generate`

defmodule Surface do
  def main do
    root = Path.dirname(__ENV__.file)

    surfaces =
      Path.wildcard(Path.join([root, "solutions", "*.exs"]))
      |> Enum.map(&Path.basename(&1, ".exs"))
      |> Enum.reject(&String.contains?(&1, "__"))
      |> Enum.sort()
      |> Map.new(fn stem ->
        source = File.read!(Path.join([root, "solutions", stem <> ".exs"]))
        {stem, surface(source, stem)}
      end)

    File.write!(Path.join(root, "surface.json"), JSON.encode!(surfaces) <> "\n")
    IO.puts("surface.json: #{map_size(surfaces)} Elixir drills")
  end

  defp surface(source, stem) do
    {:defmodule, _, [{:__aliases__, _, [:Solution]}, [do: body]]} =
      Code.string_to_quoted!(source, file: stem <> ".exs")

    forms =
      case body do
        {:__block__, _, forms} -> forms
        single -> [single]
      end

    {heads, scaffolding} =
      Enum.reduce(forms, {[], []}, fn form, {heads, scaffolding} ->
        case form do
          {:def, _, [head | _]} ->
            {name, args} = head_parts(head)
            key = {name, length(args)}

            # Every clause's head is kept: a position that is a pattern in
            # the first clause (`def f([])`) is usually a plain variable in
            # a later one (`def f(list)`), and that is the name to show.
            case List.keyfind(heads, key, 0) do
              nil -> {heads ++ [{key, [args]}], scaffolding}
              {_, clauses} -> {List.keyreplace(heads, key, 0, {key, clauses ++ [args]}), scaffolding}
            end

          {:defp, _, _} ->
            {heads, scaffolding}

          other ->
            {heads, scaffolding ++ [Macro.to_string(other)]}
        end
      end)

    signature =
      heads
      |> Enum.map(fn {{name, _}, clauses} -> "def " <> render(name, clauses) end)
      |> Enum.join("\n")

    bodies =
      Enum.map(heads, fn {{name, _}, clauses} ->
        "  def " <> render(name, clauses) <> " do\n    raise \"todo\"\n  end"
      end)

    starter =
      ["defmodule Solution do"] ++
        Enum.map(scaffolding, &indent/1) ++
        [Enum.join(bodies, "\n\n"), "end"]

    %{"signature" => signature, "starter" => Enum.join(starter, "\n") <> "\n"}
  end

  defp head_parts({:when, _, [head, _guard]}), do: head_parts(head)
  defp head_parts({name, _, nil}), do: {name, []}
  defp head_parts({name, _, args}) when is_list(args), do: {name, args}

  defp render(name, [[] | _]), do: Atom.to_string(name)

  defp render(name, clauses) do
    arity = length(hd(clauses))

    names =
      Enum.map(1..arity, fn position ->
        clauses
        |> Enum.map(&Enum.at(&1, position - 1))
        |> Enum.find_value("arg#{position}", &variable_name/1)
      end)

    "#{name}(#{Enum.join(names, ", ")})"
  end

  # The name a pattern binds, if it binds one: `list`, `_list` (shown as
  # `list`), `pattern = name`, `name = pattern`, or `name \\ default`.
  defp variable_name({var, _, context}) when is_atom(var) and is_atom(context) and var != :_,
    do: var |> Atom.to_string() |> String.trim_leading("_") |> blank_to_nil()

  defp variable_name({:=, _, [left, right]}),
    do: variable_name(right) || variable_name(left)

  defp variable_name({:\\, _, [pattern, _default]}), do: variable_name(pattern)
  defp variable_name(_pattern), do: nil

  defp blank_to_nil(""), do: nil
  defp blank_to_nil(name), do: name

  defp indent(text) do
    text
    |> String.split("\n")
    |> Enum.map(&("  " <> &1))
    |> Enum.join("\n")
  end
end

Surface.main()
