def longest_consecutive(nums)
  return 0 if nums.empty?

  sorted = nums.uniq.sort
  longest = current = 1
  sorted.each_cons(2) do |a, b|
    current = b == a + 1 ? current + 1 : 1
    longest = [longest, current].max
  end
  longest
end
