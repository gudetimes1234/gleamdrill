-module(run_gate_ffi).
-export([init/0, try_acquire/1, release/0]).

%% A single atomic counter, kept in persistent_term so every request process
%% finds the same one. See server/run_gate.gleam.

-define(KEY, {?MODULE, in_flight}).

init() ->
    persistent_term:put(?KEY, counters:new(1, [atomics])),
    nil.

try_acquire(Max) ->
    Ref = persistent_term:get(?KEY),
    counters:add(Ref, 1, 1),
    case counters:get(Ref, 1) > Max of
        true ->
            counters:sub(Ref, 1, 1),
            false;
        false ->
            true
    end.

release() ->
    counters:sub(persistent_term:get(?KEY), 1, 1),
    nil.
