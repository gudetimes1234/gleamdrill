# Runs one Elixir attempt against its harness and reports the outcome as a
# single JSON line, the last thing printed. Invoked by the API (see
# server/src/server/exec.gleam) as
#
#     elixir run.exs <dir>
#
# where <dir> holds solution.exs and harness.exs. The solution defines
# `Solution`; the harness is a script whose value is a list of
# `{label, expected, actual}` triples with both values already `inspect`ed --
# exactly what drills/elixir/verify_all.exs evaluates, so a harness that is
# green there is green here.
#
# Everything the attempt prints is captured through the group leader and
# returned as `stdout`, capped. Anything the compiler writes to stderr (a
# warning about an unused variable, say) is not captured here; the API reads
# it off the port and appends it to stdout itself.
#
# This process is disposable: the API runs it under `timeout -s KILL`, as an
# unprivileged user, with resource limits. Nothing here needs to survive a
# hostile solution -- it only needs to report honestly when it can.

defmodule Runner do
  @stdout_cap 4000
  @message_cap 2000

  def main([dir]) do
    solution = File.read!(Path.join(dir, "solution.exs"))
    harness = File.read!(Path.join(dir, "harness.exs"))

    original = Process.group_leader()
    {:ok, capture} = StringIO.open("")
    Process.group_leader(self(), capture)

    outcome = run(solution, harness)

    Process.group_leader(self(), original)
    {:ok, {_, printed}} = StringIO.close(capture)

    report =
      case outcome do
        {:ok, cases} -> %{"cases" => cases, "stdout" => cap(printed, @stdout_cap), "error" => nil}
        {:error, error} -> %{"cases" => [], "stdout" => cap(printed, @stdout_cap), "error" => error}
      end

    IO.puts(original, JSON.encode!(report))
  end

  defp run(solution, harness) do
    with :ok <- compile(solution),
         {:ok, cases} <- evaluate(harness) do
      {:ok, cases}
    end
  end

  defp compile(solution) do
    try do
      Code.compile_string(solution, "solution.exs")
      :ok
    rescue
      error -> {:error, failure("compile", error, __STACKTRACE__)}
    catch
      kind, value -> {:error, thrown("compile", kind, value)}
    end
  end

  defp evaluate(harness) do
    try do
      {cases, _bindings} = Code.eval_string(harness, [], file: "harness.exs")
      {:ok, Enum.map(cases, &case_result/1)}
    rescue
      error -> {:error, failure("run", error, __STACKTRACE__)}
    catch
      kind, value -> {:error, thrown("run", kind, value)}
    end
  end

  defp case_result({label, expected, actual}) do
    %{
      "label" => to_string(label),
      "expected" => to_string(expected),
      "actual" => to_string(actual),
      "passed" => expected == actual
    }
  end

  defp case_result(other) do
    raise ArgumentError,
          "the harness produced #{inspect(other)}, not a {label, expected, actual} triple"
  end

  # A compile-time error knows its line; a runtime one is located by its
  # stacktrace, whose first frame inside the attempt names the line the
  # user is looking for.
  defp failure(phase, error, stacktrace) do
    line =
      case error do
        %{line: line} when is_integer(line) -> line
        _ -> line_in_attempt(stacktrace)
      end

    %{"phase" => phase, "line" => line, "message" => cap(Exception.message(error), @message_cap)}
  end

  defp thrown(phase, kind, value) do
    %{"phase" => phase, "line" => nil, "message" => cap("#{kind}: #{inspect(value)}", @message_cap)}
  end

  defp line_in_attempt(stacktrace) do
    Enum.find_value(stacktrace, fn
      {_module, _function, _arity, location} ->
        case {Keyword.get(location, :file), Keyword.get(location, :line)} do
          {file, line} when is_integer(line) and file in [~c"solution.exs", ~c"harness.exs"] -> line
          _ -> nil
        end

      _ ->
        nil
    end)
  end

  defp cap(text, limit) do
    if String.length(text) > limit do
      String.slice(text, 0, limit) <> "\n… (truncated)"
    else
      text
    end
  end
end

Runner.main(System.argv())
