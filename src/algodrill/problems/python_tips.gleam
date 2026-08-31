import algodrill/problem.{
  type Category, type Problem, Category, Problem, Python, Solution, Subcategory,
}
import algodrill/problems/approaches
import algodrill/problems/embedded.{type Embedded}
import algodrill/problems/embedded_python
import gleam/list
import gleam/option.{None, Some}

pub fn category() -> Category {
  Category("Python Tips", [
    Subcategory("Idioms", [
      drill(
        "Counter for frequency maps",
        "Write topTwo(nums) returning the two most common values as (value, count) pairs, and countOf(nums, value) returning how often value appears (0 if absent, no KeyError). Reach for collections.Counter.",
        embedded_python.tip01_counter(),
      ),
      drill(
        "defaultdict for grouping",
        "Write groupByLength(words) returning a dict mapping each length to the list of words of that length, keeping input order. Use collections.defaultdict(list); convert to a plain dict at the end.",
        embedded_python.tip02_defaultdict(),
      ),
      drill(
        "deque for O(1) popleft",
        "Write bfsOrder(graph, start): a breadth-first walk of graph (a dict of node to neighbour list) from start, returning nodes in visit order. Use collections.deque as the queue - list.pop(0) is O(n).",
        embedded_python.tip03_deque(),
      ),
      drill(
        "heapq for min/max heaps",
        "Write kSmallest(nums, k) and kLargest(nums, k) returning the k smallest / largest values in order using heapq. Python only has a min-heap: negate values on the way in and out for the max side.",
        embedded_python.tip04_heapq(),
      ),
      drill(
        "Enumerate, zip, and unpacking",
        "Write firstIndexOf(nums, target) returning the index of the first match (-1 if none) with enumerate - no range(len(...)) - and dotProduct(a, b) summing pairwise products with zip.",
        embedded_python.tip05_enumerate_zip(),
      ),
      drill(
        "Slicing and reversal",
        "Using only slicing: reversedString(s), everySecond(s) (characters at even indices), lastN(s, n) (last n characters, empty when n <= 0), and trimEnds(s) (drop the first and last character).",
        embedded_python.tip06_slicing(),
      ),
      drill(
        "Sorting with a key",
        "Write sortByLength(words) sorting by word length, and sortPairs(pairs) sorting (name, score) tuples by name ascending then score descending - both as one sorted(...) call with a key.",
        embedded_python.tip07_sort_key(),
      ),
      drill(
        "Building strings efficiently",
        "Write joinUpper(chars) returning the uppercased concatenation of a list of characters the O(n) way: append the pieces to a list and join once at the end - += in a loop re-copies the string every time.",
        embedded_python.tip08_join(),
      ),
    ]),
  ])
}

fn drill(title: String, prompt: String, e: Embedded) -> Problem {
  Problem(
    title: title,
    prompt: prompt,
    approach: approaches.for_title(title),
    solutions: list.map(e.solutions, fn(s) {
      Solution(label: s.0, complexity: s.1, note: s.2, code: s.3)
    }),
    language: Python,
    check: Some(e.check),
    quiz: None,
  )
}
