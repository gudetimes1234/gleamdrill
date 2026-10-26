require "set"

def longest_consecutive(nums)
  num_set = nums.to_set
  longest = 0

  num_set.each do |num|
    # only start counting from the beginning of a run
    next if num_set.include?(num - 1)

    length = 1
    length += 1 while num_set.include?(num + length)
    longest = [longest, length].max
  end
  longest
end
