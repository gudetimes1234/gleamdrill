import algodrill/problem.{type Category, Category, Problem, Python, Subcategory}
import gleam/option.{None}

pub fn category() -> Category {
  Category("Python Tips", [
    Subcategory("Idioms", [
      Problem(
        title: "Counter for frequency maps",
        prompt: "Write the idiomatic way to count element frequencies and get the n most common items.",
        solution: "from collections import Counter

counts = Counter(nums)
counts.most_common(2)   # [(val, freq), (val, freq)]
counts[some_key]        # 0 for missing keys, no KeyError",
        language: Python,
        check: None,
      ),
      Problem(
        title: "defaultdict for grouping",
        prompt: "Write the idiomatic way to group items into lists by a computed key, without checking whether the key exists.",
        solution: "from collections import defaultdict

groups = defaultdict(list)
for word in words:
    groups[sorted(word)].append(word)

# defaultdict(int) for counters
# defaultdict(set) for unique membership",
        language: Python,
        check: None,
      ),
      Problem(
        title: "deque for O(1) popleft",
        prompt: "Write a BFS skeleton using the right data structure for a queue.",
        solution: "from collections import deque

queue = deque([start])
while queue:
    node = queue.popleft()   # O(1); list.pop(0) is O(n)
    for neighbor in graph[node]:
        queue.append(neighbor)",
        language: Python,
        check: None,
      ),
      Problem(
        title: "heapq for min/max heaps",
        prompt: "Write how to build a min heap, push and pop, and how to fake a max heap.",
        solution: "import heapq

heap = [3, 1, 4]
heapq.heapify(heap)      # O(n)
heapq.heappush(heap, 2)
smallest = heapq.heappop(heap)

# max heap: negate the values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)",
        language: Python,
        check: None,
      ),
      Problem(
        title: "Enumerate, zip, and unpacking",
        prompt: "Write the idiomatic ways to iterate with an index, iterate two sequences in parallel, and swap two variables.",
        solution: "for i, val in enumerate(nums):
    ...

for a, b in zip(list_a, list_b):
    ...

for i, val in enumerate(nums, start=1):  # 1-indexed
    ...

left, right = right, left",
        language: Python,
        check: None,
      ),
      Problem(
        title: "Slicing and reversal",
        prompt: "Write how to reverse a sequence, take every nth element, and copy a list with slicing.",
        solution: "s[::-1]      # reversed
s[::2]       # every 2nd element
s[:]         # shallow copy
s[-3:]       # last 3 elements
s[1:-1]      # drop first and last",
        language: Python,
        check: None,
      ),
      Problem(
        title: "Sorting with a key",
        prompt: "Write how to sort by a custom key, sort descending, and sort by multiple fields.",
        solution: "nums.sort()                          # in place
sorted_nums = sorted(nums)           # new list

words.sort(key=len)
words.sort(key=len, reverse=True)

# multiple fields: ascending name, descending age
people.sort(key=lambda p: (p.name, -p.age))",
        language: Python,
        check: None,
      ),
      Problem(
        title: "Building strings efficiently",
        prompt: "Write the O(n) way to build a string from many pieces, and explain what to avoid.",
        solution: "# Good: O(n)
parts = []
for c in chars:
    parts.append(c)
result = ''.join(parts)

# Bad: O(n^2) — strings are immutable,
# every += allocates a new string
result = ''
for c in chars:
    result += c",
        language: Python,
        check: None,
      ),
    ]),
  ])
}
