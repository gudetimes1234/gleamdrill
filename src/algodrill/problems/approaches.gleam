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

    "Evaluate Reverse Polish Notation" ->
      "Postfix notation exists so that a stack can evaluate it without any parsing. Push numbers; on an operator, pop two, apply, push the result. Two things to get right: the value popped first is the *right* operand, and the division truncates towards zero rather than flooring, which matters as soon as a negative appears."

    "Generate Parentheses" ->
      "Build only what is valid rather than filtering afterwards. Backtracking with two counters gets there \u{2014} an opener is legal while any are left, a closer only while more are outstanding than openers \u{2014} and so does composition: every balanced string is \"(\" A \")\" B for one split, so enumerating splits enumerates the answers. The count is the nth Catalan number."

    "Car Fleet" ->
      "Order by position, then think about time. A car catches the one ahead exactly when it would arrive no later, and a fleet moves at the speed of its slowest member, so walking from the front and carrying the arrival time of the fleet ahead is enough: anything slower to arrive starts a new fleet. Compare times cross-multiplied to stay in integers."

    "Largest Rectangle in Histogram" ->
      "Every rectangle is some bar taken as far left and right as it will go, so the question is where each bar stops fitting. A monotonic stack answers both boundaries in one pass: a shorter bar arriving closes off every taller entry \u{2014} that is its right edge \u{2014} and the position the closed entries reached back to becomes the new bar's left edge."

    "Binary Search" ->
      "The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step."

    "Search a 2D Matrix" ->
      "The rows are sorted and do not overlap, so the whole matrix is one sorted sequence wearing a grid costume \u{2014} halve to the row a value could be in, then halve within it, or index the grid as if it were flat. The staircase walk from the top-right is the other answer: every step rules out a whole row or a whole column, and it does not need the non-overlap."

    "Koko Eating Bananas" ->
      "Binary search on the answer rather than on the input. The speeds run from 1 to the largest pile, and \"can she finish in h hours at this speed?\" is monotone \u{2014} true for a speed means true for every faster one \u{2014} so the smallest speed that works is a boundary you can halve towards. The check itself is a sum of ceil(pile / speed), because piles are never combined within an hour."

    "Time Based Key-Value Store" ->
      "A map from key to that key's history, and a binary search inside it. Timestamps only ever increase, so appending keeps each history sorted without any sorting; the lookup is then \"the newest entry at or before this time\", which is the standard predecessor search \u{2014} keep the candidate and keep looking on the newer side for a better one."

    "Median of Two Sorted Arrays" ->
      "The O(log) answer does not look for the median at all: it looks for a cut through both arrays with exactly half the elements to its left, which is correct when both left-hand values are no bigger than both right-hand values. That condition is monotone in where you cut the shorter array, so halve on the cut position. Merging until the middle is the O(m + n) version, and worth writing first."

    "Find Minimum in Rotated Sorted Array" ->
      "Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point \u{2014} and the minimum \u{2014} hides in the unsorted half."

    "Search in Rotated Sorted Array" ->
      "Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it \u{2014} recurse into that half or the other."

    // Tries
    "Implement Trie (Prefix Tree)" ->
      "One node per prefix, with a flag marking which prefixes are whole words \u{2014} and that flag is the entire difference between search and startsWith. Storing every prefix in a set answers both questions too, in one lookup each, but stores O(total letters) of text rather than sharing it, which is exactly what the tree is for."

    "Design Add and Search Words Data Structure" ->
      "The dot is what makes this more than a trie lookup: it has to try every child, so the walk becomes a search. The trie earns its keep by abandoning a branch at the first letter that cannot match, so shared prefixes are explored once instead of once per word. Bucketing words by length is the cheap alternative \u{2014} a pattern can only match its own length."

    "Word Search II" ->
      "Do not run Word Search once per word: build one trie of all of them and walk it alongside the board. Every shared prefix is then explored once rather than once per word, and a square is abandoned the moment no word continues that way. That saving is the whole reason this problem is separate from Word Search."

    // 2-D Dynamic Programming
    "Unique Paths" ->
      "Only right and down moves, so the ways to reach a square are the ways to reach the one above plus the one to its left \u{2014} and only the previous row is ever needed, so one row of counters does. There is also no grid at all: every path is m\u{2212}1 downs and n\u{2212}1 rights in some order, so the count is a binomial coefficient."

    "Longest Common Subsequence" ->
      "Compare the two current characters: equal means both are used and the answer is one more than the rest; different means the best of dropping one or the other. This is the backbone recurrence of the category \u{2014} edit distance and distinct subsequences are the same table with different costs."

    "Best Time to Buy and Sell Stock with Cooldown" ->
      "Name the states and the recurrence writes itself: holding a share, having just sold (so today is the cooldown), and free to act. Each day depends only on yesterday, so three rolling values suffice \u{2014} and the cooldown is expressed simply by \"free\" never reading \"sold\" from the same day."

    "Coin Change II" ->
      "Combinations, not permutations \u{2014} and that is decided entirely by the loop order. Coins on the outside means each coin is settled before the next is looked at, so 1+2 and 2+1 cannot both be counted; swapping the loops silently counts orderings instead. As a recursion the same rule reads \"use this coin again, or set it aside for good\"."

    "Target Sum" ->
      "The only state that matters is the running total, not which signs produced it, so different sign choices landing on the same total merge \u{2014} that merging is what makes it polynomial. Better still, rewrite it: if P gets the pluses then P \u{2212} N = target and P + N = total, so P = (total + target)/2 and the whole thing is a subset-sum."

    "Interleaving String" ->
      "How much of each source has been used is the entire state, because the position in the target is their sum and never has to be tracked separately. Spotting that collapse from three indices to two is the problem; after it, the table is ordinary."

    "Longest Increasing Path in a Matrix" ->
      "Strictly increasing means the moves cannot form a cycle, so the grid is a directed acyclic graph and the longest path from each square is well-defined \u{2014} which is precisely what makes caching sound here and unsound in general. Sorting the squares by value gives a topological order without building the graph at all."

    "Distinct Subsequences" ->
      "Count the ways to build each prefix of the target out of the source seen so far; a matching source character carries the count at j\u{2212}1 forward to j. In a mutable array the row must be swept right to left, or a single source character gets used twice in the same subsequence."

    "Edit Distance" ->
      "Three edits, three neighbours: replace from the diagonal, delete from above, insert from the left, and equal characters take the diagonal for free. The first row and column are the cost of building a string out of nothing, which is its length."

    "Burst Balloons" ->
      "Ask which balloon goes *last* in a span, not first. The last one still has both span boundaries as neighbours \u{2014} untouched by definition \u{2014} so its value is known and the two sides become independent. Asking \"first\" leaves neighbours that depend on the other side and the recursion never closes. Pad with a 1 at each end to kill the edge cases."

    "Regular Expression Matching" ->
      "A star binds to the character before it, so the pattern is read two symbols at a time: given \"x*\", either skip the pair for zero copies, or \u{2014} if x matches here \u{2014} consume one character and stay on the same pair. The zero-copies branch is where this is usually got wrong, and it is what makes \"c*a*b\" match \"aab\"."

    // Backtracking
    "Subsets" ->
      "Every element is in or out, independently, so the subsets of a list are the subsets of its tail twice over \u{2014} once with the head added and once without. Those in-or-out choices are also the bits of a number, so counting from 0 to 2\u{207f}\u{2212}1 enumerates the same thing with no recursion at all."

    "Combination Sum" ->
      "Each step either takes the current candidate again \u{2014} reuse is allowed \u{2014} or drops it for good, and never returning to a dropped candidate is what stops one combination appearing in several orders. Getting the duplicates out by construction rather than by filtering afterwards is the pattern the harder variants all rest on."

    "Permutations" ->
      "Pick each element in turn as the first and permute what is left; removing the chosen element from the remainder is exactly what a \"used\" set does in an in-place version. The other direction works too: every permutation of n is a permutation of n\u{2212}1 with the new element wedged into one of its n positions, which explains the factorial outright."

    "Subsets II" ->
      "Sorting is what makes the duplicate rule expressible: with equal values adjacent, skipping a value means skipping *every* copy of it at once, and skipping one while keeping the next is exactly how the same subset gets built twice. Framing the choice as \"how many copies of this value\" avoids the rule entirely."

    "Combination Sum II" ->
      "Each candidate is usable once, so taking one moves past it \u{2014} and the duplicate rule is the same one as Subsets II, which is the reason to drill the two together. Generating everything and deduplicating afterwards is correct but exponentially wasteful when many values are equal."

    "Word Search" ->
      "Depth-first from every square, with the path so far in a set so no letter is reused within one attempt. The set must be per-path rather than global: a square rejected on one route has to stay available on another, and that is the whole difference between backtracking and plain search. Two cheap prunings help \u{2014} letter counts, and starting from whichever end of the word is rarer."

    "Palindrome Partitioning" ->
      "Every partition begins with some palindromic prefix, so the only choice at each step is how long that prefix is; cutting there and recursing on the rest reaches each partition exactly once. Precomputing which spans are palindromes turns the test inside the search from a scan into a lookup."

    "Letter Combinations of a Phone Number" ->
      "One choice per digit with no constraint between them, so the answer is simply the cross product of the letter sets \u{2014} which makes this the cleanest place to see what backtracking becomes when nothing can ever fail. Folding builds the same product without a call stack."

    "N-Queens" ->
      "One queen per row, so the only choice is the column. A diagonal is identified by row \u{2212} column and an anti-diagonal by row + column, which turns \"is this square attacked?\" into three set lookups and lets an entire subtree be abandoned the moment one fails. Note what the search space really is: an arrangement with no shared column *is* a permutation."

    // Heap / Priority Queue
    "Kth Largest Element in a Stream" ->
      "Only the k largest values can ever be the answer, so everything else is discarded on arrival and the store never grows past k \u{2014} which is exactly a bounded min-heap: its smallest element is the answer, and anything smaller never gets in. Note there is no answer at all until k values have arrived."

    "Last Stone Weight" ->
      "The collection has to give up its maximum over and over, which is the whole reason this problem exists: it is a heap in a costume. Keeping the stones sorted is the same idea at a worse constant, and scanning for the largest each round is worse still \u{2014} but all three make the same point about what operation is actually being asked for."

    "K Closest Points to Origin" ->
      "Sort by *squared* distance rather than distance: the square root is monotonic, so it cannot change the order, and dropping it keeps everything in integers with nothing to round. A bounded heap of size k beats the sort when k is small, which is the same trade as everywhere else in this category."

    "Kth Largest Element in an Array" ->
      "Sorting answers every k at once and is the version nobody gets wrong. Quickselect does better by partitioning around a pivot and recursing only into the side that must hold the answer \u{2014} expected O(n) because the work halves rather than being done twice, though the worst case is still quadratic."

    "Task Scheduler" ->
      "Lay the most frequent task out first with gaps of n between its copies. That skeleton is (busiest \u{2212} 1) frames of n+1 slots plus a final row of every task tied for busiest \u{2014} and everything else either drops into an idle slot or has already pushed the total past the skeleton, in which case nothing idles at all and the answer is just the number of tasks."

    "Design Twitter" ->
      "A counter standing in for time is the design: it orders tweets across every user with no real timestamps. Storing one global timeline makes the feed a filter, which is simple and walks every tweet ever posted; storing tweets per author makes it a k-way merge over the people followed, which a heap resolves in the ten steps the answer actually needs."

    "Find Median from Data Stream" ->
      "Split the values into a smaller half and a larger half and the median sits at the two inner ends. Each half only ever surrenders its extreme value \u{2014} a max-heap below, a min-heap above \u{2014} and the entire difficulty is the rebalancing rule: sizes within one of each other, and nothing below larger than anything above."

    // 1-D Dynamic Programming
    "Climbing Stairs" ->
      "The last move was either one step or two, so the ways to reach step n are the ways to reach n\u{2212}1 plus the ways to reach n\u{2212}2 \u{2014} Fibonacci with a staircase painted on it. Only the last two values matter, so two variables replace the table. The top-down version with a cache is the same recurrence and worth writing once: the memo is the whole difference between O(n) and O(2\u{207f})."

    "Min Cost Climbing Stairs" ->
      "Cost to stand on each step, carried forward: getting here meant paying for one of the two steps below, whichever was cheaper. Either of the first two is a legal start, which is what the final min covers. Reading the recurrence backwards \u{2014} what it costs to *finish* from each step \u{2014} gives the same answer and is often the easier direction to state."

    "House Robber" ->
      "At each house: take it and add what was safe two houses back, or skip it and keep the best so far. Both are single numbers, so the table collapses to a pair. Writing it as a recursion instead makes visible what the rolling pair hides \u{2014} that the problem is a tree of choices, and the cache is what flattens it."

    "House Robber II" ->
      "The circle matters through one constraint only: the first and last houses are neighbours, so at most one is robbed. Rule each out in turn and what is left is the straight-line problem you already solved, twice. Reusing a solved problem beats inventing a circular recurrence."

    "Longest Palindromic Substring" ->
      "Every palindrome has a centre, and there are only 2n of them \u{2014} n characters and n gaps between them. Growing outwards from each is O(n\u{b2}) and needs no table. The gaps are the part people forget: without them every even-length palindrome is invisible."

    "Palindromic Substrings" ->
      "The same 2n centres as the longest-palindrome problem, except that here every successful widening is itself an answer, so you count expansions rather than measuring the biggest. The table version says s[i..j] is a palindrome when its ends match and the inside already was, which forces the spans to be filled shortest first."

    "Decode Ways" ->
      "Two rolling counts: the ways up to here are the ways up to the previous character, if this one stands alone, plus the ways up to the one before that, if the pair reads as 10 to 26. Zeros are the whole difficulty \u{2014} one can never stand alone, and only 10 and 20 can carry one. Note the base case is 1, not 0: reaching the end is one complete decoding."

    "Coin Change" ->
      "Build up from zero: the cheapest way to make a target is one coin more than the cheapest way to make what is left after some coin. Leaving unreachable amounts out of the table entirely avoids inventing a sentinel for infinity. The same thing as breadth-first search from zero \u{2014} which makes clear the answer is a shortest path."

    "Maximum Product Subarray" ->
      "A negative number turns the best running product into the worst and the worst into the best, so both have to be carried. Zero resets them, which falls out for free from including the element itself among the candidates rather than special-casing it."

    "Word Break" ->
      "Positions, not substrings. Position 0 is reachable, and a position becomes reachable when some dictionary word bridges the gap from one already reached; the answer is whether the end is. Top-down asks the same question of suffixes, where the cache is essential \u{2014} inputs like \"aaaa\u{2026}b\" reach the same suffix exponentially many ways."

    "Longest Increasing Subsequence" ->
      "The direct recurrence is O(n\u{b2}): the longest subsequence ending here is one plus the best ending at any earlier smaller value. Patience sorting gets O(n log n) by keeping the smallest value a subsequence of each length can end with \u{2014} that list stays sorted, so each number is placed by halving. It is not the answer subsequence, only its length is."

    "Partition Equal Subset Sum" ->
      "Subset sum in disguise: an equal split exists exactly when some subset adds to half the total, and an odd total rules it out before any work at all. Carrying the set of reachable sums needs no ordering and no table; writing it as take-it-or-leave-it recursion makes the underlying 2\u{207f} search visible."

    // Math & Geometry
    "Rotate Image" ->
      "A quarter turn is two reflections: through the main diagonal, then through the vertical centre line. Both are easy to write and neither needs index arithmetic, which beats memorising the four-way element cycle. If you would rather derive it, the entry at (row, column) after a clockwise turn came from (n \u{2212} 1 \u{2212} column, row)."

    "Spiral Matrix" ->
      "Two ways in. Peel the top row off and rotate what is left anticlockwise \u{2014} the column you would have walked down is now the top row, so there is only ever one move to make. Or track four boundaries closing in, in which case the traps are the single remaining row and column, where the top and bottom edges are the same edge and walking both emits it twice."

    "Set Matrix Zeroes" ->
      "The whole problem is why one pass fails: a zero written as you go is indistinguishable from a zero that was already there, so the grid clears itself. Record which rows and columns are doomed, then apply. Storing those marks in the grid's own first row and column is what gets it to constant extra space."

    "Happy Number" ->
      "Sums of squared digits are bounded, so only finitely many values are reachable and the walk must eventually repeat \u{2014} which makes this a cycle-detection problem wearing a numeric costume. A set of seen values answers it directly; Floyd's slow and fast pointers answer it in constant space, meeting at 1 for a happy number and inside the other cycle otherwise."

    "Plus One" ->
      "A carry that starts at 1 and dies at the first digit below nine. The only case worth care is all nines, where it runs off the end and the number grows a digit. Folding the digits into an integer works too \u{2014} until the number is longer than the language's integers, which is precisely why the input is a list of digits."

    "Pow(x, n)" ->
      "Halving the exponent halves the work: x^n is (x^(n/2))\u{b2}, with one extra multiplication when n is odd, so O(log n) multiplications instead of n. Handle the negative exponent with one reciprocal at the end, and bottom the recursion out at n = 0 returning 1."

    "Multiply Strings" ->
      "Long multiplication, with the carrying postponed. Digit i of one number times digit j of the other always lands at position i + j, so every product can be dropped straight into its slot and the carries settled in a single sweep afterwards. Deferring the carry is what keeps the inner loop free of bookkeeping."

    "Detect Squares" ->
      "Fix a corner and the rest follows. Choosing the corner diagonally opposite the query determines the whole square \u{2014} the other two must be at (x, py) and (px, y) \u{2014} so the count is the product of the three corner counts, summed over valid diagonals. Duplicated points multiply rather than repeat, because two points at the same place really do make two squares."

    // Bit Manipulation
    "Single Number" ->
      "XOR is its own inverse and ignores order, so every value that appears twice cancels itself out wherever the copies sit and the lone one survives. One pass, constant space, and nothing assumed about the size or sign of the values. The arithmetic alternative \u{2014} twice the sum of the distinct values minus the real total \u{2014} says the same thing but depends on every other value appearing exactly twice."

    "Number of 1 Bits" ->
      "n & (n \u{2212} 1) clears the lowest set bit and touches nothing else, so counting takes one step per set bit rather than one per bit position. Worth having in the fingers: the same expression tests for a power of two. Shifting and testing the bottom bit is the plain alternative \u{2014} 32 steps whatever the input, and mind the sign on a right shift."

    "Counting Bits" ->
      "Every number is some smaller number with one more bit on the end, so count(i) is count(i >> 1) plus that final bit. Each answer is one lookup into work already done, which is what turns an O(n log n) sweep of popcounts into an O(n) pass."

    "Reverse Bits" ->
      "Peel the bottom bit off the input and push it onto the bottom of the result \u{2014} the first bit out is the last bit in. The trap is stopping early: the loop must run a fixed 32 times, because the leading zeros of a small input are exactly the trailing zeros the answer needs."

    "Missing Number" ->
      "XOR every value against every index it should have had. Present numbers meet their own index and cancel, leaving the missing one's index unpaired. The sum formula n(n+1)/2 minus the actual total is shorter and reads better, at the cost of an intermediate that can overflow where the XOR cannot."

    "Sum of Two Integers" ->
      "XOR is addition that forgets to carry, and AND finds exactly where a carry was owed \u{2014} shift that left one place and add it in the same way, until nothing is owed. In a language with fixed-width integers this just works; in one with arbitrary precision the negatives have to be masked into 32 bits or the carry never stops, and the sign read back by hand."

    "Reverse Integer" ->
      "Peel digits off the bottom of the input and push them onto the bottom of the result. The whole difficulty is the overflow test, which has to happen *before* the multiplication \u{2014} in a fixed-width language that multiply is the moment the value is destroyed, so a check afterwards is inspecting a number that no longer exists."

    // Greedy
    "Maximum Subarray" ->
      "Kadane. At each position the best subarray ending there either extends the one ending just before it or starts fresh, and the choice comes down to whether the running total has gone negative \u{2014} a negative prefix can only hurt whatever follows. The prefix-sum framing says the same thing differently: the best subarray ending at j is prefix[j] minus the smallest prefix before it. The answer is not clamped at zero."

    "Jump Game" ->
      "The set of indices reachable from the left is always a prefix, which collapses the whole problem to one number: the furthest index reachable so far. Walk forward extending it, and the moment the walk gets past it nothing further is reachable. Walking backwards works too \u{2014} carry the leftmost index known to reach the end and see whether it makes it to zero."

    "Jump Game II" ->
      "Breadth-first search, except the frontier stays contiguous: everything reachable in k jumps is a range. So the levels are just windows \u{2014} when the walk reaches the current window's end, one jump is spent and the next window runs to the furthest index seen. No queue, no visited set, one pass."

    "Gas Station" ->
      "Two observations. If the total gas is less than the total cost, no start works at all. And if the tank runs dry between i and j, no station in between can start either, since each begins with even less \u{2014} so the search jumps straight past them to j+1. Together they turn the O(n\u{b2}) search over starts into a single pass."

    "Hand of Straights" ->
      "Greedy with no choice to make: the smallest card left has no smaller neighbour to hide behind, so whatever group it belongs to must begin with it. Count the cards, then repeatedly consume a run of the required length starting at the smallest one still present. Every copy of that card needs its own group, and they are indistinguishable, so take them together."

    "Merge Triplets to Form Target Triplet" ->
      "Merging takes componentwise maxima, and a max never comes back down \u{2014} so a triplet with any component above the target is permanently poisonous and can never be used. Discard those, and everything left can be merged freely because a max only helps. The answer is whether the survivors' componentwise maximum is the target."

    "Partition Labels" ->
      "A piece can only end once every character inside it has run out, so start by mapping each character to its last position. Then sweep, pushing the piece's end out to the furthest last-position seen so far; the moment the walk catches up with that end, nothing inside can reappear and the piece is closed."

    "Valid Parenthesis String" ->
      "The wildcard makes a single counter impossible, so carry a range instead: the fewest and most open brackets still possible, treating every star as a closer and as an opener respectively. Bail when the high end goes negative \u{2014} even the most generous reading has too many closers \u{2014} clamp the low end at zero, and the string is valid when the low end reaches zero at the end."

    // Intervals
    "Insert Interval" ->
      "The input is already sorted, and that is the whole gift: the list falls into everything that finishes before the new interval starts, everything that touches it, and everything after. Only the middle run collapses \u{2014} into a single interval spanning the lot \u{2014} so one pass does it with no sorting at all."

    "Merge Intervals" ->
      "Sort by start and the problem collapses: an interval can only ever overlap the one currently being built, because anything it could have overlapped earlier was already absorbed into that one. A single pass then either extends the interval in hand or begins a new one. The other framing is to keep only the edges, +1 and \u{2212}1, and cut wherever the running count returns to zero."

    "Non-overlapping Intervals" ->
      "Removing the fewest is keeping the most, which is the classic activity-selection greedy: sort by *end* time and keep every interval that starts after the last one kept. The exchange argument is that finishing earliest leaves the most room for everything after, so it can never be worse. Sorting by start is the natural wrong answer \u{2014} it keeps whichever came first, which may be a very long one."

    "Meeting Rooms" ->
      "Sorted by start, the only meeting a given one can clash with is the one immediately before it: anything earlier began earlier still, so it would have clashed with that one first. The check is then adjacent pairs. Worth having the overlap condition itself by heart \u{2014} two intervals overlap when each starts before the other ends."

    "Meeting Rooms II" ->
      "Rooms needed is the most meetings ever running at once, so the meetings themselves stop mattering and only their edges do: +1 at a start, \u{2212}1 at an end, and the answer is the high-water mark of the running count. Note the tie-break \u{2014} a room freed exactly as another meeting starts can be reused, so closes come before opens, the opposite of what merging wants."

    "Minimum Interval to Include Each Query" ->
      "Both good answers give up on answering queries in the order they arrive. Sort them by time, let intervals in as they start, keep the live ones in a heap by length and discard whatever has already ended \u{2014} or go the other way and take intervals shortest first, so the first one to cover a query is already its final answer and that query never needs looking at again."

    // Graphs
    "Number of Islands" ->
      "Counting connected components on an implicit graph: the cells are the nodes and adjacency is the four neighbours, so no graph is ever built. Walk from each unvisited land cell, sink everything it reaches, and add one \u{2014} the traversal does the counting. Union-find does the same job without recursion, which matters when the grid is deep enough to overflow the stack."

    "Clone Graph" ->
      "The whole problem is the map from original node to its copy. Consult it before copying anything, and a cycle terminates by itself \u{2014} a node already in the map is returned rather than re-copied. Without it, any cycle recurses forever. Whether the walk is breadth-first or depth-first makes no difference."

    "Max Area of Island" ->
      "Number of Islands with the count replaced by a size: each traversal returns how many cells it reached, and the answer is the largest. The reason to prefer depth-first here is that the size falls out of the return value \u{2014} 1 plus the four neighbours \u{2014} rather than needing a counter."

    "Pacific Atlantic Water Flow" ->
      "Reverse the question. Asking of each cell \"can water get from here to both oceans\" repeats the same searches over and over; asking instead \"which cells can the ocean reach if water flowed uphill\" is two searches from the borders, and the answer is their intersection. Flipping the direction of a search to start from the goal is the transferable idea."

    "Surrounded Regions" ->
      "Also easier backwards. Rather than finding surrounded regions, mark the ones that are not \u{2014} everything reachable from a border O \u{2014} and flip whatever is left. That side-steps having to notice mid-traversal that a region touches the edge, and needs one pass from the border rather than one per region."

    "Rotting Oranges" ->
      "Multi-source breadth-first search: every rotten orange starts on the frontier at minute zero, so each wave of the search is one minute and the number of waves is the answer. One search per source would give distances from each source, then still need combining. Any fresh orange left unreached at the end is what makes the answer \u{2212}1."

    "Walls and Gates" ->
      "The same multi-source wave as rotting oranges, writing the wave number into the cell instead of counting waves. Starting from every gate at once is what makes the first arrival at a room the nearest gate; searching outward from each room instead costs a full search per room for the same answer."

    "Course Schedule" ->
      "\"Can every course be finished\" is \"is this graph acyclic\". Kahn\u{2019}s algorithm takes courses whose prerequisites are all met, releases what depended on them, and stalls exactly when a cycle remains. Depth-first answers it too, but needs three states rather than two \u{2014} a node seen again on the current path is a cycle, while one seen down a different branch is fine."

    "Course Schedule II" ->
      "The same computation as deciding whether it is possible, keeping the order rather than the count: the sequence courses come off the ready list is a topological order. Depth-first gives one too, by recording a course only after everything it depends on \u{2014} post-order \u{2014} which is why the answer comes out reversed."

    "Redundant Connection" ->
      "n nodes and n edges means exactly one cycle, and union-find finds it the moment an edge joins two nodes already connected. Processing edges in the given order is what makes the first such edge the last removable one, which is what the problem asks for. Testing each edge for removal is the honest O(n\u{b2}) reading of the specification."

    "Number of Connected Components in an Undirected Graph" ->
      "Start at n components and subtract a merge for every edge that actually joins two different ones \u{2014} no adjacency list and no traversal. The traversal version is the same idea as counting islands, and the contrast is the point: union-find can take edges as they arrive, the traversal needs the whole graph first."

    "Graph Valid Tree" ->
      "A tree is connected and acyclic, but with exactly n\u{2212}1 edges either condition implies the other, so checking the edge count plus one of them is enough. Union-find gets both from one pass \u{2014} an edge inside a component is a cycle, and n\u{2212}1 successful merges means one component."

    "Word Ladder" ->
      "Shortest path on an unweighted graph, so breadth-first \u{2014} but the graph is never built. Two words are neighbours when they share a wildcard pattern like \"*ot\", so bucketing every word under each of its patterns gives adjacency in linear time; comparing every pair costs O(n\u{b2}) before the search even starts."

    // Advanced Graphs
    "Reconstruct Itinerary" ->
      "An Eulerian path \u{2014} every edge used once, not every node visited once \u{2014} which is why it is tractable at all. Hierholzer\u{2019}s walk takes the smallest unused ticket every time and never backtracks: an airport is recorded only once its tickets are exhausted, so the dead end the greedy choice walks into is exactly where the route has to end, and reversing the record puts everything in order. Backtracking gets the same answer by trying and undoing, at exponential cost."

    "Min Cost to Connect All Points" ->
      "A minimum spanning tree on a complete graph. Prim\u{2019}s grows one tree, each outside point remembering only its distance to it \u{2014} O(n\u{b2}) with no heap, which is the right shape when every pair is an edge. Kruskal\u{2019}s sorts all the edges and uses union-find to skip the ones that would close a loop; it never looks at the points, only the edges, so it is the one that generalises to a sparse graph."

    "Network Delay Time" ->
      "Single-source shortest paths, and the answer is the largest of them \u{2014} plus a check that every node was reached at all. Dijkstra settles the smallest tentative time and never revisits it, which is only sound because no edge is negative. Bellman-Ford chooses nothing and just relaxes every edge n\u{2212}1 times: slower, but it is the one that survives negative weights."

    "Swim in Rising Water" ->
      "Dijkstra with the cost of a path redefined from the sum of its steps to the largest step in it \u{2014} the water only has to rise once. Nothing else about the algorithm changes. The other way in is that reachability is monotone in time, so binary search over the answer turns \"what is the cheapest path\" into a plain flood fill asking \"is it possible yet\"."

    "Alien Dictionary" ->
      "The words are the input, but the graph is over letters: two adjacent words agree up to their first difference, and that difference is the only ordering they establish \u{2014} everything after it says nothing. Then it is a topological sort, with two ways to fail: a cycle, and a word followed by its own prefix, which no alphabet can explain."

    "Cheapest Flights Within K Stops" ->
      "The stop limit is what stops this being plain Dijkstra: cheapest-so-far is no longer enough to settle a city, because a costlier route with fewer stops may still be the one that gets through. Bellman-Ford handles it by construction \u{2014} one round is one flight, so stopping after k+1 rounds is the limit \u{2014} provided each round reads a snapshot of the last, or two flights leak into one round."

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
