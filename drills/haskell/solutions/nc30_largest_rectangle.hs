module Solution where

import Data.Array

largestRectangleArea :: [Int] -> Int
largestRectangleArea heights = snd (foldl step ([], 0) (zip [0 ..] (heights ++ [0])))
  where
    arr = listArray (0, length heights - 1) heights
    -- The stack holds indices with increasing heights; the appended 0 is
    -- a sentinel that flushes it. When a lower bar arrives, every taller
    -- bar on the stack has found its right edge; its left edge is the
    -- bar beneath it on the stack.
    step (stack, best) (i, current) =
      let (waiting, best') = popTaller i current stack best
      in (i : waiting, best')
    popTaller i current (j : rest) best
      | arr ! j >= current =
          let width = if null rest then i else i - head rest - 1
          in popTaller i current rest (max best (arr ! j * width))
    popTaller _ _ stack best = (stack, best)
