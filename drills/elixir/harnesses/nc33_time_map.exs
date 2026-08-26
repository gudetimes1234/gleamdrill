store = Solution.new() |> Solution.set("foo", "bar", 1)
later = Solution.set(store, "foo", "bar2", 4)

[
  {~S{get("foo", 1) after set at 1}, inspect("bar"), inspect(Solution.get(store, "foo", 1))},
  {~S{get("foo", 3) with only the value at 1}, inspect("bar"),
   inspect(Solution.get(store, "foo", 3))},
  {~S{get("foo", 4) after set at 4}, inspect("bar2"), inspect(Solution.get(later, "foo", 4))},
  {~S{get("foo", 5) after set at 4}, inspect("bar2"), inspect(Solution.get(later, "foo", 5))},
  {~S{get("foo", 3) still sees the older value}, inspect("bar"),
   inspect(Solution.get(later, "foo", 3))},
  {~S{get("foo", 0) before anything was set}, inspect(""),
   inspect(Solution.get(later, "foo", 0))},
  {~S{get("missing", 1)}, inspect(""), inspect(Solution.get(later, "missing", 1))}
]
