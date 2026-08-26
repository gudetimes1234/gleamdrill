//// The "how does this problem break down" text shown in the collapsed
//// Approach panel. Keyed by title so every language mirror of a problem
//// shares one write-up.

pub fn for_title(title: String) -> String {
  case title {
    "Contains Duplicate" ->
      "A set-membership problem. Walk the list once, keeping a set of everything seen so far; the moment a value is already in the set you've found a duplicate. Sorting first and checking neighbours also works, but costs O(n log n) against the set's O(n)."

    "Valid Anagram" ->
      "A frequency-counting problem. Two strings are anagrams exactly when every character occurs the same number of times in both, so build a character-count map for each and compare them. Sorting both strings and comparing is the simpler O(n log n) alternative."

    "Two Sum" ->
      "A hash-map complement lookup. For each number, ask: have I already seen target minus this number? Keep a map from value to index as you walk; each lookup is O(1), one pass total. The brute force checks every pair at O(n\u{b2})."

    "Group Anagrams" ->
      "A canonical-key bucketing problem. Anagrams become identical when you sort their letters, so use the sorted word as a map key and append each word to its bucket. The map's values are the groups."

    "Top K Frequent Elements" ->
      "Count, then select. Build a value-to-frequency map first; then pick the k largest counts \u{2014} sorting the (value, count) pairs by count is the simple way, a heap of size k is the classic optimisation when k is much smaller than n."

    "Encode and Decode Strings" ->
      "A framing problem rather than a string problem. Any encoding is legal so long as decode undoes it, so the only real question is how the decoder knows where each string ends. Length-prefixing answers it outright \u{2014} read a number, take that many characters \u{2014} and needs no assumption about what the strings contain. A separator works too, but only with escaping. Either way the encoding has to tell an empty list apart from a list holding one empty string."

    "Product of Array Except Self" ->
      "A prefix/suffix problem. The answer at position i is (product of everything before i) \u{d7} (product of everything after i). Compute prefix products in one pass, suffix products in a reverse pass, and multiply them position-wise \u{2014} no division needed."

    "Valid Sudoku" ->
      "Three constraints, checked together. A digit is illegal if it repeats within its row, its column, or its 3\u{d7}3 box, so either carry one set of (value, unit) signatures and test all three as you walk, or gather the 27 units and check each for a repeat. Only filled cells matter: the board does not have to be solvable, only consistent."

    "Longest Consecutive Sequence" ->
      "A set problem with a pruning trick. Put every number in a set; then only start counting a run at numbers that have no predecessor (n-1 not in the set), walking forward while successors exist. Each number is visited at most twice, so it's O(n) despite the nested-looking walk."

    "Valid Palindrome" ->
      "Normalise, then compare from both ends. Strip everything but letters and digits, lowercase, then either walk two pointers inwards or just compare the cleaned sequence with its reverse \u{2014} same complexity, pick whichever reads better in your language."

    "Two Sum II - Input Array Is Sorted" ->
      "A two-pointer convergence problem \u{2014} the sortedness is the whole hint. Start pointers at both ends: too small a sum means advance the left pointer (bigger values), too big means retreat the right. They meet in O(n) with no extra memory."

    "3Sum" ->
      "Sort, fix one, two-pointer the rest. After sorting, fix each number in turn and run the Two Sum II two-pointer scan on the remainder looking for the negated value. Sorting also makes duplicate triples easy to skip."

    "Container With Most Water" ->
      "Two pointers with a greedy argument. Start at both ends; the area is limited by the shorter line, so moving the taller pointer can never help \u{2014} always move the shorter one inwards and track the best area seen."

    "Trapping Rain Water" ->
      "Ask what sits above one position, not how the pools are shaped. The water at index i is min(tallest to the left, tallest to the right) minus height[i]. Computing both running maxima and summing is the direct reading; the two-pointer version gets there in one pass by always advancing the shorter side, where the near maximum alone already fixes the water level."

    "Best Time to Buy and Sell Stock" ->
      "A running-minimum problem. Sweep once, tracking the cheapest price seen so far and the best profit if you sold today (price minus that minimum). One pass, two variables."

    "Longest Substring Without Repeating Characters" ->
      "A sliding-window problem. Grow the window rightwards; remember the last index of each character, and when you hit a repeat, jump the window's start past that character's previous position. Track the widest window seen."

    "Longest Repeating Character Replacement" ->
      "A sliding window with a validity rule. A window can be made uniform with k changes when window size minus its most-frequent-character count is at most k. Grow the right edge; when the rule breaks, shrink from the left. The answer is the biggest valid window."

    "Permutation in String" ->
      "A fixed-width sliding window. A permutation of s1 is just any window of length |s1| in s2 with identical character frequencies \u{2014} slide the window one character at a time, incrementally adding the new character and removing the old, comparing frequency maps."

    "Minimum Window Substring" ->
      "A sliding window that grows until it is valid and shrinks while it stays valid. The whole trick is making \"valid\" a single integer test rather than a map comparison: count how many needed characters are still missing, decrement only when a character that was genuinely still needed arrives, and the window is valid exactly when that count hits zero. Then pull the left edge in as far as it will go before growing again."

    "Sliding Window Maximum" ->
      "The maximum is not something you can maintain by adding and removing \u{2014} dropping the current maximum leaves you with no idea what the next one is. Two ways out: keep a queue of the indices that could still win, values decreasing, so the front is always the answer; or pre-compute running maxima within blocks of k, since every window straddles at most one block boundary. Both are O(n)."

    "Valid Parentheses" ->
      "A stack problem. On every opener, push the closer you expect; on every closer, it must match the top of the stack. Valid means never mismatching and ending with an empty stack."

    "Min Stack" ->
      "Augment each entry. Store pairs of (value, minimum-so-far) so the current minimum always sits on top; push computes the new pair's min against the previous top, pop just discards. All four operations are O(1)."

    "Daily Temperatures" ->
      "A monotonic-stack problem. Keep a stack of indices whose answer is still unknown, always in decreasing temperature order. Each new day pops every colder entry \u{2014} the popped days just found their warmer day \u{2014} then pushes itself."

    "Binary Search" ->
      "The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step."

    "Find Minimum in Rotated Sorted Array" ->
      "Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point \u{2014} and the minimum \u{2014} hides in the unsorted half."

    "Search in Rotated Sorted Array" ->
      "Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it \u{2014} recurse into that half or the other."

    // Gleam Tips
    "Pattern matching on lists" ->
      "In Gleam a list is either [] or [head, ..tail] \u{2014} every list function is a case expression over those two shapes (plus [only] when the last element matters). Recursion replaces loops: handle the empty case, then recurse on the tail."

    "Tail recursion with accumulators" ->
      "The loop-variable idiom: a public wrapper calls a private helper that carries the work-in-progress as an extra argument. When the recursive call is the last thing the function does, the compiler turns it into a loop \u{2014} no stack growth."

    "fold is the loop" ->
      "Anything that walks a list carrying state is a fold: give it an initial value and a function combining the accumulator with each element. max, counting, and running totals all fall out; list.scan is fold that keeps the intermediate values."

    "Frequency maps with dict.upsert" ->
      "dict.upsert is Gleam's counter idiom: it hands you Some(current) or None and stores what you return, so counting is one fold with option.unwrap(n, 0) + 1 inside."

    "Result chains with use" ->
      "use x <- result.try(...) flattens what would be nested case expressions: each fallible step either binds its Ok value and continues, or short-circuits the whole function with the Error. Read it as early-return for Results."

    "Option ergonomics" ->
      "Chains of option.map / option.unwrap / option.from_result express \u{201c}use it if present, fall back if not\u{201d} without a single case expression. Reach for them when the code is a straight pipeline over a maybe-missing value."

    "String prefix patterns and graphemes" ->
      "Gleam can pattern-match string prefixes directly: \"# \" <> rest binds everything after the prefix. For anything character-by-character, convert with string.to_graphemes and use list functions."

    "Pipelines" ->
      "The |> operator feeds each result into the next call, turning inside-out nesting into a top-to-bottom recipe. If you find yourself naming throwaway intermediate variables, it probably wants to be a pipeline."

    "Records: labelled args and update syntax" ->
      "Records are immutable: construction uses labelled arguments, and \u{201c}modifying\u{201d} one is Record(..old, field: new) \u{2014} a copy with some fields swapped. Updates return the new record; nothing changes in place."

    "gleam/set for membership and dedupe" ->
      "Membership questions want a set, not a list \u{2014} contains is effectively O(1). Deduping while keeping first-seen order is a fold carrying #(kept, seen): append to kept only when insert into seen reports the value is new."

    // Python Tips
    "Counter for frequency maps" ->
      "collections.Counter is the counting idiom: feed it any iterable and it's a dict of value \u{2192} count, with missing keys reading as 0 and most_common(k) giving the top k \u{2014} no manual dict bookkeeping."

    "defaultdict for grouping" ->
      "collections.defaultdict removes the \u{201c}is the key there yet?\u{201d} dance: defaultdict(list) materialises an empty list on first touch, so grouping is one append per item. Use int for counters and set for unique membership."

    "deque for O(1) popleft" ->
      "Lists pop from the front in O(n); collections.deque does it in O(1). Any queue-shaped algorithm \u{2014} breadth-first search above all \u{2014} wants a deque: append to the right, popleft from the left."

    "heapq for min/max heaps" ->
      "heapq turns a plain list into a min-heap: heapify in O(n), push and pop in O(log n). Python has no max-heap \u{2014} negate values on the way in and out. Reach for it when you repeatedly need the smallest (or largest) of a changing collection."

    "Enumerate, zip, and unpacking" ->
      "enumerate gives you index and value together, zip walks two sequences in lockstep, and tuple unpacking names the pieces directly \u{2014} between them, almost no loop needs range(len(...))."

    "Slicing and reversal" ->
      "Slices are Python's substring/subarray notation: s[a:b:step]. The famous ones: [::-1] reverses, [:] copies, negative indices count from the end. They never mutate \u{2014} every slice is a new sequence."

    "Sorting with a key" ->
      "sort/sorted take a key function that maps each element to what it should be compared by \u{2014} len, a tuple for multi-field ordering, a negated number for descending. sort mutates in place; sorted returns a new list."

    "Building strings efficiently" ->
      "Strings are immutable, so building one with += in a loop re-copies everything each time \u{2014} O(n\u{b2}). Collect the pieces in a list and ''.join(parts) once at the end for O(n)."

    _ -> ""
  }
}
