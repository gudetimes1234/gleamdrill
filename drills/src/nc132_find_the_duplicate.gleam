import gleam/list
import gleam/result

pub fn find_duplicate(nums: List(Int)) -> Int {
  // Read the array as a linked list: position i points at position nums[i].
  // Because every value is a valid position and one value repeats, two
  // positions point at the same place — so the list has a cycle, and the
  // duplicate is its entrance. Then it is Floyd's, twice: once to meet inside
  // the loop, once to walk from the start and the meeting point together until
  // they agree on where it begins.
  let meeting = meet(nums, at(nums, 0), at(nums, at(nums, 0)))
  entrance(nums, 0, meeting)
}

fn meet(nums: List(Int), slow: Int, fast: Int) -> Int {
  case slow == fast {
    True -> slow
    False -> meet(nums, at(nums, slow), at(nums, at(nums, fast)))
  }
}

fn entrance(nums: List(Int), from_start: Int, from_meeting: Int) -> Int {
  case from_start == from_meeting {
    True -> from_start
    False -> entrance(nums, at(nums, from_start), at(nums, from_meeting))
  }
}

fn at(nums: List(Int), index: Int) -> Int {
  result.unwrap(list.first(list.drop(nums, index)), 0)
}
