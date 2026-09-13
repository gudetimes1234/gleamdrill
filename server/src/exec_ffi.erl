-module(exec_ffi).
-export([run/3, find_executable/1]).

%% Runs an executable with arguments and returns {ExitCode, Output} once it
%% exits, stdout and stderr interleaved. `TimeoutMs` is a backstop only: the
%% caller wraps the command in `timeout -s KILL`, which is what actually ends
%% a run; if even that fails to report, the port is closed and -1 returned.
%% See server/exec.gleam.

run(Executable, Args, TimeoutMs) ->
    Port = erlang:open_port(
        {spawn_executable, Executable},
        [{args, Args}, binary, exit_status, stderr_to_stdout, use_stdio, hide]
    ),
    collect(Port, [], TimeoutMs).

collect(Port, Acc, TimeoutMs) ->
    receive
        {Port, {data, Chunk}} ->
            collect(Port, [Chunk | Acc], TimeoutMs);
        {Port, {exit_status, Code}} ->
            {Code, iolist_to_binary(lists:reverse(Acc))}
    after TimeoutMs ->
        try erlang:port_close(Port) catch _:_ -> ok end,
        {-1, iolist_to_binary(lists:reverse(Acc))}
    end.

find_executable(Name) ->
    case os:find_executable(binary_to_list(Name)) of
        false -> {error, nil};
        Path -> {ok, list_to_binary(Path)}
    end.
