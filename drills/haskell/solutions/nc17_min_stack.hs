module Solution where

-- A pure MinStack: every operation returns the next stack. The second
-- list holds only the running minima: push to it when a new value ties
-- or beats the current minimum, pop from it when that value leaves.
data MinStack = MinStack [Int] [Int]

emptyMinStack :: MinStack
emptyMinStack = MinStack [] []

push :: Int -> MinStack -> MinStack
push val (MinStack values mins)
  | null mins || val <= head mins = MinStack (val : values) (val : mins)
  | otherwise = MinStack (val : values) mins

pop :: MinStack -> MinStack
pop (MinStack (v : values) mins)
  | v == head mins = MinStack values (tail mins)
  | otherwise = MinStack values mins
pop (MinStack [] _) = error "pop of an empty MinStack"

top :: MinStack -> Int
top (MinStack (v : _) _) = v
top _ = error "top of an empty MinStack"

getMin :: MinStack -> Int
getMin (MinStack _ (m : _)) = m
getMin _ = error "getMin of an empty MinStack"
