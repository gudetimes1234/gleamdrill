need :MedianFinder

def medians(values)
  finder = MedianFinder.new
  values.map do |value|
    finder.add_num(value)
    finder.find_median
  end
end

tc "medians of 1, 2, 3", [1.0, 1.5, 2.0], medians([1, 2, 3])
tc "medians of 1, 2, 3, 4, 5", [1.0, 1.5, 2.0, 2.5, 3.0], medians([1, 2, 3, 4, 5])
tc "medians arriving out of order", [5.0, 3.0, 2.0, 2.5], medians([5, 1, 2, 3])
tc "medians of negatives", [-1.0, -1.5], medians([-1, -2])
tc "median before anything is added", 0.0, MedianFinder.new.find_median
