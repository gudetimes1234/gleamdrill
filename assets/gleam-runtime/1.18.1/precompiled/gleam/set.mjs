import { CustomType as $CustomType, isEqual } from "../gleam.mjs";
import * as $dict from "../gleam/dict.mjs";
import * as $list from "../gleam/list.mjs";
import * as $result from "../gleam/result.mjs";

class Set extends $CustomType {
  constructor(dict) {
    super();
    this.dict = dict;
  }
}

const token = undefined;

/**
 * Creates a new empty set.
 */
export function new$() {
  return new Set($dict.new$());
}

/**
 * Gets the number of members in a set.
 *
 * This function runs in constant time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.new()
 *   |> set.insert(1)
 *   |> set.insert(2)
 *   |> set.size
 *   == 2
 * ```
 */
export function size(set) {
  return $dict.size(set.dict);
}

/**
 * Determines whether or not the set is empty.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.new() |> set.is_empty
 * ```
 *
 * ```gleam
 * assert !{ set.new() |> set.insert(1) |> set.is_empty }
 * ```
 */
export function is_empty(set) {
  return isEqual(set, new$());
}

/**
 * Inserts a member into the set.
 *
 * This function runs in logarithmic time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.new()
 *   |> set.insert(1)
 *   |> set.insert(2)
 *   |> set.size
 *   == 2
 * ```
 */
export function insert(set, member) {
  return new Set($dict.insert(set.dict, member, token));
}

/**
 * Checks whether a set contains a given member.
 *
 * This function runs in logarithmic time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.new()
 *   |> set.insert(2)
 *   |> set.contains(2)
 * ```
 *
 * ```gleam
 * assert !{
 *   set.new()
 *   |> set.insert(2)
 *   |> set.contains(1)
 * }
 * ```
 */
export function contains(set, member) {
  let _pipe = set.dict;
  let _pipe$1 = $dict.get(_pipe, member);
  return $result.is_ok(_pipe$1);
}

/**
 * Removes a member from a set. If the set does not contain the member then
 * the set is returned unchanged.
 *
 * This function runs in logarithmic time.
 *
 * ## Examples
 *
 * ```gleam
 * assert !{
 *   set.new()
 *   |> set.insert(2)
 *   |> set.delete(2)
 *   |> set.contains(2)
 * }
 * ```
 */
export function delete$(set, member) {
  return new Set($dict.delete$(set.dict, member));
}

/**
 * Converts the set into a list of the contained members.
 *
 * The list has no specific ordering, any unintentional ordering may change in
 * future versions of Gleam or Erlang.
 *
 * This function runs in linear time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.new() |> set.insert(2) |> set.to_list == [2]
 * ```
 */
export function to_list(set) {
  return $dict.keys(set.dict);
}

/**
 * Creates a new set of the members in a given list.
 *
 * This function runs in loglinear time.
 *
 * ## Examples
 *
 * ```gleam
 * import gleam/int
 * import gleam/list
 *
 * assert [1, 1, 2, 4, 3, 2]
 *   |> set.from_list
 *   |> set.to_list
 *   |> list.sort(by: int.compare)
 *   == [1, 2, 3, 4]
 * ```
 */
export function from_list(members) {
  let dict = $list.fold(
    members,
    $dict.new$(),
    (m, k) => { return $dict.insert(m, k, token); },
  );
  return new Set(dict);
}

/**
 * Combines all entries into a single value by calling a given function on each
 * one.
 *
 * Sets are not ordered so the values are not returned in any specific order.
 * Do not write code that relies on the order entries are used by this
 * function as it may change in later versions of Gleam or Erlang.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.from_list([1, 3, 9])
 *   |> set.fold(0, fn(accumulator, member) { accumulator + member })
 *   == 13
 * ```
 */
export function fold(set, initial, reducer) {
  return $dict.fold(set.dict, initial, (a, k, _) => { return reducer(a, k); });
}

/**
 * Creates a new set from an existing set, minus any members that a given
 * function returns `False` for.
 *
 * This function runs in loglinear time.
 *
 * ## Examples
 *
 * ```gleam
 * import gleam/int
 *
 * assert set.from_list([1, 4, 6, 3, 675, 44, 67])
 *   |> set.filter(keeping: int.is_even)
 *   |> set.to_list
 *   == [4, 6, 44]
 * ```
 */
export function filter(set, predicate) {
  return new Set($dict.filter(set.dict, (m, _) => { return predicate(m); }));
}

/**
 * Creates a new set from a given set with the result of applying the given
 * function to each member.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.from_list([1, 2, 3, 4])
 *   |> set.map(with: fn(x) { x * 2 })
 *   |> set.to_list
 *   == [2, 4, 6, 8]
 * ```
 */
export function map(set, fun) {
  return fold(
    set,
    new$(),
    (acc, member) => { return insert(acc, fun(member)); },
  );
}

/**
 * Creates a new set from a given set with all the same entries except any
 * entry found on the given list.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.from_list([1, 2, 3, 4])
 *   |> set.drop([1, 3])
 *   |> set.to_list
 *   == [2, 4]
 * ```
 */
export function drop(set, disallowed) {
  return $list.fold(disallowed, set, delete$);
}

/**
 * Creates a new set from a given set, only including any members which are in
 * a given list.
 *
 * This function runs in loglinear time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.from_list([1, 2, 3])
 *   |> set.take([1, 3, 5])
 *   |> set.to_list
 *   == [1, 3]
 * ```
 */
export function take(set, desired) {
  return new Set($dict.take(set.dict, desired));
}

function order(first, second) {
  let $ = $dict.size(first.dict) > $dict.size(second.dict);
  if ($) {
    return [first, second];
  } else {
    return [second, first];
  }
}

/**
 * Creates a new set that contains all members of both given sets.
 *
 * This function runs in loglinear time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.union(set.from_list([1, 2]), set.from_list([2, 3])) |> set.to_list
 *   == [1, 2, 3]
 * ```
 */
export function union(first, second) {
  let $ = order(first, second);
  let larger = $[0];
  let smaller = $[1];
  return fold(smaller, larger, insert);
}

/**
 * Creates a new set that contains members that are present in both given sets.
 *
 * This function runs in loglinear time.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.intersection(set.from_list([1, 2]), set.from_list([2, 3]))
 *   |> set.to_list
 *   == [2]
 * ```
 */
export function intersection(first, second) {
  let $ = order(first, second);
  let larger = $[0];
  let smaller = $[1];
  return take(larger, to_list(smaller));
}

/**
 * Creates a new set that contains members that are present in the first set
 * but not the second.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.difference(set.from_list([1, 2]), set.from_list([2, 3, 4]))
 *   |> set.to_list
 *   == [1]
 * ```
 */
export function difference(first, second) {
  return drop(first, to_list(second));
}

/**
 * Determines if a set is fully contained by another.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.is_subset(set.from_list([1]), set.from_list([1, 2]))
 * ```
 *
 * ```gleam
 * assert !set.is_subset(set.from_list([1, 2, 3]), set.from_list([3, 4, 5]))
 * ```
 */
export function is_subset(first, second) {
  return isEqual(intersection(first, second), first);
}

/**
 * Determines if two sets contain no common members
 *
 * ## Examples
 *
 * ```gleam
 * assert set.is_disjoint(set.from_list([1, 2, 3]), set.from_list([4, 5, 6]))
 * ```
 *
 * ```gleam
 * assert !set.is_disjoint(set.from_list([1, 2, 3]), set.from_list([3, 4, 5]))
 * ```
 */
export function is_disjoint(first, second) {
  return isEqual(intersection(first, second), new$());
}

/**
 * Creates a new set that contains members that are present in either set, but
 * not both.
 *
 * ## Examples
 *
 * ```gleam
 * assert set.symmetric_difference(
 *     set.from_list([1, 2, 3]),
 *     set.from_list([3, 4]),
 *   )
 *   |> set.to_list
 *   == [1, 2, 4]
 * ```
 */
export function symmetric_difference(first, second) {
  return difference(union(first, second), intersection(first, second));
}

/**
 * Calls a function for each member in a set, discarding the return
 * value.
 *
 * Useful for producing a side effect for every item of a set.
 *
 * The order of elements in the iteration is an implementation detail that
 * should not be relied upon.
 *
 * ## Examples
 *
 * ```gleam
 * let set = set.from_list(["apple", "banana", "cherry"])
 *
 * assert set.each(set, io.println) == Nil
 * // apple
 * // banana
 * // cherry
 * ```
 */
export function each(set, fun) {
  return fold(
    set,
    undefined,
    (nil, member) => {
      fun(member);
      return nil;
    },
  );
}
