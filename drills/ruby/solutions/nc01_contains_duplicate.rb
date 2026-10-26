require "set"

def contains_duplicate(nums)
  seen = Set.new
  nums.each do |num|
    return true if seen.include?(num)

    seen << num
  end
  false
end
